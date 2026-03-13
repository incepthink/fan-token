import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { artists } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

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

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold text-foreground mb-1">Add Task</h1>
      {artist && <p className="text-sm text-muted-foreground mb-6">For {artist.name}'s fan page</p>}

      <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Follow on Spotify" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="desc">Description</Label>
          <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the task..." rows={3} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reward">Token reward amount</Label>
          <Input id="reward" type="number" value={rewardAmount} onChange={(e) => setRewardAmount(e.target.value)} placeholder="100" required />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <p className="text-sm font-medium text-foreground">Manual approval</p>
            <p className="text-xs text-muted-foreground">
              {isManual ? "You'll review and approve each submission" : "Fans click complete and get rewarded instantly"}
            </p>
          </div>
          <Switch checked={isManual} onCheckedChange={setIsManual} />
        </div>

        <Button type="submit" className="w-full">Save Task</Button>
      </form>
    </div>
  );
}
