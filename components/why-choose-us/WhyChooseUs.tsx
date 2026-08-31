"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Paintbrush,
  Clock,
  Award,
  CheckCircle,
  Sparkles
} from "lucide-react";


const reasons = [
  {
    icon: Paintbrush,
    title: "Meticulous Prep Work",
    description:
      "Every project begins with detailed preparation to ensure smooth surfaces and flawless results.",
  },
  {
    icon: Sparkles,
    title: "Premium Paint Products",
    description:
      "We use high-quality materials from trusted brands for beautiful and durable finishes.",
  },
  {
    icon: Clock,
    title: "On-Time Completion",
    description:
      "Professional planning and communication to keep your project moving efficiently.",
  },
  {
    icon: Award,
    title: "2-Year Warranty",
    description:
      "Our workmanship warranty reflects our confidence in the quality of our work.",
  },
  {
    icon: ShieldCheck,
    title: "Licensed & Insured",
    description:
      "Your property is protected with professional and reliable service.",
  },
  {
    icon: CheckCircle,
    title: "Attention To Detail",
    description:
      "Clean lines, careful finishes, and craftsmanship in every project.",
  },
];


export default function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="py-16 sm:py-20 lg:py-24 bg-[#071D49]"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6">


        <div className="text-center max-w-3xl mx-auto">

          <p className="
            text-[#C9A227]
            uppercase
            tracking-[4px]
            text-sm
            font-semibold
          ">
            Why Choose Us
          </p>


          <h2 className="
            mt-4
            text-3xl
            sm:text-4xl
            md:text-5xl
            font-extrabold
            text-white
          ">
            Craftsmanship You Can Trust
          </h2>


          <p className="
            mt-6
            text-gray-300
            text-lg
          ">
            We combine professional experience, premium materials,
            and attention to detail to deliver exceptional painting results.
          </p>

        </div>



        <div className="
          mt-16
          grid
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
        ">


          {reasons.map((reason,index)=>{

            const Icon = reason.icon;

            return (

              <motion.div
                key={index}
                initial={{
                  opacity:0,
                  y:40
                }}
                whileInView={{
                  opacity:1,
                  y:0
                }}
                viewport={{
                  once:true
                }}
                transition={{
                  delay:index * .1
                }}
                whileHover={{
                  y:-8
                }}
                className="
                  bg-white/10
                  backdrop-blur-xl
                  border
                  border-white/10
                  rounded-3xl
                  p-6
                  sm:p-8
                  hover:bg-white/15
                  transition
                "
              >

                <Icon
                  size={36}
                  className="
                    text-[#C9A227]
                    mb-6
                  "
                />


                <h3 className="
                  text-xl
                  font-bold
                  text-white
                ">
                  {reason.title}
                </h3>


                <p className="
                  mt-4
                  text-gray-300
                  leading-relaxed
                ">
                  {reason.description}
                </p>


              </motion.div>

            );

          })}


        </div>


      </div>

    </section>
  );
}
