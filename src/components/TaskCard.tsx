import { Check, Clock, AlertCircle, Coins } from "lucide-react";
import type { Task } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TaskCardProps {
  task: Task;
  tokenSymbol: string;
  walletConnected: boolean;
  onComplete: (taskId: string) => void;
  onSubmitReview: (taskId: string) => void;
}

export function TaskCard({ task, tokenSymbol, walletConnected, onComplete, onSubmitReview }: TaskCardProps) {
  const isCompleted = task.status === "completed";
  const isInReview = task.status === "in_review";
  const isPaused = task.status === "paused";
  const isAvailable = task.status === "available";

  return (
    <div
      className={`rounded-2xl border p-4 transition-all duration-200 ${
        isCompleted
          ? "border-emerald-200 bg-emerald-50"
          : isInReview
          ? "border-amber-200 bg-amber-50"
          : isPaused
          ? "border-red-200 bg-red-50"
          : isAvailable && task.type === "instant"
          ? "border-amber-200 bg-amber-50 hover:-translate-y-0.5 hover:shadow-md hover:border-amber-300"
          : "border-indigo-200 bg-indigo-50 hover:-translate-y-0.5 hover:shadow-md hover:border-indigo-300"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h4 className="font-semibold text-foreground">{task.title}</h4>
            {isAvailable && task.type === "instant" && (
              <Badge className="bg-amber-100 text-amber-700 border-amber-300 text-[10px] h-5 px-1.5">
                ⚡ Instant
              </Badge>
            )}
            {isAvailable && task.type === "manual" && (
              <Badge className="bg-indigo-100 text-indigo-700 border-indigo-300 text-[10px] h-5 px-1.5">
                ✎ Review
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{task.description}</p>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="flex items-center gap-1.5 rounded-xl bg-white px-3 py-1.5 shadow-sm border border-white/80">
            <Coins className="h-4 w-4 text-amber-500" />
            <span className="text-lg font-black text-foreground">{task.rewardAmount}</span>
            <span className="text-xs text-muted-foreground font-medium">{tokenSymbol}</span>
          </div>

          {isCompleted ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
              <Check className="h-3 w-3" /> Done
            </span>
          ) : isInReview ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
              <Clock className="h-3 w-3" /> In Review
            </span>
          ) : isPaused ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700">
              <AlertCircle className="h-3 w-3" /> Paused
            </span>
          ) : !walletConnected ? (
            <Button size="sm" disabled variant="outline" className="text-xs">
              Connect Wallet
            </Button>
          ) : task.type === "instant" ? (
            <Button
              size="sm"
              onClick={() => onComplete(task.id)}
              className="text-xs bg-amber-500 hover:bg-amber-600 text-white border-0"
            >
              Complete
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={() => onSubmitReview(task.id)}
              className="text-xs bg-indigo-500 hover:bg-indigo-600 text-white border-0"
            >
              Submit for Review
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
