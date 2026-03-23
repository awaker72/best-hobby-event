"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getFavoriteBrands } from "@/lib/storage";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const favorites = getFavoriteBrands();
    if (favorites.length > 0) {
      router.replace("/events");
    } else {
      router.replace("/onboarding");
    }
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="text-center text-slate-600">Best Hobby Event 로딩 중…</div>
    </main>
  );
}
