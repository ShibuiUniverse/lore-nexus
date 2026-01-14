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

interface Prophecy {
  id: string;
  name: string;
  prophecy_text: string;
  interpretation: string | null;
  status: string;
  source: string | null;
  related_era_id: string | null;
  image_url: string | null;
  is_featured: boolean;
  sort_order: number;
}

const empty: Partial<Prophecy> = { name: "", prophecy_text: "", interpretation: "", status: "unfulfilled", source: "", related_era_id: null, image_url: "", is_featured: false, sort_order: 0 };

const AdminProphecies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<Prophecy> | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => { if (searchParams.get("action") === "new") { setEditing({ ...empty }); setIsDialogOpen(true); setSearchParams({}); } }, [searchParams, setSearchParams]);

  const { data: items, isLoading } = useQuery({ queryKey: ["admin-prophecies"], queryFn: async () => { const { data, error } = await supabase.from("prophecies").select("*, eras(name)").order("sort_order"); if (error) throw error; return data; } });
  const { data: eras } = useQuery({ queryKey: ["eras"], queryFn: async () => { const { data, error } = await supabase.from("eras").select("*").order("start_year"); if (error) throw error; return data; } });

  const saveMutation = useMutation({
    mutationFn: async (item: Partial<Prophecy>) => {
      const payload = { name: item.name, prophecy_text: item.prophecy_text, interpretation: item.interpretation || null, status: item.status || "unfulfilled", source: item.source || null, related_era_id: item.related_era_id, image_url: item.image_url || null, is_featured: item.is_featured || false, sort_order: item.sort_order || 0 };
      if (item.id) { const { error } = await supabase.from("prophecies").update(payload).eq("id", item.id); if (error) throw error; }
      else { const { error } = await supabase.from("prophecies").insert(payload); if (error) throw error; }
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-prophecies"] }); setIsDialogOpen(false); setEditing(null); toast({ title: "Saved" }); },
    onError: (e) => { toast({ variant: "destructive", title: "Error", description: e.message }); },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("prophecies").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-prophecies"] }); toast({ title: "Deleted" }); },
    onError: (e) => { toast({ variant: "destructive", title: "Error", description: e.message }); },
  });

  const statuses = ["unfulfilled", "partially_fulfilled", "fulfilled", "disputed"];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div><h1 className="font-display text-3xl tracking-wide text-foreground mb-2">Prophecies</h1><p className="text-muted-foreground">Manage prophecies and foretold events</p></div>
          <Button onClick={() => { setEditing({ ...empty }); setIsDialogOpen(true); }}><Plus size={18} className="mr-2" /> Add Prophecy</Button>
        </div>

        <div className="bg-card border border-border overflow-hidden">
          {isLoading ? <div className="p-8 text-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" /></div> : items && items.length > 0 ? (
            <table className="w-full">
              <thead className="bg-muted/50"><tr>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Name</th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Era</th>
                <th className="text-right px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr></thead>
              <tbody className="divide-y divide-border">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium text-foreground">{item.name}</td>
                    <td className="px-4 py-3"><span className="px-2 py-1 text-xs uppercase border border-border">{item.status?.replace("_", " ")}</span></td>
                    <td className="px-4 py-3 text-muted-foreground">{item.eras?.name || "—"}</td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" onClick={() => { setEditing(item); setIsDialogOpen(true); }}><Pencil size={16} /></Button>
                      <Button variant="ghost" size="sm" onClick={() => { if (confirm("Delete?")) deleteMutation.mutate(item.id); }}><Trash2 size={16} className="text-destructive" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <div className="p-8 text-center text-muted-foreground">No prophecies yet.</div>}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="font-display text-xl">{editing?.id ? "Edit" : "Add"} Prophecy</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2"><Label>Name *</Label><Input value={editing?.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
              <div className="grid gap-2"><Label>Status</Label>
                <Select value={editing?.status || "unfulfilled"} onValueChange={(val) => setEditing({ ...editing, status: val })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{statuses.map((s) => <SelectItem key={s} value={s}>{s.replace("_", " ")}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2"><Label>Prophecy Text *</Label><Textarea value={editing?.prophecy_text || ""} onChange={(e) => setEditing({ ...editing, prophecy_text: e.target.value })} rows={4} /></div>
            <div className="grid gap-2"><Label>Interpretation</Label><Textarea value={editing?.interpretation || ""} onChange={(e) => setEditing({ ...editing, interpretation: e.target.value })} rows={4} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2"><Label>Source</Label><Input value={editing?.source || ""} onChange={(e) => setEditing({ ...editing, source: e.target.value })} placeholder="e.g. The Oracle of the First Dawn" /></div>
              <div className="grid gap-2"><Label>Era</Label>
                <Select value={editing?.related_era_id || "none"} onValueChange={(val) => setEditing({ ...editing, related_era_id: val === "none" ? null : val })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="none">None</SelectItem>{eras?.map((era) => <SelectItem key={era.id} value={era.id}>{era.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2"><Label>Image URL</Label><Input value={editing?.image_url || ""} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} /></div>
              <div className="grid gap-2"><Label>Sort Order</Label><Input type="number" value={editing?.sort_order || 0} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} /></div>
            </div>
            <div className="flex items-center gap-2"><input type="checkbox" id="featured" checked={editing?.is_featured || false} onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })} /><Label htmlFor="featured">Featured</Label></div>
          </div>
          <div className="flex justify-end gap-3"><Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button><Button onClick={() => { if (!editing?.name || !editing?.prophecy_text) { toast({ variant: "destructive", title: "Name and prophecy text required" }); return; } saveMutation.mutate(editing); }} disabled={saveMutation.isPending}>{saveMutation.isPending ? "Saving..." : "Save"}</Button></div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminProphecies;
