import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Users, MapPin, Sword, ScrollText, BookOpen, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [timeline, characters, locations, peoples, artifacts, prophecies, stories] = await Promise.all([
        supabase.from("timeline_events").select("id", { count: "exact", head: true }),
        supabase.from("characters").select("id", { count: "exact", head: true }),
        supabase.from("locations").select("id", { count: "exact", head: true }),
        supabase.from("people_groups").select("id", { count: "exact", head: true }),
        supabase.from("artifacts").select("id", { count: "exact", head: true }),
        supabase.from("prophecies").select("id", { count: "exact", head: true }),
        supabase.from("stories").select("id", { count: "exact", head: true }),
      ]);

      return {
        timeline: timeline.count || 0,
        characters: characters.count || 0,
        locations: locations.count || 0,
        peoples: peoples.count || 0,
        artifacts: artifacts.count || 0,
        prophecies: prophecies.count || 0,
        stories: stories.count || 0,
      };
    },
  });

  const statCards = [
    { label: "Timeline Events", count: stats?.timeline || 0, icon: Calendar, href: "/admin/timeline", color: "text-blue-400" },
    { label: "Characters", count: stats?.characters || 0, icon: Users, href: "/admin/characters", color: "text-green-400" },
    { label: "Locations", count: stats?.locations || 0, icon: MapPin, href: "/admin/locations", color: "text-amber-400" },
    { label: "People Groups", count: stats?.peoples || 0, icon: Users, href: "/admin/peoples", color: "text-purple-400" },
    { label: "Artifacts", count: stats?.artifacts || 0, icon: Sword, href: "/admin/artifacts", color: "text-red-400" },
    { label: "Prophecies", count: stats?.prophecies || 0, icon: ScrollText, href: "/admin/prophecies", color: "text-cyan-400" },
    { label: "Stories", count: stats?.stories || 0, icon: BookOpen, href: "/admin/stories", color: "text-pink-400" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl tracking-wide text-foreground mb-2">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome to The Lorekeeper admin panel. Manage all your world-building content from here.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <Link
              key={stat.label}
              to={stat.href}
              className="group bg-card border border-border p-6 hover:border-primary/50 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <TrendingUp className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="font-display text-3xl tracking-wide text-foreground mb-1">
                {stat.count}
              </p>
              <p className="text-sm text-muted-foreground">
                {stat.label}
              </p>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-card border border-border p-6">
          <h2 className="font-display text-xl tracking-wide text-foreground mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link
              to="/admin/timeline?action=new"
              className="px-4 py-3 bg-primary/10 border border-primary/30 text-primary text-sm font-medium hover:bg-primary/20 transition-colors text-center"
            >
              + Add Timeline Event
            </Link>
            <Link
              to="/admin/characters?action=new"
              className="px-4 py-3 bg-primary/10 border border-primary/30 text-primary text-sm font-medium hover:bg-primary/20 transition-colors text-center"
            >
              + Add Character
            </Link>
            <Link
              to="/admin/artifacts?action=new"
              className="px-4 py-3 bg-primary/10 border border-primary/30 text-primary text-sm font-medium hover:bg-primary/20 transition-colors text-center"
            >
              + Add Artifact
            </Link>
            <Link
              to="/admin/prophecies?action=new"
              className="px-4 py-3 bg-primary/10 border border-primary/30 text-primary text-sm font-medium hover:bg-primary/20 transition-colors text-center"
            >
              + Add Prophecy
            </Link>
          </div>
        </div>

        {/* Recent Activity Placeholder */}
        <div className="bg-card border border-border p-6">
          <h2 className="font-display text-xl tracking-wide text-foreground mb-4">
            Content Overview
          </h2>
          <p className="text-muted-foreground text-sm">
            Use the sidebar navigation to manage each content type. You can add, edit, and delete entries for all your world-building content.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
