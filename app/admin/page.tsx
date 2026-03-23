"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import { brands } from "@/data/brands";
import { EventItem, EventType, events as baseEvents } from "@/data/events";
import { getCustomEvents, getMergedEvents, saveCustomEvent } from "@/lib/storage";
import { formatDate } from "@/lib/utils";

type EventForm = {
  title: string;
  brand: string;
  type: EventType;
  startDate: string;
  endDate: string;
  summary: string;
  description: string;
  howToJoin: string;
  sourceUrl: string;
};

const defaultForm: EventForm = {
  title: "",
  brand: brands[0]?.id ?? "goodsmile",
  type: "announcement",
  startDate: "",
  endDate: "",
  summary: "",
  description: "",
  howToJoin: "",
  sourceUrl: "https://",
};

const eventTypes: { value: EventType; label: string }[] = [
  { value: "announcement", label: "공지" },
  { value: "reservation", label: "예약" },
  { value: "deadline", label: "마감" },
  { value: "offline", label: "오프라인" },
  { value: "live", label: "라이브" },
  { value: "sns", label: "SNS" },
];

export default function AdminPage() {
  const [form, setForm] = useState<EventForm>(defaultForm);
  const [savedCount, setSavedCount] = useState(0);
  const [allEvents, setAllEvents] = useState<EventItem[]>(baseEvents);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setSavedCount(getCustomEvents().length);
    setAllEvents(getMergedEvents(baseEvents));
  }, []);

  const customEvents = useMemo(() => getCustomEvents(), [savedCount]);

  const handleChange = <K extends keyof EventForm>(key: K, value: EventForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!form.title || !form.startDate || !form.endDate || !form.summary || !form.description) {
      setMessage("필수 항목을 먼저 채워주세요.");
      return;
    }

    const newEvent: EventItem = {
      id: `custom-${Date.now()}`,
      brand: form.brand,
      title: form.title,
      type: form.type,
      startDate: form.startDate,
      endDate: form.endDate,
      summary: form.summary,
      description: form.description,
      howToJoin: form.howToJoin,
      sourceUrl: form.sourceUrl,
    };

    saveCustomEvent(newEvent);
    setSavedCount(getCustomEvents().length);
    setAllEvents(getMergedEvents(baseEvents));
    setForm(defaultForm);
    setMessage("이벤트를 저장했어요. 이벤트 허브에서 바로 확인할 수 있어요.");
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-md px-5 py-8">
      <Header
        title="관리자 페이지"
        subtitle="새 이벤트를 직접 입력해서 이벤트 허브에 반영할 수 있어요."
        backHref="/events"
      />

      <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">저장 현황</h2>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              직접 추가한 이벤트는 현재 이 브라우저의 localStorage에 저장돼요.
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
            {savedCount}개 저장
          </span>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <Field label="이벤트 제목">
          <input
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
            placeholder="예: 굿스마일 4월 예약 오픈"
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="브랜드">
            <select
              value={form.brand}
              onChange={(e) => handleChange("brand", e.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
            >
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="유형">
            <select
              value={form.type}
              onChange={(e) => handleChange("type", e.target.value as EventType)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
            >
              {eventTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="시작일">
            <input
              type="date"
              value={form.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
            />
          </Field>

          <Field label="종료일">
            <input
              type="date"
              value={form.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
            />
          </Field>
        </div>

        <Field label="한 줄 요약">
          <input
            value={form.summary}
            onChange={(e) => handleChange("summary", e.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
            placeholder="짧고 분명하게 적어요"
          />
        </Field>

        <Field label="상세 설명">
          <textarea
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="min-h-28 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
            placeholder="이벤트 내용을 자세히 적어요"
          />
        </Field>

        <Field label="참여 방법">
          <textarea
            value={form.howToJoin}
            onChange={(e) => handleChange("howToJoin", e.target.value)}
            className="min-h-24 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
            placeholder="참여 절차를 적어요"
          />
        </Field>

        <Field label="원문 링크">
          <input
            value={form.sourceUrl}
            onChange={(e) => handleChange("sourceUrl", e.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
            placeholder="https://..."
          />
        </Field>

        {message && <p className="text-sm text-slate-600">{message}</p>}

        <button
          type="submit"
          className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white"
        >
          이벤트 저장하기
        </button>
      </form>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">직접 추가한 이벤트</h2>
        <div className="mt-4 space-y-3">
          {customEvents.length > 0 ? (
            customEvents.map((event) => {
              const brand = brands.find((item) => item.id === event.brand);
              return (
                <div key={event.id} className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-xs font-medium text-slate-500">{brand?.name}</div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">{event.title}</div>
                  <div className="mt-2 text-xs text-slate-500">
                    {formatDate(event.startDate)} ~ {formatDate(event.endDate)}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-slate-500">아직 직접 추가한 이벤트가 없어요.</p>
          )}
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-4 text-xs leading-5 text-slate-500">
        지금 버전의 관리자 기능은 브라우저 저장 기반이에요. 즉, 같은 브라우저에서는 바로 관리할 수 있지만,
        다른 기기와 완전 동기화되는 정식 운영용 저장소는 다음 단계에서 붙이면 돼요.
      </section>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-2 text-xs font-medium text-slate-500">{label}</div>
      {children}
    </label>
  );
}
