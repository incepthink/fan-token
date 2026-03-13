import { Link, Outlet, useLocation, Navigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { Header } from "@/components/Header";
import { LayoutDashboard, CheckCircle, Plus } from "lucide-react";

const sidebarLinks = [
  { label: "My Fan Pages", path: "/artist/dashboard", icon: LayoutDashboard },
  { label: "Pending Approvals", path: "/artist/dashboard/approvals", icon: CheckCircle },
];

export default function ArtistDashboardLayout() {
  const { isArtistLoggedIn } = useApp();
  const location = useLocation();

  if (!isArtistLoggedIn) return <Navigate to="/artist/login" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 border-r bg-sidebar md:block">
          <nav className="flex flex-col gap-1 p-3 pt-6">
            {sidebarLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Mobile nav */}
        <div className="flex w-full flex-col md:hidden border-b bg-sidebar px-4 py-2">
          <div className="flex gap-2">
            {sidebarLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground"
                  }`}
                >
                  <link.icon className="h-3.5 w-3.5" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
