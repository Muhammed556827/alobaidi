"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Why Us", href: "/#why-us" },
  { name: "Services", href: "/#services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Reviews", href: "/#reviews" },
  { name: "Process", href: "/#process" },
  { name: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [businessName, setBusinessName] = useState("Alobaidi Group Painting");
  const pathname = usePathname();

  useEffect(() => {
    async function getSettings() {
      const { data } = await supabase
        .from("settings")
        .select("business_name")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data?.business_name) setBusinessName(data.business_name);
    }

    getSettings();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="min-w-0 max-w-[70vw] truncate text-[17px] font-extrabold text-[#071D49] sm:text-xl lg:max-w-none"
        >
          {businessName}
        </Link>

        <div className="hidden items-center gap-5 xl:flex">
          {links.map((link) => {
            const active =
              link.href === "/gallery" ? pathname === "/gallery" : link.href === "/" && pathname === "/";

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition ${
                  active ? "text-[#1E5EFF]" : "text-[#1D1D1D] hover:text-[#C9A227]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <Link
            href="/#contact"
            className="rounded-full bg-[#1E5EFF] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#C9A227]"
          >
            Contact Us
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-[#071D49] transition hover:bg-black/5 xl:hidden"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-x-0 top-18 max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-black/5 bg-white px-4 py-5 shadow-2xl sm:top-20 sm:max-h-[calc(100dvh-5rem)] sm:px-6 xl:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map((link) => {
              const active = link.href === "/gallery" ? pathname === "/gallery" : link.href === "/" && pathname === "/";

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-2xl px-4 py-3.5 text-base font-semibold transition ${
                    active
                      ? "bg-[#071D49] text-white"
                      : "text-[#071D49] hover:bg-[#071D49]/5"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-2xl bg-[#1E5EFF] px-5 py-4 text-center font-semibold text-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
