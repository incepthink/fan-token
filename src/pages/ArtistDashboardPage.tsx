import { Link } from "react-router-dom";
import { artists, generateTasks } from "@/data/mock";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Plus, Users, Coins, Clock } from "lucide-react";

const stats = [
  { label: "Total Fans", value: "1,247", icon: Users },
  { label: "Tokens Distributed", value: "32,500", icon: Coins },
  { label: "Pending Approvals", value: "3", icon: Clock },
];

export default function ArtistDashboardPage() {
  const { approvals } = useApp();
  const pendingCount = approvals.filter((a) => a.status === "pending").length;

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <Link to="/artist/dashboard/create">
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" /> Create Fan Page
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <div key={i} className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <stat.icon className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wider">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {stat.label === "Pending Approvals" ? pendingCount : stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Fan Pages */}
      <h2 className="mb-4 text-lg font-semibold text-foreground">My Fan Pages</h2>
      <div className="space-y-3">
        {artists.slice(0, 2).map((artist) => {
          const tasks = generateTasks(artist);
          return (
            <div
              key={artist.id}
              className="flex items-center justify-between rounded-lg border bg-card p-4"
            >
              <div className="flex items-center gap-3">
                <img src={artist.avatar} alt={artist.name} className="h-10 w-10 rounded-full" />
                <div>
                  <h3 className="font-medium text-foreground">{artist.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {tasks.length} tasks · ${artist.tokenSymbol}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link to={`/artist/dashboard/${artist.id}/tasks/new`}>
                  <Button variant="outline" size="sm">
                    Add Task
                  </Button>
                </Link>
                <Link to={`/artist/dashboard/${artist.id}/approvals`}>
                  <Button variant="ghost" size="sm">
                    Approvals
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
