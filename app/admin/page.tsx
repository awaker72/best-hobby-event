"use client";

import { FormEvent, useEffect, useState } from "react";
import Header from "@/components/Header";
import { brands } from "@/data/brands";
import { EventItem, EventType } from "@/data/events";
import { createEvent, fetchAllEvents } from "@/lib/events";
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

const ADMIN_SESSION_KEY = "best-hobby-event:admin-auth";
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "";

export default function AdminPage() {
  const [form, setForm] = useState<EventForm>(defaultForm);
  const [allEvents, setAllEvents] = useState<EventItem[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const loadEvents = async () => {
    try {
      const items = await fetchAllEvents();
      setAllEvents(items);
    } catch {
      setMessage("이벤트 목록을 불러오지 못했어요.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const stored = window.localStorage.getItem(ADMIN_SESSION_KEY);
    if (stored === "ok") {
      setIsAuthorized(true);
      loadEvents();
    } else {
      setLoading(false);
    }
    setAuthChecked(true);
  }, []);

  const handleChange = <K extends keyof EventForm>(key: K, value: EventForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();

    if (!ADMIN_PASSWORD) {
      setAuthError("관리자 비밀번호가 아직 설정되지 않았어요.");
      return;
    }

    if (passwordInput === ADMIN_PASSWORD) {
      window.localStorage.setItem(ADMIN_SESSION_KEY, "ok");
      setIsAuthorized(true);
      setAuthError("");
      setLoading(true);
      loadEvents();
      return;
    }

    setAuthError("비밀번호가 맞지 않아요.");
  };

  const handleLogout = () => {
    window.localStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAuthorized(false);
    setPasswordInput("");
    setAuthError("");
    setMessage("");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!form.title || !form.startDate || !form.endDate || !form.summary || !form.description) {
      setMessage("필수 항목을 먼저 채워주세요.");
      return;
    }

    try {
      await createEvent({
        title: form.title,
        brand: form.brand,
        type: form.type,
        start_date: form.startDate,
        end_date: form.endDate,
        summary: form.summary,
        description: form.description,
        how_to_join: form.howToJoin,
        source_url: form.sourceUrl,
        is_published: true,
      });

      setForm(defaultForm);
      setMessage("이벤트를 저장했어요. 이벤트 허브에 곧 반영돼요.");
      setLoading(true);
      await loadEvents();
    } catch {
      setMessage("이벤트 저장에 실패했어요.");
    }
  };

  if (!authChecked) {
    return <main className="mx-auto min-h-screen w-full max-w-md px-5 py-8" />;
  }

  if (!isAuthorized) {
    return (
      <main className="mx-auto min-h-screen w-full max-w-md px-5 py-8">
        <Header
          title="관리자 로그인"
          subtitle="관리자 페이지는 비밀번호를 입력한 뒤 접근할 수 있어요."
          backHref="/events"
        />

        <form
          onSubmit={handleLogin}
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <label className="block">
            <div className="mb-2 text-xs font-medium text-slate-500">관리자 비밀번호</div>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
              placeholder="비밀번호를 입력하세요"
            />
          </label>

          {authError && <p className="mt-3 text-sm text-rose-600">{authError}</p>}

          <button
            type="submit"
            className="mt-5 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white"
          >
            관리자 페이지 들어가기
          </button>

          <p className="mt-4 text-xs leading-5 text-slate-500">
            이 버전은 빠른 보호를 위한 간단한 비밀번호 게이트예요. 이후에는 정식 로그인으로 올리는 게 좋습니다.
          </p>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-md px-5 py-8">
      <Header
        title="관리자 페이지"
        subtitle="새 이벤트를 직접 입력해서 Supabase에 저장할 수 있어요."
        backHref="/events"
      />

      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm"
        >
          로그아웃
        </button>
      </div>

      <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">저장 현황</h2>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              이제 이벤트는 브라우저가 아니라 Supabase 데이터베이스에 저장돼요.
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
            {allEvents.length}개
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
        <h2 className="text-sm font-semibold text-slate-900">저장된 이벤트</h2>
        <div className="mt-4 space-y-3">
          {loading ? (
            <p className="text-sm text-slate-500">이벤트를 불러오는 중이에요.</p>
          ) : allEvents.length > 0 ? (
            allEvents.map((event) => {
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
            <p className="text-sm text-slate-500">아직 저장된 이벤트가 없어요.</p>
          )}
        </div>
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
