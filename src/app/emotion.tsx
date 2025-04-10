// src/app/emotion.tsx
"use client";

import * as React from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const emotionCache = createCache({ key: "css", prepend: true });

export default function EmotionRegistry({
    children,
}: {
    children: React.ReactNode;
}) {
    return <CacheProvider value={emotionCache}>{children}</CacheProvider>;
}
