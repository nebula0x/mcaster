export const minikitConfig = {
  accountAssociation: {
    header:
      "eyJmaWQiOjUyOTcwMCwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDA5OWRBYkM4YzJiOEUzY2RhM2RDRjMyNjgyNmJjYTRFMzFlNDYxYTIifQ",
    payload: "eyJkb21haW4iOiJtY2FzdGVyLXQ0OHYudmVyY2VsLmFwcCJ9",
    signature:
      "+hIMJnImaiLjYNmfOcGKlsyOkRF9RLJgiNosKo8w551F/gvZU3oTsq3Bi5aHX5cyMCzXB/tJs17YNxXzf6hNphw=",
  },

  // ✅ OnchainKit Config
  onchainKit: {
    apiKey: process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || "",
    config: {
      app: {
        name: "Cubey",
        description: "Your AI Ad Companion",
        url: "http://localhost:3000",
        icon: "http://localhost:3000/blue-icon.png",
      },
    },
  },

  // ✅ MiniApp Metadata
  miniapp: {
    version: "1",
    name: "Cubey",
    subtitle: "Your AI Ad Companion",
    description: "Ads",
    screenshotUrls: ["http://localhost:3000/screenshot-portrait.png"],
    iconUrl: "http://localhost:3000/blue-icon.png",
    splashImageUrl: "http://localhost:3000/blue-hero.png",
    splashBackgroundColor: "#000000",
    homeUrl: "http://localhost:3000",
    webhookUrl: "http://localhost:3000/api/webhook",
    primaryCategory: "social",
    tags: ["marketing", "ads", "quickstart", "waitlist"],
  },
} as const;
