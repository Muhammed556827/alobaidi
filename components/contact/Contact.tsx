"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Mail, Phone } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { gmailHref, phoneHref } from "@/lib/contactLinks";

type Settings = {
  phone?: string | null;
  email?: string | null;
  hours?: string | null;
};

export default function Contact() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      const { data, error } = await supabase
        .from("settings")
        .select("phone,email,hours")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.log("Settings Error:", error);
        return;
      }

      setSettings(data || null);
    }

    fetchSettings();
  }, []);

  const phone = settings?.phone?.trim() || "";
  const email = settings?.email?.trim() || "";
  const hours = settings?.hours?.trim() || "";

  return (
    <section id="contact" className="bg-[#071D49] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[5px] text-[#C9A227]">Contact Us</p>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-7xl">
            Let&apos;s Transform Your Space
          </h1>
          <p className="mt-6 text-base leading-relaxed text-gray-300 sm:mt-8 sm:text-xl">
            Ready to upgrade your home or business? Reach us directly by phone or email for your next painting project.
          </p>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:mt-16 md:grid-cols-3 lg:mt-20 lg:gap-8">
          {phone ? (
            <motion.a
              href={phoneHref(phone)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              aria-label={`Call ${phone}`}
              className="group rounded-[28px] border border-white/20 bg-white/10 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/20 sm:rounded-[32px] sm:p-8 lg:p-10"
            >
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#C9A227]/20 sm:h-20 sm:w-20">
                <Phone size={38} className="text-[#C9A227]" />
              </div>
              <h2 className="text-xl font-bold text-white sm:text-2xl">Phone</h2>
              <p className="mt-4 break-words text-base text-gray-300 underline-offset-4 group-hover:underline sm:text-xl">{phone}</p>
              <p className="mt-3 text-sm font-semibold text-[#D8B84E]">Tap to call</p>
            </motion.a>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[28px] border border-white/20 bg-white/10 p-6 backdrop-blur-xl sm:rounded-[32px] sm:p-8 lg:p-10"
            >
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#C9A227]/20 sm:h-20 sm:w-20">
                <Phone size={38} className="text-[#C9A227]" />
              </div>
              <h2 className="text-xl font-bold text-white sm:text-2xl">Phone</h2>
            </motion.div>
          )}

          {email ? (
            <motion.a
              href={gmailHref(email)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Email ${email} in Gmail`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group rounded-[28px] border border-white/20 bg-white/10 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/20 sm:rounded-[32px] sm:p-8 lg:p-10"
            >
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#C9A227]/20 sm:h-20 sm:w-20">
                <Mail size={38} className="text-[#C9A227]" />
              </div>
              <h2 className="text-xl font-bold text-white sm:text-2xl">Email</h2>
              <p className="mt-4 break-all text-base text-gray-300 underline-offset-4 group-hover:underline sm:text-xl">{email}</p>
              <p className="mt-3 text-sm font-semibold text-[#D8B84E]">Open in Gmail</p>
            </motion.a>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-[28px] border border-white/20 bg-white/10 p-6 backdrop-blur-xl sm:rounded-[32px] sm:p-8 lg:p-10"
            >
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#C9A227]/20 sm:h-20 sm:w-20">
                <Mail size={38} className="text-[#C9A227]" />
              </div>
              <h2 className="text-xl font-bold text-white sm:text-2xl">Email</h2>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-[28px] border border-white/20 bg-white/10 p-6 backdrop-blur-xl sm:rounded-[32px] sm:p-8 lg:p-10"
          >
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#C9A227]/20 sm:h-20 sm:w-20">
              <Clock size={38} className="text-[#C9A227]" />
            </div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">Business Hours</h2>
            {hours && <p className="mt-4 whitespace-pre-line text-base text-gray-300 sm:text-xl">{hours}</p>}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
