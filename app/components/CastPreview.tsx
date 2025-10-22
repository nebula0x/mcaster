"use client";

export default function CastPreview({ cast }: { cast: any }) {
  return (
    <div className="p-4 border border-gray-700 rounded-lg bg-gray-900 text-left space-y-2">
      <p className="text-gray-400 text-sm">@{cast.author?.username}</p>
      <p className="text-lg whitespace-pre-line">{cast.text}</p>
      {cast.embeds?.[0]?.url && (
        <img
          src={cast.embeds[0].url}
          alt="cast media"
          className="rounded-lg mt-2 border border-gray-800"
        />
      )}
    </div>
  );
}
