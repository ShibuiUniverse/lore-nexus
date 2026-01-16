import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Character {
  id: string;
  name: string;
  title: string | null;
  description: string | null;
  backstory: string | null;
  abilities: string | null;
  faction: string | null;
  image_url: string | null;
  era_id: string | null;
  people_group_id: string | null;
  is_featured: boolean;
  sort_order: number;
}

interface PeopleGroup {
  id: string;
  name: string;
}

interface CharacterPeopleGroup {
  id: string;
  character_id: string;
  people_group_id: string;
  is_primary: boolean;
}

const emptyCharacter: Partial<Character> = {
  name: "",
  title: "",
  description: "",
  backstory: "",
  abilities: "",
  faction: "",
  image_url: "",
  era_id: null,
  people_group_id: null,
  is_featured: false,
  sort_order: 0,
};

const AdminCharacters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState<Partial<Character> | null>(null);
  const [selectedPeopleGroups, setSelectedPeopleGroups] = useState<string[]>([]);
  const [primaryPeopleGroup, setPrimaryPeopleGroup] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (searchParams.get("action") === "new") {
      setEditingCharacter({ ...emptyCharacter });
      setSelectedPeopleGroups([]);
      setPrimaryPeopleGroup(null);
      setIsDialogOpen(true);
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  const { data: characters, isLoading } = useQuery({
    queryKey: ["admin-characters"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("characters")
        .select("*, eras(name), people_groups(name)")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  // Fetch character people groups for listing
  const { data: characterPeopleGroupsMap } = useQuery({
    queryKey: ["character-people-groups-all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("character_people_groups")
        .select("*, people_groups(name)");
      if (error) throw error;
      
      // Group by character_id
      const map: Record<string, { id: string; name: string; is_primary: boolean }[]> = {};
      data?.forEach((cpg: any) => {
        if (!map[cpg.character_id]) {
          map[cpg.character_id] = [];
        }
        map[cpg.character_id].push({
          id: cpg.people_group_id,
          name: cpg.people_groups?.name || "",
          is_primary: cpg.is_primary,
        });
      });
      return map;
    },
  });

  const { data: eras } = useQuery({
    queryKey: ["eras"],
    queryFn: async () => {
      const { data, error } = await supabase.from("eras").select("*").order("start_year");
      if (error) throw error;
      return data;
    },
  });

  const { data: peopleGroups } = useQuery({
    queryKey: ["people-groups"],
    queryFn: async () => {
      const { data, error } = await supabase.from("people_groups").select("*").order("name");
      if (error) throw error;
      return data;
    },
  });

  // Fetch character's people groups when editing
  const { data: editingCharacterPeopleGroups } = useQuery({
    queryKey: ["character-people-groups", editingCharacter?.id],
    queryFn: async () => {
      if (!editingCharacter?.id) return [];
      const { data, error } = await supabase
        .from("character_people_groups")
        .select("*")
        .eq("character_id", editingCharacter.id);
      if (error) throw error;
      return data as CharacterPeopleGroup[];
    },
    enabled: !!editingCharacter?.id,
  });

  // Update selected people groups when editing character changes
  useEffect(() => {
    if (editingCharacterPeopleGroups) {
      setSelectedPeopleGroups(editingCharacterPeopleGroups.map(cpg => cpg.people_group_id));
      const primary = editingCharacterPeopleGroups.find(cpg => cpg.is_primary);
      setPrimaryPeopleGroup(primary?.people_group_id || null);
    } else if (!editingCharacter?.id) {
      setSelectedPeopleGroups([]);
      setPrimaryPeopleGroup(null);
    }
  }, [editingCharacterPeopleGroups, editingCharacter?.id]);

  const saveMutation = useMutation({
    mutationFn: async (character: Partial<Character>) => {
      const payload = {
        name: character.name,
        title: character.title || null,
        description: character.description || null,
        backstory: character.backstory || null,
        abilities: character.abilities || null,
        faction: character.faction || null,
        image_url: character.image_url || null,
        era_id: character.era_id,
        people_group_id: primaryPeopleGroup, // Keep legacy field for compatibility
        is_featured: character.is_featured || false,
        sort_order: character.sort_order || 0,
      };

      let characterId = character.id;

      if (character.id) {
        const { error } = await supabase.from("characters").update(payload).eq("id", character.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from("characters").insert(payload).select().single();
        if (error) throw error;
        characterId = data.id;
      }

      // Update people groups junction table
      if (characterId) {
        // Delete existing associations
        await supabase.from("character_people_groups").delete().eq("character_id", characterId);
        
        // Insert new associations
        if (selectedPeopleGroups.length > 0) {
          const associations = selectedPeopleGroups.map(pgId => ({
            character_id: characterId,
            people_group_id: pgId,
            is_primary: pgId === primaryPeopleGroup,
          }));
          const { error } = await supabase.from("character_people_groups").insert(associations);
          if (error) throw error;
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-characters"] });
      queryClient.invalidateQueries({ queryKey: ["character-people-groups-all"] });
      setIsDialogOpen(false);
      setEditingCharacter(null);
      setSelectedPeopleGroups([]);
      setPrimaryPeopleGroup(null);
      toast({ title: "Saved successfully" });
    },
    onError: (error) => {
      toast({ variant: "destructive", title: "Error", description: error.message });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("characters").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-characters"] });
      queryClient.invalidateQueries({ queryKey: ["character-people-groups-all"] });
      toast({ title: "Deleted successfully" });
    },
    onError: (error) => {
      toast({ variant: "destructive", title: "Error", description: error.message });
    },
  });

  const handleSave = () => {
    if (!editingCharacter?.name) {
      toast({ variant: "destructive", title: "Name is required" });
      return;
    }
    saveMutation.mutate(editingCharacter);
  };

  const handlePeopleGroupToggle = (groupId: string, checked: boolean) => {
    if (checked) {
      setSelectedPeopleGroups(prev => [...prev, groupId]);
      // If this is the first selection, make it primary
      if (selectedPeopleGroups.length === 0) {
        setPrimaryPeopleGroup(groupId);
      }
    } else {
      setSelectedPeopleGroups(prev => prev.filter(id => id !== groupId));
      // If removing the primary, set the first remaining as primary
      if (groupId === primaryPeopleGroup) {
        const remaining = selectedPeopleGroups.filter(id => id !== groupId);
        setPrimaryPeopleGroup(remaining[0] || null);
      }
    }
  };

  const handleSetPrimary = (groupId: string) => {
    if (selectedPeopleGroups.includes(groupId)) {
      setPrimaryPeopleGroup(groupId);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl tracking-wide text-foreground mb-2">Characters</h1>
            <p className="text-muted-foreground">Manage all characters in your lore</p>
          </div>
          <Button onClick={() => { setEditingCharacter({ ...emptyCharacter }); setSelectedPeopleGroups([]); setPrimaryPeopleGroup(null); setIsDialogOpen(true); }}>
            <Plus size={18} className="mr-2" /> Add Character
          </Button>
        </div>

        <div className="bg-card border border-border overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : characters && characters.length > 0 ? (
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Name</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Title</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Faction</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">People Groups</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Era</th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {characters.map((char) => {
                  const charPeopleGroups = characterPeopleGroupsMap?.[char.id] || [];
                  return (
                    <tr key={char.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {char.image_url && (
                            <img src={char.image_url} alt="" className="w-10 h-10 rounded-full object-cover" />
                          )}
                          <span className="font-medium text-foreground">{char.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{char.title || "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground">{char.faction || "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {charPeopleGroups.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {charPeopleGroups.map((pg) => (
                              <span
                                key={pg.id}
                                className={`text-xs px-2 py-0.5 rounded ${
                                  pg.is_primary
                                    ? "bg-primary/20 text-primary border border-primary/30"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {pg.name}
                              </span>
                            ))}
                          </div>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{char.eras?.name || "—"}</td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="sm" onClick={() => { setEditingCharacter(char); setIsDialogOpen(true); }}>
                          <Pencil size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => { if (confirm("Delete this character?")) deleteMutation.mutate(char.id); }}>
                          <Trash2 size={16} className="text-destructive" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-muted-foreground">No characters yet.</div>
          )}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {editingCharacter?.id ? "Edit Character" : "Add Character"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Name *</Label>
                <Input value={editingCharacter?.name || ""} onChange={(e) => setEditingCharacter({ ...editingCharacter, name: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label>Title</Label>
                <Input value={editingCharacter?.title || ""} onChange={(e) => setEditingCharacter({ ...editingCharacter, title: e.target.value })} placeholder="e.g. The Shadow King" />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea value={editingCharacter?.description || ""} onChange={(e) => setEditingCharacter({ ...editingCharacter, description: e.target.value })} rows={3} />
            </div>

            <div className="grid gap-2">
              <Label>Backstory</Label>
              <Textarea value={editingCharacter?.backstory || ""} onChange={(e) => setEditingCharacter({ ...editingCharacter, backstory: e.target.value })} rows={5} />
            </div>

            <div className="grid gap-2">
              <Label>Abilities</Label>
              <Textarea value={editingCharacter?.abilities || ""} onChange={(e) => setEditingCharacter({ ...editingCharacter, abilities: e.target.value })} rows={3} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Faction</Label>
                <Input value={editingCharacter?.faction || ""} onChange={(e) => setEditingCharacter({ ...editingCharacter, faction: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label>Era</Label>
                <Select value={editingCharacter?.era_id || "none"} onValueChange={(val) => setEditingCharacter({ ...editingCharacter, era_id: val === "none" ? null : val })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {eras?.map((era) => <SelectItem key={era.id} value={era.id}>{era.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* People Groups Multi-Select */}
            <div className="grid gap-2">
              <Label>People Groups</Label>
              <p className="text-xs text-muted-foreground">Select one or more people groups. Click the star to set the primary group.</p>
              <div className="border border-border rounded-md p-3 space-y-2 max-h-40 overflow-y-auto bg-background">
                {peopleGroups?.map((pg) => {
                  const isSelected = selectedPeopleGroups.includes(pg.id);
                  const isPrimary = primaryPeopleGroup === pg.id;
                  return (
                    <div key={pg.id} className="flex items-center gap-3">
                      <Checkbox
                        id={`pg-${pg.id}`}
                        checked={isSelected}
                        onCheckedChange={(checked) => handlePeopleGroupToggle(pg.id, !!checked)}
                      />
                      <label
                        htmlFor={`pg-${pg.id}`}
                        className="text-sm flex-1 cursor-pointer"
                      >
                        {pg.name}
                      </label>
                      {isSelected && (
                        <button
                          type="button"
                          onClick={() => handleSetPrimary(pg.id)}
                          className={`text-xs px-2 py-0.5 rounded transition-colors ${
                            isPrimary
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          {isPrimary ? "Primary" : "Set Primary"}
                        </button>
                      )}
                    </div>
                  );
                })}
                {(!peopleGroups || peopleGroups.length === 0) && (
                  <p className="text-sm text-muted-foreground">No people groups available</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Image URL</Label>
                <Input value={editingCharacter?.image_url || ""} onChange={(e) => setEditingCharacter({ ...editingCharacter, image_url: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label>Sort Order</Label>
                <Input type="number" value={editingCharacter?.sort_order || 0} onChange={(e) => setEditingCharacter({ ...editingCharacter, sort_order: parseInt(e.target.value) || 0 })} />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="featured" checked={editingCharacter?.is_featured || false} onChange={(e) => setEditingCharacter({ ...editingCharacter, is_featured: e.target.checked })} />
              <Label htmlFor="featured">Featured</Label>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saveMutation.isPending}>{saveMutation.isPending ? "Saving..." : "Save"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminCharacters;