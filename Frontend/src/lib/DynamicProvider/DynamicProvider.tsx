"use client";

import { PropsWithChildren } from "react";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

export const DynamicProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const evmNetworks = [
    {
      blockExplorerUrls: ["https://sepolia.scroll.io/"],
      chainId: 421614,
      chainName: "Scroll Sepolia",
      iconUrls: ["https://luffy-eight.vercel.app/sponsors/5.png"],
      name: "Scroll Sepolia",
      nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
      },
      networkId: 421614,
      rpcUrls: [
        process.env.NEXT_PUBLIC_ARB_SEPOLIA_URL ||
          "https://rpc.ankr.com/scroll_sepolia_testnet",
      ],
      vanityName: "Scroll sepolia",
    },
    {
      blockExplorerUrls: ["https://sepolia.etherscan.io"],
      chainId: 11155111,
      chainName: "Ethereum Sepolia",
      iconUrls: ["https://app.dynamic.xyz/assets/networks/eth.svg"],
      name: "Ethereum",
      nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
      },
      networkId: 11155111,
      rpcUrls: [process.env.NEXT_PUBLIC_SEPOLIA_URL || ""],
      vanityName: "ETH Sepolia",
    },
  ];
  return (
    <DynamicContextProvider
      settings={{
        appLogoUrl: "https://luffy-eight.vercel.app/logo.png",
        overrides: { evmNetworks },
        environmentId:
          process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID ||
          "2762a57b-faa4-41ce-9f16-abff9300e2c9",
        appName: "Luffy",
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      {children}
    </DynamicContextProvider>
  );
};
