"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import BrandCard from "@/components/BrandCard";
import Header from "@/components/Header";
import { brands } from "@/data/brands";
import { setFavoriteBrands } from "@/lib/storage";

export default function OnboardingPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const canContinue = useMemo(() => selected.length > 0, [selected]);

  const toggleBrand = (brandId: string) => {
    setSelected((current) =>
      current.includes(brandId)
        ? current.filter((item) => item !== brandId)
        : [...current, brandId]
    );
  };

  const handleContinue = () => {
    if (!canContinue) return;
    setFavoriteBrands(selected);
    router.push("/events");
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-md px-5 py-8">
      <Header
        title="Best Hobby Event"
        subtitle="관심 있는 브랜드를 선택하면 이벤트와 예약 소식을 더 쉽게 볼 수 있어요."
      />

      <section className="space-y-3">
        {brands.map((brand) => (
          <BrandCard
            key={brand.id}
            name={brand.name}
            description={brand.description}
            selected={selected.includes(brand.id)}
            onClick={() => toggleBrand(brand.id)}
          />
        ))}
      </section>

      <button
        type="button"
        onClick={handleContinue}
        disabled={!canContinue}
        className="mt-8 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        선택 완료
      </button>
    </main>
  );
}
