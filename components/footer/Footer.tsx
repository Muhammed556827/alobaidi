"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Phone,
  Mail,
  Clock
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import { gmailHref, phoneHref } from "@/lib/contactLinks";

type Settings = {
  business_name: string;
  email: string;
  phone: string;
  hours: string;
  description: string;
  instagram: string;
  facebook: string;
};

export default function Footer() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .order("created_at", {
          ascending: false
        })
        .limit(1)
        .single();

      if (error) {
        console.log(
          "Footer Settings Error:",
          error
        );
        return;
      }

      setSettings(data);
    }

    fetchSettings();
  }, []);

  return (
    <footer
      className="
        bg-[#071D49]
        text-white
        pt-16
        pb-8
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
        "
      >

        <div
          className="
            grid
            md:grid-cols-2
            lg:grid-cols-4
            gap-10
          "
        >

          {/* Company */}

          <div>
            <h2
              className="
                text-2xl
                font-extrabold
              "
            >
              {settings?.business_name ||
                "Alobaidi Group Painting"}
            </h2>

            <p
              className="
                mt-5
                text-gray-300
                leading-relaxed
              "
            >
              {settings?.description ||
                "Premium residential and commercial painting services built with quality craftsmanship and attention to detail."}
            </p>
          </div>


          {/* Navigation */}

          <div>
            <h3
              className="
                text-lg
                font-bold
                text-[#C9A227]
              "
            >
              Navigation
            </h3>

            <nav
              className="
                mt-5
                flex
                flex-col
                gap-3
              "
            >
              <Link
                href="/"
                className="
                  text-gray-300
                  hover:text-white
                  transition
                "
              >
                Home
              </Link>

              <Link
                href="/#about"
                className="
                  text-gray-300
                  hover:text-white
                  transition
                "
              >
                About
              </Link>

              <Link
                href="/#why-us"
                className="
                  text-gray-300
                  hover:text-white
                  transition
                "
              >
                Why Us
              </Link>

              <Link
                href="/#services"
                className="
                  text-gray-300
                  hover:text-white
                  transition
                "
              >
                Services
              </Link>

              <Link
                href="/gallery"
                className="
                  text-gray-300
                  hover:text-white
                  transition
                "
              >
                Gallery
              </Link>

              <Link
                href="/#reviews"
                className="
                  text-gray-300
                  hover:text-white
                  transition
                "
              >
                Reviews
              </Link>

              <Link
                href="/#process"
                className="
                  text-gray-300
                  hover:text-white
                  transition
                "
              >
                Process
              </Link>

              <Link
                href="/#faq"
                className="
                  text-gray-300
                  hover:text-white
                  transition
                "
              >
                FAQ
              </Link>

              <Link
                href="/#contact"
                className="
                  text-gray-300
                  hover:text-white
                  transition
                "
              >
                Contact
              </Link>
            </nav>
          </div>


          {/* Services */}

          <div>
            <h3
              className="
                text-lg
                font-bold
                text-[#C9A227]
              "
            >
              Services
            </h3>

            <div
              className="
                mt-5
                space-y-3
                text-gray-300
              "
            >
              <p>Interior Painting</p>
              <p>Exterior Painting</p>
              <p>Commercial Painting</p>
              <p>Cabinet Refinishing</p>
            </div>
          </div>


          {/* Contact */}

          <div>
            <h3
              className="
                text-lg
                font-bold
                text-[#C9A227]
              "
            >
              Contact
            </h3>

            <div
              className="
                mt-5
                space-y-4
                text-gray-300
              "
            >

              <div
                className="
                  flex
                  gap-3
                  items-start
                "
              >
                <Phone
                  size={18}
                  className="text-[#C9A227] shrink-0"
                />

                {settings?.phone ? (
                  <a
                    href={phoneHref(settings.phone)}
                    className="break-words transition hover:text-white hover:underline"
                  >
                    {settings.phone}
                  </a>
                ) : (
                  <p>Phone</p>
                )}
              </div>


              <div
                className="
                  flex
                  gap-3
                  items-start
                "
              >
                <Mail
                  size={18}
                  className="text-[#C9A227] shrink-0"
                />

                {settings?.email ? (
                  <a
                    href={gmailHref(settings.email)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all transition hover:text-white hover:underline"
                  >
                    {settings.email}
                  </a>
                ) : (
                  <p>Email</p>
                )}
              </div>


              <div
                className="
                  flex
                  gap-3
                  items-start
                "
              >
                <Clock
                  size={18}
                  className="text-[#C9A227] shrink-0"
                />

                <p>
                  {settings?.hours || "Business Hours"}
                </p>
              </div>

            </div>
          </div>

        </div>


        {/* Copyright */}

        <div
          className="
            mt-12
            pt-6
            border-t
            border-white/10
            text-center
            text-gray-400
            text-sm
          "
        >
          © {new Date().getFullYear()}{" "}
          {settings?.business_name ||
            "Alobaidi Group Painting"}.
          {" "}All rights reserved.
        </div>

      </div>
    </footer>
  );
}
