"use client";

import { useState } from "react";
import styles from "./CastInput.module.css";

interface CastInputProps {
  onPreview: (data: Record<string, unknown>) => void;
}

export default function CastInput({ onPreview }: CastInputProps) {
  const [castUrl, setCastUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePreview = async () => {
    if (!castUrl.trim()) {
      setError("Please paste a Farcaster cast URL or cast ID.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `/api/farcaster?url=${encodeURIComponent(castUrl.trim())}`
      );
      const data = await res.json();
      console.log("Fetched data:", data);

      // Handle both backend response shapes: { cast: {...} } or direct {...}
      const cast = (data as any).cast || data;

      if (cast && cast.text) {
        onPreview(cast);
      } else {
        setError("No cast found. Double-check the URL or ID.");
      }
    } catch (err) {
      console.error("Error fetching cast:", err);
      setError("Failed to fetch cast. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Cast Mint</h2>
      <p className={styles.subtitle}>
        Paste a Farcaster cast URL or ID below to preview and mint it on-chain.
      </p>

      <input
        type="text"
        placeholder="https://warpcast.com/~/casts/0xabc…"
        value={castUrl}
        onChange={(e) => setCastUrl(e.target.value)}
        className={styles.input}
      />

      <button
        onClick={handlePreview}
        disabled={loading}
        className={styles.button}
      >
        {loading ? "Loading…" : "Preview Cast"}
      </button>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
