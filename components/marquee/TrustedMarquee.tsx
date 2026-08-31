"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Company = {
  id: string;
  title: string;
  logo_url?: string;
};

export default function TrustedMarquee() {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    async function getMarquee() {
      const { data } = await supabase
        .from("marquee")
        .select("*")
        .order("created_at", { ascending: true });
      setCompanies(data || []);
    }

    getMarquee();
  }, []);

  if (companies.length === 0) return null;

  const repeated = companies.length < 4
    ? [...companies, ...companies, ...companies, ...companies]
    : [...companies, ...companies];

  return (
    <section className="overflow-hidden border-y border-white/10 bg-[#06183D] py-4 sm:py-5" aria-label="Trusted companies">
      <div className="animate-marquee flex w-max items-center gap-3 whitespace-nowrap sm:gap-5">
        {repeated.map((company, index) => (
          <div
            key={`${company.id}-${index}`}
            className="flex min-w-fit items-center gap-3 rounded-xl border border-white/10 bg-white/8 px-4 py-2.5 sm:px-5"
          >
            {company.logo_url && (
              <div className="grid h-9 w-9 place-items-center overflow-hidden rounded-lg bg-white p-1 sm:h-10 sm:w-10">
                <img src={company.logo_url} alt="" className="h-full w-full object-contain" />
              </div>
            )}
            <span className="text-xs font-semibold tracking-wide text-white sm:text-sm">{company.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
