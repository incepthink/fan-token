import { useParams } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { artists } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { format } from "date-fns";

function truncateAddress(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export default function ApprovalsPage() {
  const { fanPageId } = useParams();
  const { approvals, approveSubmission, rejectSubmission } = useApp();
  const artist = fanPageId ? artists.find((a) => a.id === fanPageId) : artists[0];

  const filteredApprovals = approvals.filter((a) => a.status === "pending");

  const handleApprove = (id: string) => {
    approveSubmission(id);
    toast.success("Tokens sent!");
  };

  const handleReject = (id: string) => {
    rejectSubmission(id);
    toast("Submission rejected");
  };

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold text-foreground mb-1">Pending Approvals</h1>
      {artist && <p className="text-sm text-muted-foreground mb-6">{artist.name}</p>}

      {filteredApprovals.length === 0 ? (
        <div className="py-16 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <svg className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm text-muted-foreground">No pending approvals</p>
        </div>
      ) : (
        <div className="rounded-lg border">
          <div className="hidden md:grid grid-cols-4 gap-4 border-b px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <span>Fan Wallet</span>
            <span>Task</span>
            <span>Submitted</span>
            <span className="text-right">Actions</span>
          </div>
          {filteredApprovals.map((approval) => (
            <div
              key={approval.id}
              className="grid grid-cols-1 gap-2 border-b px-4 py-3 last:border-0 md:grid-cols-4 md:items-center md:gap-4"
            >
              <span className="font-mono text-sm text-foreground">{truncateAddress(approval.fanWallet)}</span>
              <span className="text-sm text-foreground">{approval.taskName}</span>
              <span className="text-sm text-muted-foreground">
                {format(new Date(approval.submittedAt), "MMM d, HH:mm")}
              </span>
              <div className="flex gap-2 md:justify-end">
                <Button size="sm" onClick={() => handleApprove(approval.id)}>
                  Approve
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleReject(approval.id)}>
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
