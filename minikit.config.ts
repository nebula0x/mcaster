const ROOT_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/**
 * MiniApp configuration object. Must follow the Farcaster MiniApp specification.
 *
 * @see {@link https://miniapps.farcaster.xyz/docs/guides/publishing}
 */
export const minikitConfig = {
  "accountAssociation": {
    "header": "eyJmaWQiOjUyOTcwMCwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDA5OWRBYkM4YzJiOEUzY2RhM2RDRjMyNjgyNmJjYTRFMzFlNDYxYTIifQ",
    "payload": "eyJkb21haW4iOiJtY2FzdGVyLXQ0OHYudmVyY2VsLmFwcCJ9",
    "signature": "+hIMJnImaiLjYNmfOcGKlsyOkRF9RLJgiNosKo8w551F/gvZU3oTsq3Bi5aHX5cyMCzXB/tJs17YNxXzf6hNphw="
  },
  miniapp: {
    version: "1",
    name: "Cubey",
    subtitle: "Your AI Ad Companion",
    description: "Ads",
    screenshotUrls: [`${ROOT_URL}/screenshot-portrait.png`],
    iconUrl: `${ROOT_URL}/blue-icon.png`,
    splashImageUrl: `${ROOT_URL}/blue-hero.png`,
    splashBackgroundColor: "#000000",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "social",
    tags: ["marketing", "ads", "quickstart", "waitlist"],
    heroImageUrl: `${ROOT_URL}/blue-hero.png`,
    tagline: "",
    ogTitle: "",
    ogDescription: "",
    ogImageUrl: `${ROOT_URL}/blue-hero.png`,
  },
} as const;
