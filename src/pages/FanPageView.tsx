import { useParams } from "react-router-dom";
import { useAccount } from "wagmi";
import { artists } from "@/data/mock";
import { useApp } from "@/context/AppContext";
import { Header } from "@/components/Header";
import { TaskCard } from "@/components/TaskCard";
import { toast } from "sonner";

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
    <div className="min-h-screen bg-background">
      <Header />

      {/* Banner */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img
          src={artist.banner}
          alt={`${artist.name} banner`}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      {/* Artist info */}
      <div className="container relative -mt-10 mb-8">
        <div className="flex items-end gap-4">
          <img
            src={artist.avatar}
            alt={artist.name}
            className="h-20 w-20 rounded-full border-4 border-background shadow-sm"
          />
          <div className="pb-1">
            <h1 className="text-2xl font-bold text-foreground">{artist.name}</h1>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              ${artist.tokenSymbol}
            </span>
          </div>
        </div>
        <p className="mt-3 max-w-lg text-sm text-muted-foreground">{artist.description}</p>
      </div>

      {/* Tasks */}
      <div className="container pb-20">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Tasks</h2>
        {!isConnected && (
          <div className="mb-4 rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm text-primary">
            Connect your wallet to start earning {artist.tokenSymbol} tokens
          </div>
        )}
        <div className="space-y-3">
          {pageTasks.map((task) => (
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
      </div>
    </div>
  );
}
