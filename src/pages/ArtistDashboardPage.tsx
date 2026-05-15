import { Link } from "react-router-dom";
import { artists, generateTasks } from "@/data/mock";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Plus, Users, Coins, Clock, CheckCircle2, Zap, ArrowRight, ListChecks } from "lucide-react";

export default function ArtistDashboardPage() {
  const { approvals } = useApp();
  const pendingCount = approvals.filter((a) => a.status === "pending").length;
  const myArtists = artists.slice(0, 2);

  return (
    <div className="min-h-full" style={{ background: "linear-gradient(160deg, #f5f3ff 0%, #fdf4ff 30%, #fff 70%)" }}>
      {/* Hero header strip */}
      <div
        className="border-b px-6 py-8 md:px-8"
        style={{ background: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #a21caf 100%)" }}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-sm font-semibold text-violet-200">Artist Dashboard</p>
            <h1 className="text-2xl font-black text-white">Welcome back</h1>
            <p className="mt-1 text-sm text-violet-200">Manage your fan pages, tasks, and token rewards</p>
          </div>
          <Link to="/artist/dashboard/create">
            <Button
              size="lg"
              className="gap-2 font-bold bg-white text-violet-700 hover:bg-white/90 shadow-lg shrink-0"
            >
              <Plus className="h-4 w-4" />
              Create Fan Page
            </Button>
          </Link>
        </div>
      </div>

      <div className="px-6 py-8 md:px-8">
        {/* Stats row */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-violet-100 bg-violet-50 p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
              <Users className="h-5 w-5 text-violet-600" />
            </div>
            <p className="text-3xl font-black text-violet-700">1,247</p>
            <p className="mt-0.5 text-sm font-semibold text-violet-600">Total Fans</p>
            <p className="mt-1 text-xs text-violet-400">across all your fan pages</p>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
              <Coins className="h-5 w-5 text-emerald-600" />
            </div>
            <p className="text-3xl font-black text-emerald-700">32,500</p>
            <p className="mt-0.5 text-sm font-semibold text-emerald-600">Tokens Distributed</p>
            <p className="mt-1 text-xs text-emerald-400">total rewards sent to fans</p>
          </div>

          <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5 relative">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <p className="text-3xl font-black text-amber-700">{pendingCount}</p>
            <p className="mt-0.5 text-sm font-semibold text-amber-600">Pending Approvals</p>
            <p className="mt-1 text-xs text-amber-400">fan submissions awaiting review</p>
            {pendingCount > 0 && (
              <Link
                to="/artist/dashboard/approvals"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:underline"
              >
                Review now <ArrowRight className="h-3 w-3" />
              </Link>
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div className="mb-8 rounded-2xl border border-violet-100 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-muted-foreground">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/artist/dashboard/create">
              <Button variant="outline" className="gap-2 border-violet-200 text-violet-700 hover:bg-violet-50">
                <Plus className="h-4 w-4" />
                New Fan Page
              </Button>
            </Link>
            <Link to="/artist/dashboard/approvals">
              <Button variant="outline" className="relative gap-2 border-amber-200 text-amber-700 hover:bg-amber-50">
                <CheckCircle2 className="h-4 w-4" />
                Review Submissions
                {pendingCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white">
                    {pendingCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Fan pages list */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-black text-foreground">My Fan Pages</h2>
          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
            {myArtists.length} pages
          </span>
        </div>

        {myArtists.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50/50 p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100">
              <ListChecks className="h-8 w-8 text-violet-400" />
            </div>
            <h3 className="mb-2 text-lg font-black text-foreground">No fan pages yet</h3>
            <p className="mb-6 text-sm text-muted-foreground">Create your first fan page and start rewarding your fans</p>
            <Link to="/artist/dashboard/create">
              <Button className="gap-2 font-bold" style={{ background: "linear-gradient(135deg, #7c3aed, #d946ef)" }}>
                <Plus className="h-4 w-4" />
                Create your first fan page
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {myArtists.map((artist) => {
              const tasks = generateTasks(artist);
              const instantCount = tasks.filter((t) => t.type === "instant").length;
              const manualCount = tasks.filter((t) => t.type === "manual").length;
              const artistPending = approvals.filter((a) => a.status === "pending").length;

              return (
                <div
                  key={artist.id}
                  className="rounded-2xl border bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="rounded-full p-0.5 shrink-0"
                        style={{ background: "linear-gradient(135deg, #7c3aed, #d946ef)" }}
                      >
                        <img
                          src={artist.avatar}
                          alt={artist.name}
                          className="h-12 w-12 rounded-full border-2 border-white"
                        />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-base font-black text-foreground">{artist.name}</h3>
                          <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-2.5 py-0.5 text-xs font-bold text-white">
                            <Zap className="h-3 w-3" />
                            ${artist.tokenSymbol}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                            <Zap className="h-3 w-3" />
                            {instantCount} instant
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                            <ListChecks className="h-3 w-3" />
                            {manualCount} review
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:shrink-0">
                      <Link to={`/artist/dashboard/${artist.id}/tasks/new`}>
                        <Button size="sm" className="gap-1.5 font-semibold">
                          <Plus className="h-3.5 w-3.5" />
                          Add Task
                        </Button>
                      </Link>
                      <Link to={`/artist/dashboard/${artist.id}/approvals`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="relative gap-1.5 font-semibold border-amber-200 text-amber-700 hover:bg-amber-50"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Approvals
                          {artistPending > 0 && (
                            <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-black text-white">
                              {artistPending}
                            </span>
                          )}
                        </Button>
                      </Link>
                      <Link to={`/${artist.slug}`} target="_blank">
                        <Button size="sm" variant="ghost" className="gap-1.5 font-semibold text-muted-foreground">
                          View Page
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
