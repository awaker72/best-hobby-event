type EventBadgeProps = {
  label: string;
  status: string;
};

export default function EventBadge({ label, status }: EventBadgeProps) {
  const classes =
    status === "today"
      ? "bg-rose-100 text-rose-700"
      : status === "ending-soon"
        ? "bg-amber-100 text-amber-700"
        : status === "ongoing"
          ? "bg-emerald-100 text-emerald-700"
          : "bg-slate-100 text-slate-600";

  return <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${classes}`}>{label}</span>;
}
