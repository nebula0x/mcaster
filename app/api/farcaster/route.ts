import { NextResponse } from "next/server";

/**
 * GET — Fetch Farcaster cast by URL using Neynar API
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  let castUrl = searchParams.get("url");

  if (!castUrl) {
    return NextResponse.json({ error: "Missing cast URL" }, { status: 400 });
  }

  // Normalize Warpcast URLs (e.g., https://warpcast.com/~/casts/0x1234)
  if (castUrl.includes("warpcast.com/~/casts/")) {
    castUrl = castUrl.replace("warpcast.com/~/casts/", "warpcast.com/");
  }

  try {
    const response = await fetch(
      `https://api.neynar.com/v2/farcaster/cast?type=url&identifier=${encodeURIComponent(
        castUrl
      )}`,
      {
        headers: {
          accept: "application/json",
          api_key: process.env.NEYNAR_API_KEY!,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Neynar API error:", errorText);
      return NextResponse.json(
        { error: "Failed to fetch cast", details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("✅ Cast data:", data);
    return NextResponse.json(data.cast);
  } catch (error) {
    console.error("⚠️ Fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch cast", details: String(error) },
      { status: 500 }
    );
  }
}

/**
 * POST — Receive signer data from the Farcaster MiniApp
 * Used when user connects inside Warpcast.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { address, fid } = body;

    if (!address) {
      return NextResponse.json({ error: "Missing wallet address" }, { status: 400 });
    }

    console.log("✅ Received signer data from MiniApp:", { address, fid });

    // Optionally verify FID using Neynar
    if (fid) {
      const userRes = await fetch(
        `https://api.neynar.com/v2/farcaster/user?id=${fid}`,
        {
          headers: {
            accept: "application/json",
            api_key: process.env.NEYNAR_API_KEY!,
          },
        }
      );

      if (userRes.ok) {
        const userData = await userRes.json();
        console.log("🟣 Verified Farcaster user:", userData.result.user);
        return NextResponse.json({
          success: true,
          address,
          fid,
          user: userData.result.user,
        });
      }
    }

    // If no Neynar verification
    return NextResponse.json({
      success: true,
      address,
      fid,
      message: "Signer received (no Neynar verification)",
    });
  } catch (error) {
    console.error("❌ Error in POST /api/farcaster:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}
