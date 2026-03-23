import Link from "next/link";
import { brands } from "@/data/brands";
import { EventItem } from "@/data/events";
import EventBadge from "@/components/EventBadge";
import { formatDate, getEventStatus, getStatusLabel } from "@/lib/utils";

export default function EventCard({ event }: { event: EventItem }) {
  const brand = brands.find((item) => item.id === event.brand);
  const status = getEventStatus(event.startDate, event.endDate);
  const label = getStatusLabel(status);

  return (
    <Link
      href={`/events/${event.id}`}
      className="block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="text-xs font-medium text-slate-500">{brand?.name}</div>
          <h3 className="mt-1 text-[15px] font-semibold leading-6 text-slate-900">{event.title}</h3>
        </div>
        {status !== "ended" && (
          <div className="shrink-0 self-start">
            <EventBadge label={label} status={status} />
          </div>
        )}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
        <span>{formatDate(event.startDate)}</span>
        <span>·</span>
        <span className="capitalize">{event.type}</span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{event.summary}</p>
    </Link>
  );
}
