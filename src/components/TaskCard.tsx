import { Check, Clock, AlertCircle } from "lucide-react";
import type { Task } from "@/data/mock";
import { Button } from "@/components/ui/button";

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

  return (
    <div
      className={`rounded-lg border p-4 transition-all duration-200 ${
        isCompleted
          ? "border-success/30 bg-success/5"
          : isInReview
          ? "border-warning/30 bg-warning/5"
          : isPaused
          ? "border-destructive/30 bg-destructive/5"
          : "bg-card hover:-translate-y-0.5 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-foreground">{task.title}</h4>
            {task.type === "manual" && task.status === "available" && (
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                Review
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{task.description}</p>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <span className="text-sm font-semibold text-primary">
            {task.rewardAmount} {tokenSymbol}
          </span>

          {isCompleted ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
              <Check className="h-3 w-3" /> Done
            </span>
          ) : isInReview ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-warning/10 px-2.5 py-1 text-xs font-medium text-warning">
              <Clock className="h-3 w-3" /> In Review
            </span>
          ) : isPaused ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive">
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
              className="text-xs"
            >
              Complete
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onSubmitReview(task.id)}
              className="text-xs border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Submit for Review
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
