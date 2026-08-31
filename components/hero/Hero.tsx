"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Play } from "lucide-react";
import { supabase } from "@/lib/supabase";

type HomeSettings = {
  badge: string;
  title: string;
  description: string;
  button_one: string;
  button_two: string;
  image_url: string;
};

export default function Hero() {
  const [home, setHome] = useState<HomeSettings | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    async function getHome() {
      const { data, error } = await supabase
        .from("home")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        setHome(data);
        setVideoFailed(false);
      }
    }

    getHome();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !home?.image_url) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {
        // Muted autoplay is supported by modern browsers; keep the video visible if a browser blocks it.
      });
    }
  }, [home?.image_url]);

  return (
    <section className="relative overflow-hidden bg-[#071D49] pt-18 sm:pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#1E5EFF40,transparent_42%)]" />
      <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-[#C9A227]/10 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#D8B84E] sm:text-sm">
            <CheckCircle2 size={16} />
            {home?.badge || "Alobaidi Group Painting"}
          </div>

          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {home?.title || "Premium Painting. Built To Last."}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-300 sm:mt-8 sm:text-lg">
            {home?.description ||
              "Transform your home or business with professional painting services built around quality craftsmanship, premium materials, and attention to every detail."}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <Link
              href="/#contact"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#1E5EFF] px-7 py-4 text-center font-semibold text-white transition hover:bg-[#C9A227]"
            >
              {home?.button_one || "Contact Us"}
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/gallery"
              className="inline-flex min-h-13 items-center justify-center rounded-full border border-white/25 px-7 py-4 text-center font-semibold text-white transition hover:bg-white hover:text-[#071D49]"
            >
              {home?.button_two || "View Our Work"}
            </Link>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-2 sm:mt-12 sm:gap-4">
            {[
              ["15+", "Years Experience"],
              ["1200+", "Projects Completed"],
              ["98%", "Satisfaction"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4">
                <h3 className="text-xl font-bold text-white sm:text-3xl">{value}</h3>
                <p className="mt-1 text-[11px] leading-tight text-gray-400 sm:text-sm">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="relative mx-auto w-full max-w-2xl"
        >
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0B2556] shadow-2xl sm:rounded-[36px]">
            {home?.image_url && !videoFailed ? (
              <video
                ref={videoRef}
                key={home.image_url}
                src={home.image_url}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onError={() => setVideoFailed(true)}
                className="h-[340px] w-full object-cover sm:h-[460px] lg:h-[600px]"
              />
            ) : (
              <div className="grid h-[340px] w-full place-items-center bg-[linear-gradient(135deg,#102B63,#163D84_55%,#0B2556)] p-8 sm:h-[460px] lg:h-[600px]">
                <div className="text-center text-white">
                  <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-white/15 bg-white/10 backdrop-blur">
                    <Play size={34} className="ml-1" />
                  </div>
                  <p className="mt-5 text-lg font-bold">Hero video</p>
                </div>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071D49]/35 via-transparent to-transparent" />
          </div>

          <div className="absolute -bottom-5 left-4 max-w-[calc(100%-2rem)] rounded-2xl bg-white p-4 shadow-xl sm:-bottom-6 sm:-left-6 sm:p-6">
            <p className="font-bold text-[#071D49]">Trusted Craftsmanship</p>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">Residential & Commercial Painting</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
