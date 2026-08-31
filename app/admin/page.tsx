"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  CircleHelp,
  GalleryHorizontalEnd,
  Images,
  MessageSquareQuote,
  Paintbrush,
  RefreshCw,
  Settings,
  Sparkles,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type Stats = {
  services: number;
  gallery: number;
  reviews: number;
  faq: number;
  marquee: number;
};

const cards = [
  { key: "services" as const, label: "Services", href: "/admin/services", icon: Paintbrush },
  { key: "gallery" as const, label: "Gallery Items", href: "/admin/gallery", icon: Images },
  { key: "reviews" as const, label: "Reviews", href: "/admin/reviews", icon: MessageSquareQuote },
  { key: "faq" as const, label: "FAQ Items", href: "/admin/faq", icon: CircleHelp },
  { key: "marquee" as const, label: "Marquee Logos", href: "/admin/marquee", icon: GalleryHorizontalEnd },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ services: 0, gallery: 0, reviews: 0, faq: 0, marquee: 0 });
  const [businessName, setBusinessName] = useState("Alobaidi Group Painting");
  const [homeReady, setHomeReady] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loadDashboard() {
    setLoading(true);

    const [services, gallery, reviews, faq, marquee, settings, home] = await Promise.all([
      supabase.from("services").select("id", { count: "exact", head: true }),
      supabase.from("gallery").select("id", { count: "exact", head: true }),
      supabase.from("reviews").select("id", { count: "exact", head: true }),
      supabase.from("faq").select("id", { count: "exact", head: true }),
      supabase.from("marquee").select("id", { count: "exact", head: true }),
      supabase.from("settings").select("business_name").order("created_at", { ascending: false }).limit(1).maybeSingle(),
      supabase.from("home").select("id").order("created_at", { ascending: false }).limit(1).maybeSingle(),
    ]);

    setStats({
      services: services.count || 0,
      gallery: gallery.count || 0,
      reviews: reviews.count || 0,
      faq: faq.count || 0,
      marquee: marquee.count || 0,
    });

    if (settings.data?.business_name) setBusinessName(settings.data.business_name);
    setHomeReady(Boolean(home.data));
    setLoading(false);
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  const contentTotal = Object.values(stats).reduce((sum, value) => sum + value, 0);
  const setupItems = [
    { label: "Homepage content saved", done: homeReady, href: "/admin/home" },
    { label: "Business settings added", done: Boolean(businessName), href: "/admin/settings" },
    { label: "At least 3 services published", done: stats.services >= 3, href: "/admin/services" },
    { label: "Gallery has project media", done: stats.gallery > 0, href: "/admin/gallery" },
    { label: "Customer reviews added", done: stats.reviews > 0, href: "/admin/reviews" },
    { label: "FAQ section populated", done: stats.faq > 0, href: "/admin/faq" },
  ];
  const completed = setupItems.filter((item) => item.done).length;

  return (
    <main className="p-4 sm:p-6 lg:p-8 xl:p-10">
      <section className="overflow-hidden rounded-[28px] bg-[#071D49] p-6 text-white shadow-xl sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#DAB94E]">
              <Sparkles size={14} /> Website Overview
            </div>
            <h1 className="mt-5 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl lg:text-5xl">Welcome to {businessName}</h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
              Manage the public website, project media, customer reviews, FAQs, business information, and homepage content from one responsive dashboard.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <Link href="/admin/home" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1E5EFF] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#C9A227]">
              Edit Homepage <ArrowUpRight size={17} />
            </Link>
            <button
              type="button"
              onClick={loadDashboard}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/8 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/15"
            >
              <RefreshCw size={17} className={loading ? "animate-spin" : ""} /> Refresh
            </button>
          </div>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.key}
              href={card.href}
              className="group rounded-3xl border border-black/5 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#071D49] text-[#C9A227] sm:h-12 sm:w-12">
                  <Icon size={21} />
                </div>
                <ArrowUpRight size={18} className="text-gray-300 transition group-hover:text-[#1E5EFF]" />
              </div>
              <p className="mt-5 text-2xl font-extrabold text-[#071D49] sm:text-3xl">{loading ? "—" : stats[card.key]}</p>
              <p className="mt-1 text-xs font-semibold text-gray-500 sm:text-sm">{card.label}</p>
            </Link>
          );
        })}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
        <div className="rounded-[28px] border border-black/5 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">Content Health</p>
              <h2 className="mt-2 text-2xl font-extrabold text-[#071D49]">Website setup progress</h2>
            </div>
            <div className="rounded-2xl bg-[#071D49] px-4 py-3 text-center text-white">
              <p className="text-xl font-extrabold">{completed}/{setupItems.length}</p>
              <p className="text-[10px] uppercase tracking-wider text-white/55">Ready</p>
            </div>
          </div>

          <div className="mt-7 space-y-3">
            {setupItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 rounded-2xl border border-black/5 bg-[#F8F9FC] p-4 transition hover:border-[#1E5EFF]/25 hover:bg-white"
              >
                <CheckCircle2 size={21} className={item.done ? "text-emerald-500" : "text-gray-300"} />
                <span className="min-w-0 flex-1 text-sm font-semibold text-[#071D49]">{item.label}</span>
                <ArrowUpRight size={16} className="shrink-0 text-gray-300" />
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-black/5 bg-white p-5 shadow-sm sm:p-7">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">Quick Actions</p>
          <h2 className="mt-2 text-2xl font-extrabold text-[#071D49]">Common updates</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-500">Jump directly into the areas you’re most likely to update after a new project or customer.</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
            {[
              ["Add project media", "/admin/gallery", Images],
              ["Add customer review", "/admin/reviews", MessageSquareQuote],
              ["Update services", "/admin/services", Paintbrush],
              ["Business details", "/admin/settings", Settings],
            ].map(([label, href, Icon]) => {
              const ActionIcon = Icon as typeof Images;
              return (
                <Link key={label as string} href={href as string} className="group rounded-2xl border border-black/5 p-4 transition hover:border-[#1E5EFF]/20 hover:bg-[#F8FAFF]">
                  <ActionIcon size={22} className="text-[#1E5EFF]" />
                  <p className="mt-4 text-sm font-bold text-[#071D49]">{label as string}</p>
                  <p className="mt-1 text-xs text-gray-400">Open editor →</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-[28px] border border-black/5 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">CMS Summary</p>
            <h2 className="mt-2 text-2xl font-extrabold text-[#071D49]">{contentTotal} managed content items</h2>
            <p className="mt-2 text-sm text-gray-500">The dashboard now gives you a real overview instead of acting as an empty landing screen.</p>
          </div>
          <Link href="/" target="_blank" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#071D49] px-5 py-3.5 text-sm font-bold text-white">
            View Live Website <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
