import { useParams } from "react-router-dom";
import { useAccount } from "wagmi";
import { artists } from "@/data/mock";
import { useApp } from "@/context/AppContext";
import { Header } from "@/components/Header";
import { TaskCard } from "@/components/TaskCard";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Zap, ClipboardList, Coins, CheckCircle2, Clock4, Wallet } from "lucide-react";

export default function FanPageView() {
  const { fanPageSlug } = useParams();
  const { isConnected } = useAccount();
  const { tasks, completeTask, submitForReview } = useApp();
  const artist = artists.find((a) => a.slug === fanPageSlug);

  if (!artist) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-32">
          <p className="text-muted-foreground">Fan page not found</p>
        </div>
      </div>
    );
  }

  const pageTasks = tasks.filter((t) => t.fanPageId === artist.id);
  const instantTasks = pageTasks.filter((t) => t.type === "instant");
  const manualTasks = pageTasks.filter((t) => t.type === "manual");
  const availableCount = pageTasks.filter((t) => t.status === "available").length;
  const totalEarnable = pageTasks
    .filter((t) => t.status === "available")
    .reduce((s, t) => s + t.rewardAmount, 0);
  const completedCount = pageTasks.filter((t) => t.status === "completed").length;

  const handleComplete = (taskId: string) => {
    const task = pageTasks.find((t) => t.id === taskId);
    completeTask(taskId);
    toast.success(`${task?.rewardAmount} ${artist.tokenSymbol} sent to your wallet!`);
  };

  const handleSubmitReview = (taskId: string) => {
    submitForReview(taskId);
    toast("Submitted for review");
  };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(160deg, #f5f3ff 0%, #fdf4ff 30%, #fff 60%)" }}>
      <Header />

      {/* ── BANNER ── */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={artist.banner}
          alt={`${artist.name} banner`}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-violet-900/30 to-transparent" />
      </div>

      {/* ── ARTIST PROFILE CARD ── */}
      <div className="container relative -mt-16 mb-8 z-10">
        <div
          className="rounded-2xl border border-violet-100 p-6 shadow-xl shadow-violet-100/60"
          style={{ background: "linear-gradient(135deg, #faf5ff 0%, #fdf4ff 50%, #fff 100%)" }}
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">

            {/* Avatar with gradient ring */}
            <div className="shrink-0">
              <div
                className="rounded-full p-1"
                style={{ background: "linear-gradient(135deg, #7c3aed, #d946ef)" }}
              >
                <img
                  src={artist.avatar}
                  alt={artist.name}
                  className="h-20 w-20 rounded-full border-2 border-white object-cover"
                />
              </div>
            </div>

            {/* Name + token + description */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-2xl font-black text-foreground">{artist.name}</h1>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-3 py-1 text-sm font-bold text-white">
                  <Zap className="h-3.5 w-3.5" />
                  {artist.tokenSymbol}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">{artist.description}</p>
            </div>
          </div>

          {/* Stat blocks row */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl bg-violet-50 border border-violet-100 px-4 py-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <ClipboardList className="h-4 w-4 text-violet-500" />
              </div>
              <p className="text-xl font-black text-violet-700">{availableCount}</p>
              <p className="text-xs font-medium text-violet-500">Tasks Open</p>
            </div>
            <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <Coins className="h-4 w-4 text-emerald-500" />
              </div>
              <p className="text-xl font-black text-emerald-700">{totalEarnable}</p>
              <p className="text-xs font-medium text-emerald-500">{artist.tokenSymbol} Earnable</p>
            </div>
            <div className="rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <Zap className="h-4 w-4 text-amber-500" />
              </div>
              <p className="text-xl font-black text-amber-700">{instantTasks.length}</p>
              <p className="text-xs font-medium text-amber-500">Instant Tasks</p>
            </div>
            <div className="rounded-xl bg-indigo-50 border border-indigo-100 px-4 py-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <Clock4 className="h-4 w-4 text-indigo-500" />
              </div>
              <p className="text-xl font-black text-indigo-700">{manualTasks.length}</p>
              <p className="text-xs font-medium text-indigo-500">Review Tasks</p>
            </div>
          </div>

          {/* Wallet notice */}
          {!isConnected && (
            <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-medium text-violet-700">
              <Wallet className="h-4 w-4 shrink-0" />
              Connect your wallet to start earning{" "}
              <span className="font-bold">{artist.tokenSymbol}</span> tokens
            </div>
          )}

          {completedCount > 0 && (
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              You've completed <span className="font-bold">{completedCount} task{completedCount > 1 ? "s" : ""}</span> on this page!
            </div>
          )}
        </div>
      </div>

      {/* ── TASKS ── */}
      <div className="container pb-24 space-y-10">

        {/* Quick Tasks (instant) */}
        {instantTasks.length > 0 && (
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100">
                <Zap className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-base font-bold text-foreground">Quick Tasks</h2>
                <p className="text-xs text-muted-foreground">Complete instantly — tokens sent right away</p>
              </div>
              <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700">
                {instantTasks.length} tasks
              </span>
            </div>
            <Separator className="mb-4" />
            <div className="space-y-3">
              {instantTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  tokenSymbol={artist.tokenSymbol}
                  walletConnected={isConnected}
                  onComplete={handleComplete}
                  onSubmitReview={handleSubmitReview}
                />
              ))}
            </div>
          </section>
        )}

        {/* Featured Tasks (manual / review) */}
        {manualTasks.length > 0 && (
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-100">
                <ClipboardList className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-base font-bold text-foreground">Featured Tasks</h2>
                <p className="text-xs text-muted-foreground">Submitted for artist review — higher rewards</p>
              </div>
              <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-bold text-indigo-700">
                {manualTasks.length} tasks
              </span>
            </div>
            <Separator className="mb-4" />
            <div className="space-y-3">
              {manualTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  tokenSymbol={artist.tokenSymbol}
                  walletConnected={isConnected}
                  onComplete={handleComplete}
                  onSubmitReview={handleSubmitReview}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
