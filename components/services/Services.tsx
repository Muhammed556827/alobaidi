"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Building2,
  Paintbrush,
  Layers,
  Hammer,
  Palette
} from "lucide-react";
import { supabase } from "@/lib/supabase";



const icons = [
  Home,
  Building2,
  Paintbrush,
  Layers,
  Hammer,
  Palette
];



type Service = {
  id: string;
  title: string;
  description: string;
};



export default function Services() {


  const [services, setServices] = useState<Service[]>([]);



  useEffect(() => {


    async function fetchServices(){


      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("created_at", {
          ascending: false
        });



      if(error){

        console.log("Services Error:", error);
        return;

      }



      setServices(data || []);


    }



    fetchServices();


  }, []);





  return (

    <section
      id="services"
      className="py-16 sm:py-20 lg:py-24 bg-white"
    >


      <div className="max-w-7xl mx-auto px-4 sm:px-6">





        {/* Heading */}


        <div className="text-center max-w-3xl mx-auto">


          <p className="
            text-[#C9A227]
            uppercase
            tracking-[4px]
            text-sm
            font-semibold
          ">
            Our Services
          </p>



          <h2 className="
            mt-4
            text-3xl
            sm:text-4xl
            md:text-5xl
            font-extrabold
            text-[#071D49]
          ">
            Professional Painting Solutions
          </h2>



          <p className="
            mt-6
            text-[#6E6E73]
            text-lg
          ">
            From luxury residential finishes to large commercial projects,
            Alobaidi Group Painting delivers craftsmanship you can trust.
          </p>


        </div>






        {/* Cards */}


        <div className="
          mt-16
          grid
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
        ">




          {services.map((service,index)=>{


            const Icon =
              icons[index % icons.length];



            return (

              <motion.div


                key={service.id}


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
                  duration:.5,
                  delay:index * .1
                }}


                whileHover={{
                  y:-10
                }}



                className="
                  group
                  bg-[#FAFAFA]
                  rounded-3xl
                  p-6
                  sm:p-8
                  border
                  border-black/5
                  shadow-sm
                  hover:shadow-xl
                  transition
                "


              >




                <div className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-[#071D49]
                  flex
                  items-center
                  justify-center
                  mb-6
                  group-hover:bg-[#1E5EFF]
                  transition
                ">



                  <Icon
                    className="text-white"
                    size={28}
                  />



                </div>





                <h3 className="
                  text-xl
                  font-bold
                  text-[#071D49]
                ">
                  {service.title}
                </h3>





                <p className="
                  mt-4
                  text-[#6E6E73]
                  leading-relaxed
                ">
                  {service.description}
                </p>






                <div className="
                  mt-6
                  h-1
                  w-0
                  bg-[#C9A227]
                  group-hover:w-full
                  transition-all
                  duration-500
                "/>





              </motion.div>


            );


          })}





        </div>





        {
          services.length === 0 && (

            <p className="
              mt-16
              text-center
              text-gray-500
            ">
              No services available yet.
            </p>

          )
        }





      </div>


    </section>


  );

}
