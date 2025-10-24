// ❌ NO "use client" here!

import "./globals.css";
import type { Metadata } from "next";
import { minikitConfig } from "../minikit.config";
import ClientRoot from "./ClientRoot";

export const metadata: Metadata = {
  title: minikitConfig.miniapp.name,
  description: minikitConfig.miniapp.description,
  openGraph: {
    title: minikitConfig.miniapp.name,
    description: minikitConfig.miniapp.description,
    images: [...minikitConfig.miniapp.screenshotUrls],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
