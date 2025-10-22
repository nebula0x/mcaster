"use client";

export default function MintSuccess({
  txHash,
  castUrl,
  onReset,
}: {
  txHash: string;
  castUrl: string;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col items-center space-y-4 p-6 text-center">
      <h2 className="text-2xl font-bold text-green-400">✅ Mint Successful!</h2>
      <p className="text-gray-300">Your cast has been immortalized on-chain 🎉</p>

      <div className="flex space-x-4">
        <a
          href={`https://basescan.org/tx/${txHash}`}
          target="_blank"
          className="text-blue-400 underline"
        >
          View Transaction
        </a>
        <a
          href={castUrl}
          target="_blank"
          className="text-purple-400 underline"
        >
          View on Warpcast
        </a>
      </div>

      <button
        onClick={onReset}
        className="bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded-lg font-semibold"
      >
        Mint Another Cast
      </button>
    </div>
  );
}
