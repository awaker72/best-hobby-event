type BrandCardProps = {
  name: string;
  description: string;
  selected: boolean;
  onClick: () => void;
};

export default function BrandCard({
  name,
  description,
  selected,
  onClick,
}: BrandCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl border p-4 text-left transition ${
        selected
          ? "border-slate-900 bg-slate-900 text-white shadow-sm"
          : "border-slate-200 bg-white text-slate-900 hover:border-slate-300"
      }`}
    >
      <div className="text-sm font-semibold">{name}</div>
      <div className={`mt-2 text-xs leading-5 ${selected ? "text-slate-200" : "text-slate-500"}`}>
        {description}
      </div>
    </button>
  );
}
