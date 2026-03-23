"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import EmptyState from "@/components/EmptyState";
import EventCard from "@/components/EventCard";
import Header from "@/components/Header";
import { brands } from "@/data/brands";
import { events } from "@/data/events";
import { filterEventsByBrands, sortEventsByPriority } from "@/lib/filters";
import { getFavoriteBrands } from "@/lib/storage";

export default function EventsPage() {
  const router = useRouter();
  const [favoriteBrands, setFavoriteBrands] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const favorites = getFavoriteBrands();
    if (favorites.length === 0) {
      router.replace("/onboarding");
      return;
    }
    setFavoriteBrands(favorites);
    setReady(true);
  }, [router]);

  const filteredEvents = useMemo(() => {
    return sortEventsByPriority(filterEventsByBrands(events, favoriteBrands));
  }, [favoriteBrands]);

  const favoriteNames = brands
    .filter((brand) => favoriteBrands.includes(brand.id))
    .map((brand) => brand.name)
    .join(", ");

  if (!ready) {
    return <main className="min-h-screen bg-slate-50" />;
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-md px-5 py-8">
      <Header
        title="내 이벤트"
        subtitle={favoriteNames ? `${favoriteNames} 관련 이벤트를 모아봤어요.` : undefined}
        rightHref="/settings"
        rightLabel="설정"
      />

      <section className="space-y-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <EmptyState message="선택한 브랜드의 이벤트가 아직 없어요." />
        )}
      </section>
    </main>
  );
}
