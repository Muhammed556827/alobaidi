"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Project = {
  id: string;
  title: string;
  category: string;
  image_url: string | null;
  image_path: string;
  video_url: string | null;
  media_type: string | null;
};

export default function Gallery() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.log("Gallery Error:", error);
        return;
      }

      setProjects(data || []);
    }

    fetchProjects();
  }, []);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter(function (project) {
          return project.category === activeFilter;
        });

  return (
    <section id="gallery" className="py-16 sm:py-20 lg:py-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="text-center max-w-3xl mx-auto">

          <p className="text-[#C9A227] uppercase tracking-[4px] text-sm font-semibold">
            Our Work
          </p>

          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#071D49]">
            Featured Projects
          </h2>

          <p className="mt-6 text-[#6E6E73] text-lg">
            Explore our completed residential and commercial
            painting projects showcasing quality craftsmanship
            and attention to detail.
          </p>

        </div>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">

          {[
            "All",
            "Residential",
            "Commercial",
            "Interior",
            "Exterior",
          ].map(function (filter) {

            const buttonClass =
              activeFilter === filter
                ? "px-6 py-3 rounded-full border transition bg-[#071D49] text-white"
                : "px-6 py-3 rounded-full border transition bg-white text-[#071D49] border-black/10";

            return (
              <button
                key={filter}
                onClick={function () {
                  setActiveFilter(filter);
                }}
                className={buttonClass}
              >
                {filter}
              </button>
            );
          })}

        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredProjects.map(function (project, index) {

            return (
              <motion.div
                key={project.id}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                className="group relative overflow-hidden rounded-3xl h-[320px] sm:h-[420px] shadow-lg"
              >

                {project.media_type === "video" &&
                project.video_url ? (

                  <video
                    src={project.video_url}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />

                ) : (

                  <img
                    src={project.image_url || ""}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />

                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 opacity-0 group-hover:opacity-100 transition flex items-end p-5 sm:p-8 pointer-events-none">

                  <div>

                    <p className="text-[#C9A227] text-sm uppercase tracking-wider">
                      {project.category}
                    </p>

                    <h3 className="text-white text-2xl font-bold mt-2">
                      {project.title}
                    </h3>

                  </div>

                </div>

              </motion.div>
            );
          })}

        </div>

        {filteredProjects.length === 0 && (
          <div className="mt-20 text-center text-gray-500">
            No projects available yet.
          </div>
        )}

      </div>
    </section>
  );
}

