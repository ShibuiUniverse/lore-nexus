import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Calendar } from "lucide-react";

interface TimelineEvent {
  id: string;
  title: string;
  description: string | null;
  full_content: string | null;
  year: number | null;
  category: string | null;
  event_type: string;
  video_url: string | null;
  reading_time: number | null;
  image_url: string | null;
  era_id: string | null;
  is_featured: boolean;
  show_lore_badge: boolean;
  sort_order: number;
}

const emptyEvent: Partial<TimelineEvent> = {
  title: "",
  description: "",
  full_content: "",
  year: null,
  category: "event",
  event_type: "event",
  video_url: "",
  reading_time: null,
  image_url: "",
  era_id: null,
  is_featured: false,
  show_lore_badge: false,
  sort_order: 0,
};

const AdminTimeline = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Partial<TimelineEvent> | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (searchParams.get("action") === "new") {
      setEditingEvent({ ...emptyEvent });
      setIsDialogOpen(true);
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  const { data: events, isLoading } = useQuery({
    queryKey: ["admin-timeline-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("timeline_events")
        .select("*, eras(name)")
        .order("year", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const { data: eras } = useQuery({
    queryKey: ["eras"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("eras")
        .select("*")
        .order("start_year", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (event: Partial<TimelineEvent>) => {
      if (event.id) {
        const { error } = await supabase
          .from("timeline_events")
          .update({
            title: event.title,
            description: event.description || null,
            full_content: event.full_content || null,
            year: event.year,
            category: event.category,
            event_type: event.event_type,
            video_url: event.video_url || null,
            reading_time: event.reading_time,
            image_url: event.image_url || null,
            era_id: event.era_id,
            is_featured: event.is_featured,
            show_lore_badge: event.show_lore_badge,
            sort_order: event.sort_order,
          })
          .eq("id", event.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("timeline_events").insert({
          title: event.title,
          description: event.description || null,
          full_content: event.full_content || null,
          year: event.year,
          category: event.category,
          event_type: event.event_type || "event",
          video_url: event.video_url || null,
          reading_time: event.reading_time,
          image_url: event.image_url || null,
          era_id: event.era_id,
          is_featured: event.is_featured || false,
          show_lore_badge: event.show_lore_badge || false,
          sort_order: event.sort_order || 0,
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-timeline-events"] });
      setIsDialogOpen(false);
      setEditingEvent(null);
      toast({ title: "Saved successfully" });
    },
    onError: (error) => {
      toast({ variant: "destructive", title: "Error", description: error.message });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("timeline_events").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-timeline-events"] });
      toast({ title: "Deleted successfully" });
    },
    onError: (error) => {
      toast({ variant: "destructive", title: "Error", description: error.message });
    },
  });

  const handleSave = () => {
    if (!editingEvent?.title) {
      toast({ variant: "destructive", title: "Title is required" });
      return;
    }
    saveMutation.mutate(editingEvent);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl tracking-wide text-foreground mb-2">
              Timeline Events
            </h1>
            <p className="text-muted-foreground">
              Manage historical events, lore stories, and trailers
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingEvent({ ...emptyEvent });
              setIsDialogOpen(true);
            }}
          >
            <Plus size={18} className="mr-2" />
            Add Event
          </Button>
        </div>

        {/* Table */}
        <div className="bg-card border border-border overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : events && events.length > 0 ? (
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Title</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Year</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Type</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Era</th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {events.map((event) => (
                  <tr key={event.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-foreground">{event.title}</div>
                      {event.description && (
                        <div className="text-sm text-muted-foreground line-clamp-1">{event.description}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {event.year || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs uppercase tracking-wider border border-border bg-muted/50">
                        {event.event_type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {event.eras?.name || "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingEvent(event);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this event?")) {
                            deleteMutation.mutate(event.id);
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
              No timeline events yet. Click "Add Event" to create one.
            </div>
          )}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {editingEvent?.id ? "Edit Event" : "Add Event"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Title *</Label>
              <Input
                value={editingEvent?.title || ""}
                onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                placeholder="Event title"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Year</Label>
                <Input
                  type="number"
                  value={editingEvent?.year || ""}
                  onChange={(e) => setEditingEvent({ ...editingEvent, year: parseInt(e.target.value) || null })}
                  placeholder="e.g. 1000"
                />
              </div>
              <div className="grid gap-2">
                <Label>Era</Label>
                <Select
                  value={editingEvent?.era_id || "none"}
                  onValueChange={(val) => setEditingEvent({ ...editingEvent, era_id: val === "none" ? null : val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select era" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No era</SelectItem>
                    {eras?.map((era) => (
                      <SelectItem key={era.id} value={era.id}>{era.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Event Type</Label>
                <Select
                  value={editingEvent?.event_type || "event"}
                  onValueChange={(val) => setEditingEvent({ ...editingEvent, event_type: val })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="lore_story">Lore Story</SelectItem>
                    <SelectItem value="trailer">Trailer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Category</Label>
                <Select
                  value={editingEvent?.category || "event"}
                  onValueChange={(val) => setEditingEvent({ ...editingEvent, category: val })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="battle">Battle</SelectItem>
                    <SelectItem value="birth">Birth</SelectItem>
                    <SelectItem value="death">Death</SelectItem>
                    <SelectItem value="alliance">Alliance</SelectItem>
                    <SelectItem value="discovery">Discovery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea
                value={editingEvent?.description || ""}
                onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                placeholder="Brief description"
                rows={2}
              />
            </div>

            <div className="grid gap-2">
              <Label>Full Content</Label>
              <Textarea
                value={editingEvent?.full_content || ""}
                onChange={(e) => setEditingEvent({ ...editingEvent, full_content: e.target.value })}
                placeholder="Full story content (for lore stories)"
                rows={6}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Image URL</Label>
                <Input
                  value={editingEvent?.image_url || ""}
                  onChange={(e) => setEditingEvent({ ...editingEvent, image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="grid gap-2">
                <Label>Video URL (for trailers)</Label>
                <Input
                  value={editingEvent?.video_url || ""}
                  onChange={(e) => setEditingEvent({ ...editingEvent, video_url: e.target.value })}
                  placeholder="YouTube or Vimeo URL"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Reading Time (minutes)</Label>
                <Input
                  type="number"
                  value={editingEvent?.reading_time || ""}
                  onChange={(e) => setEditingEvent({ ...editingEvent, reading_time: parseInt(e.target.value) || null })}
                  placeholder="5"
                />
              </div>
              <div className="grid gap-2">
                <Label>Sort Order</Label>
                <Input
                  type="number"
                  value={editingEvent?.sort_order || 0}
                  onChange={(e) => setEditingEvent({ ...editingEvent, sort_order: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={editingEvent?.is_featured || false}
                  onChange={(e) => setEditingEvent({ ...editingEvent, is_featured: e.target.checked })}
                  className="rounded border-border"
                />
                <Label htmlFor="is_featured">Featured</Label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="show_lore_badge"
                  checked={editingEvent?.show_lore_badge || false}
                  onChange={(e) => setEditingEvent({ ...editingEvent, show_lore_badge: e.target.checked })}
                  className="rounded border-border"
                />
                <Label htmlFor="show_lore_badge">Show Lore Badge</Label>
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

export default AdminTimeline;
