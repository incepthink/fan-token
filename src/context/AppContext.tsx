import React, { createContext, useContext, useState, useCallback } from "react";
import {
  allTasks,
  mockApprovals,
  type Task,
  type TaskStatus,
  type Approval,
} from "@/data/mock";

interface AppState {
  isArtistLoggedIn: boolean;
  tasks: Task[];
  approvals: Approval[];
  setArtistLoggedIn: (v: boolean) => void;
  completeTask: (taskId: string) => void;
  submitForReview: (taskId: string) => void;
  approveSubmission: (approvalId: string) => void;
  rejectSubmission: (approvalId: string) => void;
  addTask: (task: Task) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isArtistLoggedIn, setArtistLoggedIn] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(allTasks);
  const [approvals, setApprovals] = useState<Approval[]>(mockApprovals);

  const completeTask = useCallback((taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: "completed" as TaskStatus } : t,
      ),
    );
  }, []);

  const submitForReview = useCallback((taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: "in_review" as TaskStatus } : t,
      ),
    );
  }, []);

  const approveSubmission = useCallback((approvalId: string) => {
    setApprovals((prev) =>
      prev.map((a) =>
        a.id === approvalId ? { ...a, status: "approved" as const } : a,
      ),
    );
  }, []);

  const rejectSubmission = useCallback((approvalId: string) => {
    setApprovals((prev) =>
      prev.map((a) =>
        a.id === approvalId ? { ...a, status: "rejected" as const } : a,
      ),
    );
  }, []);

  const addTask = useCallback((task: Task) => {
    setTasks((prev) => [...prev, task]);
  }, []);

  return (
    <AppContext.Provider
      value={{
        isArtistLoggedIn,
        tasks,
        approvals,
        setArtistLoggedIn,
        completeTask,
        submitForReview,
        approveSubmission,
        rejectSubmission,
        addTask,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
