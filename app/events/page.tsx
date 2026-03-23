"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import EmptyState from "@/components/EmptyState";
import EventCard from "@/components/EventCard";
import Header from "@/components/Header";
import { brands } from "@/data/brands";
import { EventItem } from "@/data/events";
import { filterEventsByBrands, sortEventsByPriority } from "@/lib/filters";
import { fetchPublishedEvents } from "@/lib/events";
import { getFavoriteBrands, setFavoriteBrands } from "@/lib/storage";

const ALL_FILTER = "all";

export default function EventsPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>(ALL_FILTER);
  const [favoriteBrands, setFavoriteBrandsState] = useState<string[]>([]);
  const [allEvents, setAllEvents] = useState<EventItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const favorites = getFavoriteBrands();
    setFavoriteBrandsState(favorites);

    fetchPublishedEvents()
      .then((items) => {
        setAllEvents(items);
        setErrorMessage("");
      })
      .catch(() => {
        setErrorMessage("이벤트를 불러오지 못했어요.");
      })
      .finally(() => {
        setHydrated(true);
      });
  }, []);

  const filteredEvents = useMemo(() => {
    const base =
      selectedFilter === ALL_FILTER
        ? allEvents
        : filterEventsByBrands(allEvents, [selectedFilter]);

    return sortEventsByPriority(base);
  }, [allEvents, selectedFilter]);

  const toggleFavoriteBrand = (brandId: string) => {
    const next = favoriteBrands.includes(brandId)
      ? favoriteBrands.filter((item) => item !== brandId)
      : [...favoriteBrands, brandId];

    setFavoriteBrandsState(next);
    setFavoriteBrands(next);
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-md px-5 py-8">
      <Header
        title="Best Hobby Event"
        subtitle="베스트하비의 이벤트, 예약, 마감 정보를 한곳에서 확인해보세요."
        rightHref="/settings"
        rightLabel="관심 브랜드"
      />

      <div className="mb-4 flex gap-2">
        <Link
          href="/admin"
          className="inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          관리자 페이지
        </Link>
      </div>

      <section className="mb-4 flex gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setSelectedFilter(ALL_FILTER)}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${
            selectedFilter === ALL_FILTER
              ? "bg-slate-900 text-white"
              : "bg-white text-slate-700 ring-1 ring-slate-200"
          }`}
        >
          전체
        </button>
        {brands.map((brand) => (
          <button
            key={brand.id}
            type="button"
            onClick={() => setSelectedFilter(brand.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${
              selectedFilter === brand.id
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-700 ring-1 ring-slate-200"
            }`}
          >
            {brand.name}
          </button>
        ))}
      </section>

      <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">관심 브랜드</h2>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              자주 보는 브랜드를 저장해두면 나중에 더 쉽게 확인할 수 있어요.
            </p>
          </div>
          {hydrated && favoriteBrands.length > 0 && (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
              {favoriteBrands.length}개 선택
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {brands.map((brand) => {
            const active = favoriteBrands.includes(brand.id);
            return (
              <button
                key={brand.id}
                type="button"
                onClick={() => toggleFavoriteBrand(brand.id)}
                className={`rounded-full px-3 py-2 text-xs font-medium ${
                  active
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {brand.name}
              </button>
            );
          })}
        </div>
      </section>

      {errorMessage && <p className="mb-4 text-sm text-rose-600">{errorMessage}</p>}

      <section className="space-y-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => <EventCard key={event.id} event={event} />)
        ) : hydrated ? (
          <EmptyState message="표시할 이벤트가 아직 없어요." />
        ) : (
          <EmptyState message="이벤트를 불러오는 중이에요." />
        )}
      </section>
    </main>
  );
}
