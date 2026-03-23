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
    <header className="mb-6 flex items-start justify-between gap-4">
      <div>
        {backHref && (
          <Link href={backHref} className="mb-3 inline-flex text-sm text-slate-500">
            ← 뒤로
          </Link>
        )}
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h1>
        {subtitle && <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>}
      </div>
      {rightHref && rightLabel && (
        <Link href={rightHref} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">
          {rightLabel}
        </Link>
      )}
    </header>
  );
}
