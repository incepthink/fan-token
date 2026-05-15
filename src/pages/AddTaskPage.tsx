import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { artists } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Zap, ClipboardList, Coins, ChevronRight, CheckCircle2, Clock } from "lucide-react";

export default function AddTaskPage() {
  const { fanPageId } = useParams();
  const navigate = useNavigate();
  const { addTask } = useApp();
  const artist = artists.find((a) => a.id === fanPageId);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rewardAmount, setRewardAmount] = useState("");
  const [isManual, setIsManual] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fanPageId) return;

    addTask({
      id: `${fanPageId}-t${Date.now()}`,
      fanPageId,
      title,
      description,
      rewardAmount: Number(rewardAmount),
      type: isManual ? "manual" : "instant",
      status: "available",
    });

    toast.success("Task added!");
    navigate("/artist/dashboard");
  };

  const previewTitle = title || "Task title";
  const previewDesc = description || "Describe what the fan needs to do...";
  const previewReward = rewardAmount || "0";

  return (
    <div className="min-h-full" style={{ background: "linear-gradient(160deg, #f5f3ff 0%, #fdf4ff 30%, #fff 70%)" }}>
      {/* Page header */}
      <div className="border-b bg-white px-6 py-5 md:px-8">
        {/* Breadcrumb */}
        <nav className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link to="/artist/dashboard" className="hover:text-foreground font-medium">Dashboard</Link>
          <ChevronRight className="h-3 w-3" />
          {artist && <span className="font-medium">{artist.name}</span>}
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-foreground">Add Task</span>
        </nav>

        <h1 className="text-xl font-black text-foreground">Create a New Task</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Define what fans need to do and how many{" "}
          <span className="font-semibold text-foreground">{artist?.tokenSymbol ?? "tokens"}</span> they earn
        </p>
      </div>

      <div className="px-6 py-8 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-muted-foreground">Task Details</h2>
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-semibold">
                    Task title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Follow on Spotify, Share a post, Write a review"
                    className="h-11"
                    required
                  />
                  <p className="text-xs text-muted-foreground">Keep it short and action-oriented</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="desc" className="text-sm font-semibold">Description</Label>
                  <Textarea
                    id="desc"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Explain exactly what fans need to do, any links they need, and how to verify completion..."
                    rows={4}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    Clear instructions = faster completions and fewer questions
                  </p>
                </div>
              </div>
            </div>

            {/* Reward */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-muted-foreground">Token Reward</h2>
              <div className="space-y-2">
                <Label htmlFor="reward" className="text-sm font-semibold">
                  Amount <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Coins className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-500" />
                  <Input
                    id="reward"
                    type="number"
                    min="1"
                    value={rewardAmount}
                    onChange={(e) => setRewardAmount(e.target.value)}
                    placeholder="100"
                    className="h-11 pl-9 pr-20 font-semibold"
                    required
                  />
                  {artist && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-violet-100 px-2.5 py-1 text-xs font-bold text-violet-700">
                      {artist.tokenSymbol}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Higher rewards attract more fan engagement. Instant tasks typically earn 50–200 tokens.
                </p>
              </div>
            </div>

            {/* Task type selector */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="mb-1 text-sm font-black uppercase tracking-widest text-muted-foreground">Completion Type</h2>
              <p className="mb-4 text-xs text-muted-foreground">How should fans prove they completed this task?</p>

              <div className="grid gap-3 sm:grid-cols-2">
                {/* Instant option */}
                <button
                  type="button"
                  onClick={() => setIsManual(false)}
                  className={`relative rounded-2xl border-2 p-5 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                    !isManual
                      ? "border-amber-400 bg-amber-50 shadow-md shadow-amber-100"
                      : "border-border bg-background hover:border-amber-200 hover:bg-amber-50/50"
                  }`}
                >
                  {!isManual && (
                    <span className="absolute right-3 top-3">
                      <CheckCircle2 className="h-4 w-4 text-amber-500" />
                    </span>
                  )}
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                    <Zap className="h-5 w-5 text-amber-600" />
                  </div>
                  <h3 className="mb-1 text-sm font-black text-foreground">Instant</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Fans click "Complete" and tokens are sent immediately. Best for self-verifiable actions.
                  </p>
                  <span className="mt-3 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">
                    No review needed
                  </span>
                </button>

                {/* Manual option */}
                <button
                  type="button"
                  onClick={() => setIsManual(true)}
                  className={`relative rounded-2xl border-2 p-5 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                    isManual
                      ? "border-indigo-400 bg-indigo-50 shadow-md shadow-indigo-100"
                      : "border-border bg-background hover:border-indigo-200 hover:bg-indigo-50/50"
                  }`}
                >
                  {isManual && (
                    <span className="absolute right-3 top-3">
                      <CheckCircle2 className="h-4 w-4 text-indigo-500" />
                    </span>
                  )}
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
                    <ClipboardList className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h3 className="mb-1 text-sm font-black text-foreground">Manual Review</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Fans submit proof, you review and approve. Best for creative tasks or screenshots.
                  </p>
                  <span className="mt-3 inline-block rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-indigo-700">
                    You approve each one
                  </span>
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              className="w-full gap-2 font-bold text-base"
              style={{ background: "linear-gradient(135deg, #7c3aed, #d946ef)" }}
            >
              <CheckCircle2 className="h-5 w-5" />
              Save Task
            </Button>
          </form>

          {/* Live preview */}
          <div className="hidden lg:block">
            <div className="sticky top-6">
              <p className="mb-3 text-xs font-black uppercase tracking-widest text-muted-foreground">
                Preview — how fans see this task
              </p>

              <div
                className={`rounded-2xl border-2 p-5 transition-all duration-200 ${
                  !isManual
                    ? "border-amber-200 bg-amber-50"
                    : "border-indigo-200 bg-indigo-50"
                }`}
              >
                {/* Task type badge */}
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${
                      !isManual ? "bg-amber-100 text-amber-700" : "bg-indigo-100 text-indigo-700"
                    }`}
                  >
                    {!isManual ? <Zap className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                    {!isManual ? "Instant" : "Review"}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-sm font-black text-foreground shadow-sm border">
                    <Coins className="h-3.5 w-3.5 text-amber-500" />
                    {previewReward}
                    <span className="text-xs text-muted-foreground font-semibold">
                      {artist?.tokenSymbol}
                    </span>
                  </span>
                </div>

                <h3 className={`mb-1.5 text-sm font-black ${title ? "text-foreground" : "text-muted-foreground/50"}`}>
                  {previewTitle}
                </h3>
                <p className={`text-xs leading-relaxed ${description ? "text-muted-foreground" : "text-muted-foreground/40"}`}>
                  {previewDesc}
                </p>

                <div className="mt-4">
                  <div
                    className={`w-full rounded-xl py-2.5 text-center text-sm font-bold text-white ${
                      !isManual ? "bg-amber-500" : "bg-indigo-500"
                    }`}
                  >
                    {!isManual ? "Complete Task" : "Submit for Review"}
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-violet-100 bg-violet-50 p-4">
                <p className="text-xs font-semibold text-violet-700 mb-1">
                  {!isManual ? "Instant payout" : "Manual review flow"}
                </p>
                <p className="text-xs text-violet-600 leading-relaxed">
                  {!isManual
                    ? "Fan clicks Complete → tokens sent immediately to their wallet. No action needed from you."
                    : "Fan submits → you get a notification → you review & approve → tokens are sent."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
