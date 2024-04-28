import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const jksans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zkricket",
  description: "A zero-knowledge fantasy cricket platform",
};

import {
  DynamicContextProvider,
  EthereumWalletConnectors,
} from "../lib/dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <DynamicContextProvider
        settings={{
          environmentId: "2762a57b-faa4-41ce-9f16-abff9300e2c9",
          walletConnectors: [EthereumWalletConnectors],
        }}
      >
        <body>
          <Nav />
          <div className={jksans.className}>{children}</div>
          <Footer />
        </body>
      </DynamicContextProvider>
    </html>
  );
}
