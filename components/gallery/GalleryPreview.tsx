"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Images, Play } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Project = {
  id: string;
  title: string;
  category: string;
  image_url: string | null;
  video_url: string | null;
  media_type: string | null;
};

export default function GalleryPreview() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("gallery")
        .select("id,title,category,image_url,video_url,media_type")
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) {
        console.log("Gallery Preview Error:", error);
        return;
      }

      setProjects(data || []);
    }

    fetchProjects();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#071D49] py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute -right-28 top-0 h-80 w-80 rounded-full bg-[#1E5EFF]/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#C9A227]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <p className="text-sm font-semibold uppercase tracking-[4px] text-[#D8B84E]">
              See Our Work
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              The Finish Speaks For Itself.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
              Take a closer look at recent transformations, finishes, and details from our residential and commercial projects.
            </p>
          </motion.div>

          <Link
            href="/gallery"
            className="inline-flex min-h-13 w-fit items-center justify-center gap-2 rounded-full bg-[#C9A227] px-7 py-4 font-bold text-[#071D49] transition hover:-translate-y-0.5 hover:bg-white"
          >
            Explore Full Gallery
            <ArrowRight size={19} />
          </Link>
        </div>

        {projects.length > 0 ? (
          <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2 lg:gap-5">
            {projects.map((project, index) => {
              const featured = index === 0;
              const cardClass = featured
                ? "group relative h-[360px] overflow-hidden rounded-[28px] sm:col-span-2 sm:h-[430px] lg:col-span-7 lg:row-span-2 lg:h-[600px]"
                : "group relative h-[280px] overflow-hidden rounded-[28px] sm:h-[320px] lg:col-span-5 lg:h-[290px]";

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className={cardClass}
                >
                  <Link href="/gallery" aria-label={`View ${project.title} in gallery`} className="absolute inset-0 z-20" />

                  {project.media_type === "video" && project.video_url ? (
                    <video
                      src={project.video_url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                  ) : project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center bg-[linear-gradient(135deg,#15366F,#0B2556)]">
                      <Images size={48} className="text-white/50" />
                    </div>
                  )}

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7">
                    <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D8B84E]">
                      {project.media_type === "video" && <Play size={14} fill="currentColor" />}
                      {project.category || "Project"}
                    </div>
                    <h3 className={`font-extrabold text-white ${featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}>
                      {project.title || "Completed Project"}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 overflow-hidden rounded-[30px] border border-white/10 bg-white/5 p-7 sm:mt-12 sm:p-10"
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-[#D8B84E]">
                  <Images size={28} />
                </div>
                <h3 className="mt-5 text-2xl font-extrabold text-white">Explore Our Project Gallery</h3>
                <p className="mt-2 max-w-xl text-gray-300">
                  See completed painting projects, detailed finishes, and the quality behind our work.
                </p>
              </div>
              <Link
                href="/gallery"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 font-semibold text-white transition hover:bg-white hover:text-[#071D49]"
              >
                View Gallery
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
