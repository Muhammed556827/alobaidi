"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BarChart3,
  ChevronRight,
  CircleHelp,
  GalleryHorizontalEnd,
  Home,
  Images,
  LogOut,
  Menu,
  MessageSquareQuote,
  Paintbrush,
  Settings,
  X,
  ExternalLink,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const menu = [
  { name: "Dashboard", href: "/admin", icon: BarChart3 },
  { name: "Home", href: "/admin/home", icon: Home },
  { name: "Marquee", href: "/admin/marquee", icon: GalleryHorizontalEnd },
  { name: "Services", href: "/admin/services", icon: Paintbrush },
  { name: "Gallery", href: "/admin/gallery", icon: Images },
  { name: "Reviews", href: "/admin/reviews", icon: MessageSquareQuote },
  { name: "FAQ", href: "/admin/faq", icon: CircleHelp },
  { name: "Business Settings", href: "/admin/settings", icon: Settings },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <>
      <nav className="flex-1 space-y-1.5">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onNavigate}
              className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                active
                  ? "bg-white text-[#071D49] shadow-lg shadow-black/10"
                  : "text-white/75 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={19} />
              <span className="flex-1">{item.name}</span>
              <ChevronRight size={16} className={active ? "opacity-70" : "opacity-0 transition group-hover:opacity-60"} />
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 space-y-2 border-t border-white/10 pt-5">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-white/75 transition hover:bg-white/10 hover:text-white"
        >
          <ExternalLink size={18} />
          View Website
        </Link>
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-2xl bg-red-500/15 px-4 py-3 text-left text-sm font-semibold text-red-100 transition hover:bg-red-500 hover:text-white"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </>
  );
}

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col bg-[#071D49] p-5 text-white lg:flex xl:w-80 xl:p-6">
        <div className="mb-7 rounded-3xl border border-white/10 bg-white/7 p-5">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#C9A227]">Content Manager</p>
          <h1 className="mt-2 text-xl font-extrabold">Alobaidi CMS</h1>
          <p className="mt-1 text-xs text-white/50">Website control center</p>
        </div>
        <NavLinks />
      </aside>

      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-black/5 bg-white/95 px-4 backdrop-blur lg:hidden">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A227]">Alobaidi CMS</p>
          <p className="text-sm font-extrabold text-[#071D49]">Dashboard</p>
        </div>
        <button
          type="button"
          aria-label="Open admin navigation"
          onClick={() => setOpen(true)}
          className="grid h-11 w-11 place-items-center rounded-2xl bg-[#071D49] text-white"
        >
          <Menu size={22} />
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close admin navigation"
            className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute right-0 top-0 flex h-full w-[min(88vw,340px)] flex-col bg-[#071D49] p-5 text-white shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C9A227]">Content Manager</p>
                <h2 className="mt-1 text-xl font-extrabold">Alobaidi CMS</h2>
              </div>
              <button
                type="button"
                aria-label="Close admin navigation"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-xl bg-white/10"
              >
                <X size={21} />
              </button>
            </div>
            <NavLinks onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}
    </>
  );
}
