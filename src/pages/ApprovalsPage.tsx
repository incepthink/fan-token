import { useState } from "react";
import { useParams } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { artists } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { CheckCircle2, XCircle, Clock, Wallet, ClipboardList, CheckCheck } from "lucide-react";

type FilterTab = "pending" | "approved" | "rejected";

function truncateAddress(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export default function ApprovalsPage() {
  const { fanPageId } = useParams();
  const { approvals, approveSubmission, rejectSubmission } = useApp();
  const artist = fanPageId ? artists.find((a) => a.id === fanPageId) : artists[0];
  const [activeTab, setActiveTab] = useState<FilterTab>("pending");

  const tabs: { key: FilterTab; label: string; color: string }[] = [
    { key: "pending", label: "Pending", color: "amber" },
    { key: "approved", label: "Approved", color: "emerald" },
    { key: "rejected", label: "Rejected", color: "red" },
  ];

  const filtered = approvals.filter((a) => a.status === activeTab);
  const pendingCount = approvals.filter((a) => a.status === "pending").length;

  const handleApprove = (id: string) => {
    approveSubmission(id);
    toast.success("Tokens sent to fan!");
  };

  const handleReject = (id: string) => {
    rejectSubmission(id);
    toast("Submission rejected");
  };

  return (
    <div className="min-h-full" style={{ background: "linear-gradient(160deg, #f5f3ff 0%, #fdf4ff 30%, #fff 70%)" }}>
      {/* Page header */}
      <div className="border-b bg-white px-6 py-6 md:px-8">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-black text-foreground">Fan Submissions</h1>
            {artist && (
              <p className="text-sm text-muted-foreground">
                Review and approve submissions for{" "}
                <span className="font-semibold text-foreground">{artist.name}</span>'s fan page
              </p>
            )}
          </div>
          {pendingCount > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1.5 text-sm font-bold text-amber-700">
              <Clock className="h-4 w-4" />
              {pendingCount} awaiting review
            </span>
          )}
        </div>

        {/* Tab bar */}
        <div className="mt-5 flex gap-1 rounded-xl bg-muted p-1 w-fit">
          {tabs.map(({ key, label }) => {
            const count = approvals.filter((a) => a.status === key).length;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-sm font-semibold transition-all ${
                  activeTab === key
                    ? "bg-white text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-xs font-black ${
                    activeTab === key ? "bg-muted text-foreground" : "bg-muted/50 text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-6 py-6 md:px-8">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-100">
              <CheckCheck className="h-10 w-10 text-emerald-500" />
            </div>
            <h3 className="mb-2 text-lg font-black text-foreground">
              {activeTab === "pending" ? "All caught up!" : `No ${activeTab} submissions`}
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              {activeTab === "pending"
                ? "No submissions are waiting for your review right now."
                : `Fan submissions that you ${activeTab} will appear here.`}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((approval) => {
              const isPending = approval.status === "pending";
              const isApproved = approval.status === "approved";

              return (
                <div
                  key={approval.id}
                  className={`rounded-2xl border p-5 transition-all duration-200 ${
                    isPending
                      ? "border-amber-200 bg-amber-50 hover:-translate-y-0.5 hover:shadow-md hover:shadow-amber-100"
                      : isApproved
                      ? "border-emerald-200 bg-emerald-50"
                      : "border-red-200 bg-red-50"
                  }`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      {/* Status icon */}
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          isPending ? "bg-amber-100" : isApproved ? "bg-emerald-100" : "bg-red-100"
                        }`}
                      >
                        {isPending ? (
                          <Clock className={`h-5 w-5 text-amber-600`} />
                        ) : isApproved ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>

                      <div>
                        {/* Task name */}
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <ClipboardList className={`h-3.5 w-3.5 ${isPending ? "text-amber-500" : isApproved ? "text-emerald-500" : "text-red-500"}`} />
                          <span className="text-sm font-black text-foreground">{approval.taskName}</span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                              isPending
                                ? "bg-amber-200 text-amber-800"
                                : isApproved
                                ? "bg-emerald-200 text-emerald-800"
                                : "bg-red-200 text-red-800"
                            }`}
                          >
                            {approval.status}
                          </span>
                        </div>

                        {/* Wallet + time */}
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <Wallet className="h-3 w-3" />
                            <span className="font-mono font-semibold">{truncateAddress(approval.fanWallet)}</span>
                          </span>
                          <span>·</span>
                          <span>
                            {formatDistanceToNow(new Date(approval.submittedAt), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {isPending && (
                      <div className="flex gap-2 sm:shrink-0">
                        <Button
                          size="sm"
                          className="gap-1.5 bg-emerald-500 font-bold text-white hover:bg-emerald-600"
                          onClick={() => handleApprove(approval.id)}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1.5 border-red-200 font-bold text-red-600 hover:bg-red-50"
                          onClick={() => handleReject(approval.id)}
                        >
                          <XCircle className="h-3.5 w-3.5" />
                          Reject
                        </Button>
                      </div>
                    )}
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
