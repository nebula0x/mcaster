"use client";

import { useEffect, useState } from "react";
import { quickAuth } from "@farcaster/miniapp-sdk";
import { ConnectWallet } from "@coinbase/onchainkit/wallet";

export default function ConnectButton() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [connectedInfo, setConnectedInfo] = useState<string | null>(null);
  const [insideWarpcast, setInsideWarpcast] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    const setupFarcaster = async () => {
      try {
        const tokenResult = await quickAuth.getToken();
        console.log("🟣 quickAuth.getToken() result:", tokenResult);

        // ✅ Fix TypeScript — cast to object
        const tokenData = tokenResult as Record<string, any>;
        const token =
          tokenData?.token ||
          tokenData?.access_token ||
          JSON.stringify(tokenData).slice(0, 20) + "...";

        console.log("✅ Connected with Farcaster token:", token);
        setConnectedInfo(token);
        setInsideWarpcast(true);

        // Optional backend send
        await fetch("/api/farcaster", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: tokenData }),
        });
      } catch (err) {
        console.warn("⚠️ quickAuth.getToken() failed:", err);
      } finally {
        setLoading(false);
      }
    };

    setupFarcaster();
  }, [mounted]);

  if (!mounted) return null;

  if (loading) {
    return (
      <button
        disabled
        className="bg-gray-500 text-white px-5 py-2 rounded-xl shadow"
      >
        Loading...
      </button>
    );
  }

  if (insideWarpcast && connectedInfo) {
    return (
      <button
        disabled
        className="bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-xl shadow"
      >
        Connected to Farcaster ({connectedInfo})
      </button>
    );
  }

  return <ConnectWallet />;
}
