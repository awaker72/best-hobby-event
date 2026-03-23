"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import { brands } from "@/data/brands";
import { events as baseEvents } from "@/data/events";
import { getMergedEvents } from "@/lib/storage";
import { formatDate } from "@/lib/utils";

export default function EventDetailPage() {
  const params = useParams<{ id: string }>();
  const allEvents = getMergedEvents(baseEvents);
  const event = allEvents.find((item) => item.id === params.id);

  if (!event) {
    return (
      <main className="mx-auto min-h-screen w-full max-w-md px-5 py-8">
        <Header title="이벤트를 찾을 수 없어요" backHref="/events" />
      </main>
    );
  }

  const brand = brands.find((item) => item.id === event.brand);

  return (
    <main className="mx-auto min-h-screen w-full max-w-md px-5 py-8">
      <Header title={event.title} subtitle={brand?.name} backHref="/events" />

      <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <div className="text-xs font-medium text-slate-500">유형</div>
          <div className="mt-1 text-sm text-slate-800 capitalize">{event.type}</div>
        </div>

        <div>
          <div className="text-xs font-medium text-slate-500">일정</div>
          <div className="mt-1 text-sm text-slate-800">
            {formatDate(event.startDate)} ~ {formatDate(event.endDate)}
          </div>
        </div>

        <div>
          <div className="text-xs font-medium text-slate-500">한 줄 요약</div>
          <p className="mt-1 text-sm leading-6 text-slate-800">{event.summary}</p>
        </div>

        <div>
          <div className="text-xs font-medium text-slate-500">상세 설명</div>
          <p className="mt-1 text-sm leading-6 text-slate-800">{event.description}</p>
        </div>

        <div>
          <div className="text-xs font-medium text-slate-500">참여 방법</div>
          <p className="mt-1 text-sm leading-6 text-slate-800">{event.howToJoin}</p>
        </div>

        <Link
          href={event.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm"
        >
          <span className="text-white">원문 보기</span>
        </Link>
      </section>
    </main>
  );
}
