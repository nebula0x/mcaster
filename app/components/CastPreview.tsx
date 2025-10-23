"use client";
import Image from "next/image";

export default function CastPreview({ cast }: { cast: any }) {
  const imageUrl = cast.embeds?.[0]?.url || "";

  return (
    <div className="p-4 border border-gray-700 rounded-lg bg-gray-900 text-left space-y-2">
      <p className="text-gray-400 text-sm">@{cast.author?.username}</p>
      <p className="text-lg whitespace-pre-line">{cast.text}</p>

      {imageUrl && (
        <div className="mt-2 rounded-lg overflow-hidden border border-gray-800 relative w-full h-64">
          <Image
            src={imageUrl}
            alt="cast media"
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 600px"
            priority
          />
        </div>
      )}
    </div>
  );
}
