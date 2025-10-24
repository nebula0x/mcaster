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
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (typeof window === "undefined") return;

    async function setupMiniApp() {
      try {
        const miniApp = new MiniAppClient();
        await miniApp.init();

        const env = miniApp.getEnvironment();
        const isInside = env.isWarpcast;
        setInsideWarpcast(isInside);

        if (isInside) {
          const signer = await miniApp.getSigner();
          if (signer?.address) {
            console.log("🟣 Connected with Farcaster:", signer.address);
            setConnectedAddress(signer.address);

            // Optional: send signer data to backend
            await fetch("/api/farcaster", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                address: signer.address,
                fid: signer.fid,
              }),
            });
          }
        }
      } catch (err) {
        console.warn("⚠️ MiniApp SDK init failed:", err);
      } finally {
        setLoading(false);
      }
    }

    setupMiniApp();
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

  return <ConnectWallet />;
}
