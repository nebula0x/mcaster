"use client";
import { useState } from "react";

interface MintButtonProps {
  cast: Record<string, unknown>;
  onMinting: () => void;
  onSuccess: (txHash: string) => void;
}

export default function MintButton({ cast, onMinting, onSuccess }: MintButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleMint = async () => {
    setLoading(true);
    onMinting();
    // simulate mint delay for UI testing
    setTimeout(() => {
      setLoading(false);
      onSuccess("0xFakeTxHash123456789");
    }, 2000);
  };

  return (
    <button
      onClick={handleMint}
      disabled={loading}
      className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2 rounded-lg font-semibold transition w-full"
    >
      {loading ? "Minting..." : "🪙 Mint as NFT"}
    </button>
  );
}
