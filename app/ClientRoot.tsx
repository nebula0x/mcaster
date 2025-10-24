"use client";

import { useEffect, useState } from "react";
import RootProvider from "./rootProvider";

export default function ClientRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return <RootProvider>{children}</RootProvider>;
}
