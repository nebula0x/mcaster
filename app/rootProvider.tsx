"use client";

import { OnchainKitProvider } from "@coinbase/onchainkit";
import { base } from "wagmi/chains";
import { minikitConfig } from "../minikit.config";

export default function RootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const apiKey = process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY;

  if (!apiKey) {
    console.error("❌ Missing NEXT_PUBLIC_ONCHAINKIT_API_KEY in .env.local");
    return <>{children}</>;
  }

  console.log("✅ OnchainKitProvider initialized:", { apiKey });

  return (
    <OnchainKitProvider apiKey={apiKey} chain={base}>
      {children}
    </OnchainKitProvider>
  );
}
