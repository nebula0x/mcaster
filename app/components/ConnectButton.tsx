"use client";

import { useEffect, useState } from "react";
import { init, getSigner, isWarpcast } from "@farcaster/miniapp-sdk";
import { ConnectWallet } from "@coinbase/onchainkit/wallet";

export default function ConnectButton() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);
  const [insideWarpcast, setInsideWarpcast] = useState(false);

  // ✅ Prevent hydration mismatch (Next.js SSR fix)
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    async function setupMiniApp() {
      try {
        // 1️⃣ Initialize Farcaster SDK
        await init();

        // 2️⃣ Detect if inside Warpcast
        const isInside = await isWarpcast();
        setInsideWarpcast(isInside);
        console.log("🟣 Inside Warpcast:", isInside);

        // 3️⃣ If inside Warpcast, get signer and FID
        if (isInside) {
          const signer = await getSigner();
          if (signer?.address) {
            console.log("✅ Connected with Farcaster:", signer);
            setConnectedAddress(signer.address);

            // 4️⃣ OPTIONAL — send signer data to backend
            try {
              const response = await fetch("/api/farcaster", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  address: signer.address,
                  fid: signer.fid,
                }),
              });

              const result = await response.json();
              console.log("Backend response:", result);
            } catch (postErr) {
              console.error("⚠️ Failed to send signer to backend:", postErr);
            }
          } else {
            console.warn("⚠️ No signer address returned from Farcaster SDK.");
          }
        } else {
          console.log("🌐 Running outside Warpcast — fallback to ConnectWallet.");
        }
      } catch (err) {
        console.error("❌ MiniApp SDK init failed:", err);
      } finally {
        setLoading(false);
      }
    }

    setupMiniApp();
  }, [mounted]);

  // 🧩 SSR Safety: prevent hydration mismatch
  if (!mounted) return null;

  // ⏳ Loading state
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

  // ✅ Inside Warpcast and connected
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

  // 🌐 Fallback for browser environments
  return <ConnectWallet />;
}
