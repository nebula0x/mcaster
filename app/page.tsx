"use client";
import { useState, useEffect } from "react";
import { useQuickAuth, useMiniKit } from "@coinbase/onchainkit/minikit";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

// Import our new components
import CastInput from "./components/CastInput";
import CastPreview from "./components/CastPreview";
import MintButton from "./components/MintButton";
import MintSuccess from "./components/MintSuccess";

interface AuthResponse {
  success: boolean;
  user?: {
    fid: number;
    issuedAt?: number;
    expiresAt?: number;
  };
  message?: string;
}

export default function Home() {
  const { isFrameReady, setFrameReady, context } = useMiniKit();
  const router = useRouter();

  // Authentication
  const { data: authData, isLoading: isAuthLoading, error: authError } =
    useQuickAuth<AuthResponse>("/api/auth", { method: "GET" });

  const [step, setStep] = useState<"input" | "preview" | "minting" | "success">("input");
  const [castData, setCastData] = useState<any>(null);
  const [txHash, setTxHash] = useState("");

  useEffect(() => {
    if (!isFrameReady) setFrameReady();
  }, [isFrameReady, setFrameReady]);

  // Verify authentication
  // TEMP: bypass auth for UI testing
const isAuthenticated = true;


  // Render logic
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        {!isAuthenticated ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <h1 className="text-3xl font-bold">🔐 Authenticate Required</h1>
            <p className="text-gray-400">
              Please authenticate via Coinbase MiniKit to mint your cast.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-6">
            {step === "input" && (
              <CastInput
                onPreview={(data: any) => {
                  setCastData(data);
                  setStep("preview");
                }}
              />
            )}

            {step === "preview" && castData && (
              <div className="space-y-6 w-full max-w-md">
                <CastPreview cast={castData} />
                <MintButton
                  cast={castData}
                  onMinting={() => setStep("minting")}
                  onSuccess={(tx: string) => {
                    setTxHash(tx);
                    setStep("success");
                  }}
                />
              </div>
            )}

            {step === "minting" && (
              <p className="text-xl text-gray-400 animate-pulse">⏳ Minting in progress...</p>
            )}

            {step === "success" && (
              <MintSuccess
                txHash={txHash}
                castUrl={castData?.url}
                onReset={() => setStep("input")}
              />
            )}
          </div>
        )}
      </div>
    </main>
  );
}
