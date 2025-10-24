"use client";

import { OnchainKitProvider } from "@coinbase/onchainkit";
import { minikitConfig } from "../minikit.config";
import { base } from "wagmi/chains";

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

  const appName = minikitConfig?.miniapp?.name || "Cubey MiniApp";
  const appDescription =
    minikitConfig?.miniapp?.description || "Your AI Ad Companion";
  const appUrl = minikitConfig?.miniapp?.homeUrl || "http://localhost:3000";
  const appIcon =
    minikitConfig?.miniapp?.iconUrl || "http://localhost:3000/blue-icon.png";

  console.log("✅ OnchainKitProvider initialized:", { apiKey, appName, appUrl });

  return (
    <OnchainKitProvider
      apiKey={apiKey}
      chain={base}
      config={{
        app: { name: appName, description: appDescription, url: appUrl, icon: appIcon },
      }}
    >
      {children}
    </OnchainKitProvider>
  );
}
