"use client";
import { useState } from "react";

export default function MintButton({
  cast,
  onMinting,
  onSuccess,
}: {
  cast: any;
  onMinting: () => void;
  onSuccess: (txHash: string) => void;
}) {
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
