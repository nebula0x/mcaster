"use client";
import { useState } from "react";

interface CastInputProps {
  onPreview: (data: Record<string, unknown>) => void;
}

export default function CastInput({ onPreview }: CastInputProps) {
  const [castUrl, setCastUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePreview = async () => {
    if (!castUrl) {
      setError("Please enter a Farcaster cast URL or ID");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`/api/farcaster?url=${encodeURIComponent(castUrl)}`);
      const data = await res.json();
      if (data && (data as Record<string, unknown>).text) {
        onPreview(data);
      } else {
        setError("No cast found. Please check the URL.");
      }
    } catch {
      setError("Failed to fetch cast. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-md">
      <h1 className="text-3xl font-bold">🎨 Cast Mint</h1>
      <input
        type="text"
        placeholder="Input your cast URL or ID"
        value={castUrl}
        onChange={(e) => setCastUrl(e.target.value)}
        className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        onClick={handlePreview}
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-500 transition px-6 py-2 rounded-lg font-semibold"
      >
        {loading ? "Loading..." : "🔍 Preview Cast"}
      </button>
    </div>
  );
}
