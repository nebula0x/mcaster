"use client";

import { useEffect, useState } from "react";
import { MiniAppClient } from "@farcaster/miniapp-sdk";
import { ConnectWallet } from "@coinbase/onchainkit/wallet";

export default function ConnectButton() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);
  const [insideWarpcast, setInsideWarpcast] = useState(false);

  useEffect(() => {
    // avoid SSR mismatch
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    const setupMiniApp = async () => {
      try {
        const miniApp = new MiniAppClient();
        await miniApp.init();

        const env = miniApp.getEnvironment();
        const isInside = env?.isWarpcast ?? false;
        setInsideWarpcast(isInside);

        if (isInside) {
          const signer = await miniApp.getSigner().catch(() => null);

          if (signer?.address) {
            console.log("🟣 Connected with Farcaster:", signer.address);
            setConnectedAddress(signer.address);

            // Optional: send signer info to your backend
            await fetch("/api/farcaster", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                address: signer.address,
                fid: signer.fid,
              }),
            });
          } else {
            console.warn("⚠️ No signer available inside Warpcast.");
          }
        }
      } catch (err) {
        console.warn("⚠️ MiniApp SDK init failed:", err);
      } finally {
        setLoading(false);
      }
    };

    setupMiniApp();
  }, [mounted]);

  // SSR safety
  if (!mounted) return null;

  // Loading UI
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

  // Connected inside Warpcast
  if (insideWarpcast && connectedAddress) {
    return (
      <button
        disabled
        className="bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-xl shadow"
      >
        Connected with Farcaster ({connectedAddress.slice(0, 6)}…{connectedAddress.slice(-4)})
      </button>
    );
  }

  // Fallback: show Coinbase connect button in browser
  return <ConnectWallet />;
}
