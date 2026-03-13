import { http, createConfig } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

export const config = getDefaultConfig({
  appName: "FanDrop",
  projectId: "fandrop-demo-project-id",
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
});
