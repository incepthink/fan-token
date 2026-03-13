export interface Artist {
  id: string;
  name: string;
  slug: string;
  avatar: string;
  banner: string;
  tokenName: string;
  tokenSymbol: string;
  tokenAddress: string;
  description: string;
}

export type TaskType = "instant" | "manual";
export type TaskStatus =
  | "available"
  | "completed"
  | "in_review"
  | "rejected"
  | "paused";

export interface Task {
  id: string;
  fanPageId: string;
  title: string;
  description: string;
  rewardAmount: number;
  type: TaskType;
  status: TaskStatus;
}

export interface Approval {
  id: string;
  fanWallet: string;
  taskId: string;
  taskName: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
}

export const PLATFORM_WALLET = "0x1a2B3c4D5e6F7890AbCdEf1234567890aBcDeF12";

export const artists: Artist[] = [
  {
    id: "1",
    name: "Taylor",
    slug: "taylor",
    avatar:
      "https://ui-avatars.com/api/?name=Taylor&background=7C3AED&color=fff&size=128&bold=true",
    banner: "https://picsum.photos/seed/taylor/1200/400",
    tokenName: "TAYLOR",
    tokenSymbol: "TAY",
    tokenAddress: "0xTAY1234567890abcdef1234567890abcdef1234",
    description:
      "Exclusive rewards for Taylor's most dedicated fans. Complete tasks and earn TAY tokens.",
  },
  {
    id: "2",
    name: "Drake",
    slug: "drake",
    avatar:
      "https://ui-avatars.com/api/?name=Drake&background=7C3AED&color=fff&size=128&bold=true",
    banner: "https://picsum.photos/seed/drake/1200/400",
    tokenName: "DRKZ",
    tokenSymbol: "DRKZ",
    tokenAddress: "0xDRKZ234567890abcdef1234567890abcdef1234",
    description:
      "Join Drake's inner circle. Earn DRKZ tokens by engaging with exclusive content.",
  },
  {
    id: "3",
    name: "Billie",
    slug: "billie",
    avatar:
      "https://ui-avatars.com/api/?name=Billie&background=7C3AED&color=fff&size=128&bold=true",
    banner: "https://picsum.photos/seed/billie/1200/400",
    tokenName: "BEE",
    tokenSymbol: "BEE",
    tokenAddress: "0xBEE3234567890abcdef1234567890abcdef1234",
    description:
      "Billie's fan community. Complete tasks, earn BEE, unlock exclusive perks.",
  },
  {
    id: "4",
    name: "The Weeknd",
    slug: "the-weeknd",
    avatar:
      "https://ui-avatars.com/api/?name=The+Weeknd&background=7C3AED&color=fff&size=128&bold=true",
    banner: "https://picsum.photos/seed/weeknd/1200/400",
    tokenName: "WKD",
    tokenSymbol: "WKD",
    tokenAddress: "0xWKD4234567890abcdef1234567890abcdef1234",
    description:
      "The Weeknd's official fan page. Earn WKD tokens for your loyalty.",
  },
];

export const generateTasks = (artist: Artist): Task[] => [
  {
    id: `${artist.id}-t1`,
    fanPageId: artist.id,
    title: "Follow on Spotify",
    description: `Follow ${artist.name} on Spotify and screenshot your follow.`,
    rewardAmount: 50,
    type: "instant",
    status: "available",
  },
  {
    id: `${artist.id}-t2`,
    fanPageId: artist.id,
    title: "Share on Twitter/X",
    description: `Share ${artist.name}'s latest release on Twitter/X with #FanDrop.`,
    rewardAmount: 100,
    type: "instant",
    status: "available",
  },
  {
    id: `${artist.id}-t3`,
    fanPageId: artist.id,
    title: "Create fan art",
    description: `Create and submit original fan art inspired by ${artist.name}.`,
    rewardAmount: 250,
    type: "manual",
    status: "available",
  },
  {
    id: `${artist.id}-t4`,
    fanPageId: artist.id,
    title: "Write a review",
    description: `Write a 200+ word review of ${artist.name}'s latest album.`,
    rewardAmount: 150,
    type: "manual",
    status: "available",
  },
];

export const mockApprovals: Approval[] = [
  {
    id: "a1",
    fanWallet: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD38",
    taskId: "1-t3",
    taskName: "Create fan art",
    submittedAt: "2024-03-10T14:30:00Z",
    status: "pending",
  },
  {
    id: "a2",
    fanWallet: "0x8Ba1f109551bD432803012645Ac136ddd64DBA72",
    taskId: "1-t4",
    taskName: "Write a review",
    submittedAt: "2024-03-11T09:15:00Z",
    status: "pending",
  },
  {
    id: "a3",
    fanWallet: "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
    taskId: "1-t3",
    taskName: "Create fan art",
    submittedAt: "2024-03-11T16:45:00Z",
    status: "pending",
  },
];

export const allTasks: Task[] = artists.flatMap(generateTasks);
