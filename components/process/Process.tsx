"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  FileText,
  Brush,
  Paintbrush,
  CheckCircle,
  KeyRound
} from "lucide-react";


const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Consultation",
    description:
      "We discuss your vision, goals, colors, and project requirements."
  },
  {
    number: "02",
    icon: FileText,
    title: "Detailed Quote",
    description:
      "You receive a clear and professional estimate with project details."
  },
  {
    number: "03",
    icon: Brush,
    title: "Preparation",
    description:
      "Our team carefully prepares surfaces to ensure a flawless finish."
  },
  {
    number: "04",
    icon: Paintbrush,
    title: "Professional Painting",
    description:
      "Premium materials and expert techniques bring your space to life."
  },
  {
    number: "05",
    icon: CheckCircle,
    title: "Quality Inspection",
    description:
      "We review every detail to ensure the highest quality standards."
  },
  {
    number: "06",
    icon: KeyRound,
    title: "Final Walkthrough",
    description:
      "We complete the project and make sure everything exceeds expectations."
  }
];


export default function Process() {
  return (
    <section
      className="py-16 sm:py-20 lg:py-24 bg-white"
      id="process"
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
            Our Process
          </p>


          <h2 className="
            mt-4
            text-3xl
            sm:text-4xl
            md:text-5xl
            font-extrabold
            text-[#071D49]
          ">
            A Simple Process.
            Exceptional Results.
          </h2>


          <p className="
            mt-6
            text-[#6E6E73]
            text-lg
          ">
            From the first consultation to the final walkthrough,
            we deliver a smooth and professional painting experience.
          </p>

        </div>



        <div className="
          mt-16
          grid
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
        ">

          {steps.map((step,index)=>{

            const Icon = step.icon;

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

                className="
                  relative
                  bg-[#FAFAFA]
                  rounded-3xl
                  p-6
                  sm:p-8
                  border
                  border-black/5
                  hover:shadow-xl
                  transition
                "
              >

                <div className="
                  flex
                  items-center
                  justify-between
                ">

                  <span className="
                    text-5xl
                    font-bold
                    text-[#071D49]/10
                  ">
                    {step.number}
                  </span>


                  <div className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-[#071D49]
                    flex
                    items-center
                    justify-center
                  ">

                    <Icon
                      className="text-[#C9A227]"
                      size={28}
                    />

                  </div>

                </div>


                <h3 className="
                  mt-8
                  text-xl
                  font-bold
                  text-[#071D49]
                ">
                  {step.title}
                </h3>


                <p className="
                  mt-4
                  text-[#6E6E73]
                  leading-relaxed
                ">
                  {step.description}
                </p>


              </motion.div>

            );

          })}

        </div>


      </div>

    </section>
  );
}
