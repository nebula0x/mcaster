"use client";

import ConnectButton from "./components/ConnectButton";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 to-purple-700 text-white">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Cubey MiniApp</h1>
        <p className="text-lg opacity-90">
          Connect your Farcaster account to mint and share casts on-chain.
        </p>

        <div className="mt-6">
          <ConnectButton />
        </div>
      </div>
    </main>
  );
}
