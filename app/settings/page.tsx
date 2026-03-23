"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BrandCard from "@/components/BrandCard";
import Header from "@/components/Header";
import { brands } from "@/data/brands";
import { getFavoriteBrands, setFavoriteBrands } from "@/lib/storage";

export default function SettingsPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    setSelected(getFavoriteBrands());
  }, []);

  const toggleBrand = (brandId: string) => {
    setSelected((current) =>
      current.includes(brandId)
        ? current.filter((item) => item !== brandId)
        : [...current, brandId]
    );
  };

  const handleSave = () => {
    if (selected.length === 0) return;
    setFavoriteBrands(selected);
    router.push("/events");
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-md px-5 py-8">
      <Header
        title="관심 브랜드 설정"
        subtitle="보고 싶은 브랜드만 골라 다시 정리할 수 있어요."
        backHref="/events"
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
        onClick={handleSave}
        disabled={selected.length === 0}
        className="mt-8 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        저장하고 돌아가기
      </button>
    </main>
  );
}
