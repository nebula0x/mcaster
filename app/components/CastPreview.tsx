"use client";

import { useState } from "react";
import styles from "./CastPreview.module.css";
import MintSuccess from "./MintSuccess";
import { useComposeCast } from "@coinbase/onchainkit/minikit";
import { minikitConfig } from "../../minikit.config";

interface CastPreviewProps {
  cast: Record<string, any>;
  onBack: () => void;
}

export default function CastPreview({ cast, onBack }: CastPreviewProps) {
  const [minted, setMinted] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [minting, setMinting] = useState(false);

  // 👇 Access the Coinbase OnchainKit minting function
  const { composeCastAsync } = useComposeCast();

  const handleMint = async () => {
    try {
      setMinting(true);
      console.log("🪄 Starting mint for cast:", cast.text);

      // Check if user is authenticated via MiniKit
      if (!composeCastAsync) {
        alert("Please connect your Farcaster account using MiniKit before minting.");
        return;
      }

      // 🔹 Prepare mint content
      const text = `Minted: "${cast.text}" via ${minikitConfig.miniapp.name}`;
      const embedUrl = cast.embeds?.[0]?.url || "";

      // 🔹 Perform real onchain mint through Farcaster
      const result = await composeCastAsync({
        text,
        embeds: [embedUrl],
      });

      console.log("🧩 composeCastAsync result:", result);

      if (result?.cast?.hash) {
        // ✅ Mint successful
        setTxHash(result.cast.hash);
        setMinted(true);
      } else {
        console.error("❌ Mint failed — no cast hash in result", result);
        alert("Mint failed. Please try again.");
      }
    } catch (error) {
      console.error("❌ Mint error:", error);
      alert("Mint error — check console for details.");
    } finally {
      setMinting(false);
    }
  };

  const handleReset = () => {
    setMinted(false);
    onBack();
  };

  // ✅ Show MintSuccess after minting completes
  if (minted && txHash) {
    const castUrl = `https://warpcast.com/${cast.author.username}/${cast.hash}`;
    return (
      <MintSuccess txHash={txHash} castUrl={castUrl} onReset={handleReset} />
    );
  }

  // ✅ Otherwise show preview + mint button
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Cast Preview</h2>

      <div className={styles.card}>
        <p className={styles.text}>{cast.text}</p>
        {cast.author && (
          <p className={styles.author}>by @{cast.author.username}</p>
        )}
        {cast.embeds && cast.embeds.length > 0 && (
          <div className={styles.embeds}>
            {cast.embeds.map((embed: any, i: number) => (
              <div key={i} className={styles.embedItem}>
                {embed.url ? (
                  <a href={embed.url} target="_blank" rel="noreferrer">
                    {embed.url}
                  </a>
                ) : embed.image ? (
                  <img src={embed.image.url} alt="embed" />
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <button onClick={onBack} className={styles.backButton}>
          ← Back
        </button>
        <button
          onClick={handleMint}
          className={styles.mintButton}
          disabled={minting}
        >
          {minting ? "Minting…" : "Mint Cast"}
        </button>
      </div>
    </div>
  );
}
