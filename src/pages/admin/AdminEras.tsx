import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Era {
  id: string;
  name: string;
  description: string | null;
  start_year: number | null;
  end_year: number | null;
  color: string | null;
  sort_order: number | null;
}

const emptyEra: Partial<Era> = {
  name: "",
  description: "",
  start_year: null,
  end_year: null,
  color: "#C41E3A",
  sort_order: 0,
};

const AdminEras = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEra, setEditingEra] = useState<Partial<Era> | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: eras, isLoading } = useQuery({
    queryKey: ["admin-eras"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("eras")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (era: Partial<Era>) => {
      if (era.id) {
        const { error } = await supabase
          .from("eras")
          .update({
            name: era.name,
            description: era.description || null,
            start_year: era.start_year,
            end_year: era.end_year,
            color: era.color || "#C41E3A",
            sort_order: era.sort_order || 0,
          })
          .eq("id", era.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("eras").insert({
          name: era.name,
          description: era.description || null,
          start_year: era.start_year,
          end_year: era.end_year,
          color: era.color || "#C41E3A",
          sort_order: era.sort_order || 0,
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-eras"] });
      queryClient.invalidateQueries({ queryKey: ["eras"] });
      setIsDialogOpen(false);
      setEditingEra(null);
      toast({ title: "Saved successfully" });
    },
    onError: (error) => {
      toast({ variant: "destructive", title: "Error", description: error.message });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("eras").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-eras"] });
      queryClient.invalidateQueries({ queryKey: ["eras"] });
      toast({ title: "Deleted successfully" });
    },
    onError: (error) => {
      toast({ variant: "destructive", title: "Error", description: error.message });
    },
  });

  const handleSave = () => {
    if (!editingEra?.name) {
      toast({ variant: "destructive", title: "Name is required" });
      return;
    }
    saveMutation.mutate(editingEra);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl tracking-wide text-foreground mb-2">
              Eras
            </h1>
            <p className="text-muted-foreground">
              Manage timeline eras and their colors
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingEra({ ...emptyEra });
              setIsDialogOpen(true);
            }}
          >
            <Plus size={18} className="mr-2" />
            Add Era
          </Button>
        </div>

        {/* Table */}
        <div className="bg-card border border-border overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : eras && eras.length > 0 ? (
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Color</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Name</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Years</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Order</th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {eras.map((era) => (
                  <tr key={era.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div 
                        className="w-6 h-6 rounded border border-border"
                        style={{ backgroundColor: era.color || "#C41E3A" }}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-foreground">{era.name}</div>
                      {era.description && (
                        <div className="text-sm text-muted-foreground line-clamp-1">{era.description}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {era.start_year && era.end_year 
                        ? `${era.start_year} - ${era.end_year}`
                        : era.start_year 
                          ? `${era.start_year}+`
                          : "—"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {era.sort_order ?? 0}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingEra(era);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this era?")) {
                            deleteMutation.mutate(era.id);
                          }
                        }}
                      >
                        <Trash2 size={16} className="text-destructive" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              No eras yet. Click "Add Era" to create one.
            </div>
          )}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {editingEra?.id ? "Edit Era" : "Add Era"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Name *</Label>
              <Input
                value={editingEra?.name || ""}
                onChange={(e) => setEditingEra({ ...editingEra, name: e.target.value })}
                placeholder="Era name"
              />
            </div>

            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea
                value={editingEra?.description || ""}
                onChange={(e) => setEditingEra({ ...editingEra, description: e.target.value })}
                placeholder="Brief description of this era"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Start Year</Label>
                <Input
                  type="number"
                  value={editingEra?.start_year || ""}
                  onChange={(e) => setEditingEra({ ...editingEra, start_year: parseInt(e.target.value) || null })}
                  placeholder="e.g. 1000"
                />
              </div>
              <div className="grid gap-2">
                <Label>End Year</Label>
                <Input
                  type="number"
                  value={editingEra?.end_year || ""}
                  onChange={(e) => setEditingEra({ ...editingEra, end_year: parseInt(e.target.value) || null })}
                  placeholder="e.g. 2000"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={editingEra?.color || "#C41E3A"}
                    onChange={(e) => setEditingEra({ ...editingEra, color: e.target.value })}
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={editingEra?.color || "#C41E3A"}
                    onChange={(e) => setEditingEra({ ...editingEra, color: e.target.value })}
                    placeholder="#C41E3A"
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Sort Order</Label>
                <Input
                  type="number"
                  value={editingEra?.sort_order || 0}
                  onChange={(e) => setEditingEra({ ...editingEra, sort_order: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saveMutation.isPending}>
              {saveMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminEras;
