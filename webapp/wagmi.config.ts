import { defineConfig } from "@wagmi/cli";
import { hardhat, react } from "@wagmi/cli/plugins";
import { erc20ABI } from "wagmi";

export default defineConfig({
  out: "generated/wagmiTypes.ts",
  contracts: [
    {
      name: "erc20",
      abi: erc20ABI,
    },
  ],
  plugins: [
    hardhat({
      project: "../core",
      artifacts: "../core/artifacts",
      commands: {
        clean: "yarn hardhat clean",
        build: "yarn hardhat compile",
        rebuild: "yarn hardhat compile",
      },
    }),
    react(),
  ],
});
