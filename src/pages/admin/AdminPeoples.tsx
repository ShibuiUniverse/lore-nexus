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

interface PeopleGroup {
  id: string;
  name: string;
  description: string | null;
  culture_text: string | null;
  traditions: string | null;
  image_url: string | null;
  homeland_id: string | null;
  is_featured: boolean;
  sort_order: number;
}

const empty: Partial<PeopleGroup> = { name: "", description: "", culture_text: "", traditions: "", image_url: "", homeland_id: null, is_featured: false, sort_order: 0 };

const AdminPeoples = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<PeopleGroup> | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => { if (searchParams.get("action") === "new") { setEditing({ ...empty }); setIsDialogOpen(true); setSearchParams({}); } }, [searchParams, setSearchParams]);

  const { data: items, isLoading } = useQuery({ queryKey: ["admin-peoples"], queryFn: async () => { const { data, error } = await supabase.from("people_groups").select("*, locations(name)").order("sort_order"); if (error) throw error; return data; } });
  const { data: locations } = useQuery({ queryKey: ["locations"], queryFn: async () => { const { data, error } = await supabase.from("locations").select("*").order("name"); if (error) throw error; return data; } });

  const saveMutation = useMutation({
    mutationFn: async (item: Partial<PeopleGroup>) => {
      const payload = { name: item.name, description: item.description || null, culture_text: item.culture_text || null, traditions: item.traditions || null, image_url: item.image_url || null, homeland_id: item.homeland_id, is_featured: item.is_featured || false, sort_order: item.sort_order || 0 };
      if (item.id) { const { error } = await supabase.from("people_groups").update(payload).eq("id", item.id); if (error) throw error; }
      else { const { error } = await supabase.from("people_groups").insert(payload); if (error) throw error; }
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-peoples"] }); setIsDialogOpen(false); setEditing(null); toast({ title: "Saved" }); },
    onError: (e) => { toast({ variant: "destructive", title: "Error", description: e.message }); },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("people_groups").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-peoples"] }); toast({ title: "Deleted" }); },
    onError: (e) => { toast({ variant: "destructive", title: "Error", description: e.message }); },
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div><h1 className="font-display text-3xl tracking-wide text-foreground mb-2">People Groups</h1><p className="text-muted-foreground">Manage cultures and civilizations</p></div>
          <Button onClick={() => { setEditing({ ...empty }); setIsDialogOpen(true); }}><Plus size={18} className="mr-2" /> Add People Group</Button>
        </div>

        <div className="bg-card border border-border overflow-hidden">
          {isLoading ? <div className="p-8 text-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" /></div> : items && items.length > 0 ? (
            <table className="w-full">
              <thead className="bg-muted/50"><tr>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Name</th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Homeland</th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Featured</th>
                <th className="text-right px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr></thead>
              <tbody className="divide-y divide-border">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium text-foreground">{item.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.locations?.name || "—"}</td>
                    <td className="px-4 py-3">{item.is_featured ? <span className="text-primary">Yes</span> : "—"}</td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" onClick={() => { setEditing(item); setIsDialogOpen(true); }}><Pencil size={16} /></Button>
                      <Button variant="ghost" size="sm" onClick={() => { if (confirm("Delete?")) deleteMutation.mutate(item.id); }}><Trash2 size={16} className="text-destructive" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <div className="p-8 text-center text-muted-foreground">No people groups yet.</div>}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="font-display text-xl">{editing?.id ? "Edit" : "Add"} People Group</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2"><Label>Name *</Label><Input value={editing?.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
              <div className="grid gap-2"><Label>Homeland</Label>
                <Select value={editing?.homeland_id || "none"} onValueChange={(val) => setEditing({ ...editing, homeland_id: val === "none" ? null : val })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="none">None</SelectItem>{locations?.map((loc) => <SelectItem key={loc.id} value={loc.id}>{loc.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2"><Label>Description</Label><Textarea value={editing?.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} /></div>
            <div className="grid gap-2"><Label>Culture</Label><Textarea value={editing?.culture_text || ""} onChange={(e) => setEditing({ ...editing, culture_text: e.target.value })} rows={5} /></div>
            <div className="grid gap-2"><Label>Traditions</Label><Textarea value={editing?.traditions || ""} onChange={(e) => setEditing({ ...editing, traditions: e.target.value })} rows={4} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2"><Label>Image URL</Label><Input value={editing?.image_url || ""} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} /></div>
              <div className="grid gap-2"><Label>Sort Order</Label><Input type="number" value={editing?.sort_order || 0} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} /></div>
            </div>
            <div className="flex items-center gap-2"><input type="checkbox" id="featured" checked={editing?.is_featured || false} onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })} /><Label htmlFor="featured">Featured</Label></div>
          </div>
          <div className="flex justify-end gap-3"><Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button><Button onClick={() => { if (!editing?.name) { toast({ variant: "destructive", title: "Name required" }); return; } saveMutation.mutate(editing); }} disabled={saveMutation.isPending}>{saveMutation.isPending ? "Saving..." : "Save"}</Button></div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminPeoples;
