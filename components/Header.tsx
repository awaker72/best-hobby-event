import Link from "next/link";

type HeaderProps = {
  title: string;
  subtitle?: string;
  backHref?: string;
  rightHref?: string;
  rightLabel?: string;
};

export default function Header({ title, subtitle, backHref, rightHref, rightLabel }: HeaderProps) {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0 flex-1">
        {backHref && (
          <Link href={backHref} className="mb-3 inline-flex text-sm text-slate-500">
            ← 뒤로
          </Link>
        )}
        <h1 className="text-2xl font-semibold leading-8 tracking-tight text-slate-900">{title}</h1>
        {subtitle && <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>}
      </div>
      {rightHref && rightLabel && (
        <Link
          href={rightHref}
          className="inline-flex self-start rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm"
        >
          {rightLabel}
        </Link>
      )}
    </header>
  );
}
