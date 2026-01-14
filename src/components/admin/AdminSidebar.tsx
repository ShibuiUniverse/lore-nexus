import { NavLink, useLocation } from "react-router-dom";
import {
  Calendar,
  Users,
  MapPin,
  Sword,
  ScrollText,
  BookOpen,
  LogOut,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const navItems = [
  { to: "/admin", icon: Home, label: "Dashboard", end: true },
  { to: "/admin/timeline", icon: Calendar, label: "Timeline Events" },
  { to: "/admin/characters", icon: Users, label: "Characters" },
  { to: "/admin/locations", icon: MapPin, label: "Locations" },
  { to: "/admin/peoples", icon: Users, label: "People Groups" },
  { to: "/admin/artifacts", icon: Sword, label: "Artifacts" },
  { to: "/admin/prophecies", icon: ScrollText, label: "Prophecies" },
  { to: "/admin/stories", icon: BookOpen, label: "Stories" },
];

export function AdminSidebar() {
  const { signOut, user } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-card border-r border-border flex flex-col transition-all duration-300 z-50",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!collapsed && (
          <h1 className="font-display text-lg tracking-wide text-primary">
            Admin Panel
          </h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )
            }
          >
            <item.icon size={18} />
            {!collapsed && (
              <span className="text-sm font-medium">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border space-y-2">
        {/* View site link */}
        <NavLink
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <Home size={18} />
          {!collapsed && <span className="text-sm">View Site</span>}
        </NavLink>

        {/* User info */}
        {!collapsed && user && (
          <div className="px-3 py-2 text-xs text-muted-foreground truncate">
            {user.email}
          </div>
        )}

        {/* Sign out */}
        <button
          onClick={signOut}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut size={18} />
          {!collapsed && <span className="text-sm">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
