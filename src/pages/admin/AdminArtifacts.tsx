import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Artifact {
  id: string;
  name: string;
  description: string | null;
  lore_content: string | null;
  artifact_type: string;
  power_description: string | null;
  origin_story: string | null;
  current_holder_id: string | null;
  image_url: string | null;
  is_featured: boolean;
  sort_order: number;
}

const empty: Partial<Artifact> = { name: "", description: "", lore_content: "", artifact_type: "relic", power_description: "", origin_story: "", current_holder_id: null, image_url: "", is_featured: false, sort_order: 0 };

const AdminArtifacts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<Artifact> | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => { if (searchParams.get("action") === "new") { setEditing({ ...empty }); setIsDialogOpen(true); setSearchParams({}); } }, [searchParams, setSearchParams]);

  const { data: items, isLoading } = useQuery({ queryKey: ["admin-artifacts"], queryFn: async () => { const { data, error } = await supabase.from("artifacts").select("*, characters(name)").order("sort_order"); if (error) throw error; return data; } });
  const { data: characters } = useQuery({ queryKey: ["characters"], queryFn: async () => { const { data, error } = await supabase.from("characters").select("id, name").order("name"); if (error) throw error; return data; } });

  const saveMutation = useMutation({
    mutationFn: async (item: Partial<Artifact>) => {
      const payload = { name: item.name, description: item.description || null, lore_content: item.lore_content || null, artifact_type: item.artifact_type || "relic", power_description: item.power_description || null, origin_story: item.origin_story || null, current_holder_id: item.current_holder_id, image_url: item.image_url || null, is_featured: item.is_featured || false, sort_order: item.sort_order || 0 };
      if (item.id) { const { error } = await supabase.from("artifacts").update(payload).eq("id", item.id); if (error) throw error; }
      else { const { error } = await supabase.from("artifacts").insert(payload); if (error) throw error; }
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-artifacts"] }); setIsDialogOpen(false); setEditing(null); toast({ title: "Saved" }); },
    onError: (e) => { toast({ variant: "destructive", title: "Error", description: e.message }); },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("artifacts").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-artifacts"] }); toast({ title: "Deleted" }); },
    onError: (e) => { toast({ variant: "destructive", title: "Error", description: e.message }); },
  });

  const artifactTypes = ["weapon", "gemstone", "relic", "armor", "tome", "other"];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div><h1 className="font-display text-3xl tracking-wide text-foreground mb-2">Artifacts</h1><p className="text-muted-foreground">Manage legendary items and relics</p></div>
          <Button onClick={() => { setEditing({ ...empty }); setIsDialogOpen(true); }}><Plus size={18} className="mr-2" /> Add Artifact</Button>
        </div>

        <div className="bg-card border border-border overflow-hidden">
          {isLoading ? <div className="p-8 text-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" /></div> : items && items.length > 0 ? (
            <table className="w-full">
              <thead className="bg-muted/50"><tr>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Name</th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Type</th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Holder</th>
                <th className="text-right px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr></thead>
              <tbody className="divide-y divide-border">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium text-foreground">{item.name}</td>
                    <td className="px-4 py-3"><span className="px-2 py-1 text-xs uppercase border border-border">{item.artifact_type}</span></td>
                    <td className="px-4 py-3 text-muted-foreground">{item.characters?.name || "—"}</td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" onClick={() => { setEditing(item); setIsDialogOpen(true); }}><Pencil size={16} /></Button>
                      <Button variant="ghost" size="sm" onClick={() => { if (confirm("Delete?")) deleteMutation.mutate(item.id); }}><Trash2 size={16} className="text-destructive" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <div className="p-8 text-center text-muted-foreground">No artifacts yet.</div>}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="font-display text-xl">{editing?.id ? "Edit" : "Add"} Artifact</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2"><Label>Name *</Label><Input value={editing?.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
              <div className="grid gap-2"><Label>Type</Label>
                <Select value={editing?.artifact_type || "relic"} onValueChange={(val) => setEditing({ ...editing, artifact_type: val })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{artifactTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2"><Label>Description</Label><Textarea value={editing?.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={2} /></div>
            <div className="grid gap-2"><Label>Power Description</Label><Textarea value={editing?.power_description || ""} onChange={(e) => setEditing({ ...editing, power_description: e.target.value })} rows={3} /></div>
            <div className="grid gap-2"><Label>Origin Story</Label><Textarea value={editing?.origin_story || ""} onChange={(e) => setEditing({ ...editing, origin_story: e.target.value })} rows={4} /></div>
            <div className="grid gap-2"><Label>Lore Content</Label><Textarea value={editing?.lore_content || ""} onChange={(e) => setEditing({ ...editing, lore_content: e.target.value })} rows={5} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2"><Label>Current Holder</Label>
                <Select value={editing?.current_holder_id || "none"} onValueChange={(val) => setEditing({ ...editing, current_holder_id: val === "none" ? null : val })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="none">None</SelectItem>{characters?.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid gap-2"><Label>Image URL</Label><Input value={editing?.image_url || ""} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2"><Label>Sort Order</Label><Input type="number" value={editing?.sort_order || 0} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} /></div>
              <div className="flex items-center gap-2 pt-6"><input type="checkbox" id="featured" checked={editing?.is_featured || false} onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })} /><Label htmlFor="featured">Featured</Label></div>
            </div>
          </div>
          <div className="flex justify-end gap-3"><Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button><Button onClick={() => { if (!editing?.name) { toast({ variant: "destructive", title: "Name required" }); return; } saveMutation.mutate(editing); }} disabled={saveMutation.isPending}>{saveMutation.isPending ? "Saving..." : "Save"}</Button></div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminArtifacts;
