"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";


type FAQItem = {
  id: string;
  question: string;
  answer: string;
};



export default function FAQ() {


  const [questions, setQuestions] = useState<FAQItem[]>([]);
  const [open, setOpen] = useState<string | null>(null);



  useEffect(() => {


    async function fetchFAQs(){


      const { data, error } = await supabase
        .from("faq")
        .select("*")
        .order("created_at", {
          ascending: false
        });



      if(error){

        console.log("FAQ Error:", error);
        return;

      }



      setQuestions(data || []);


    }



    fetchFAQs();


  }, []);





  return (

    <section
      id="faq"
      className="py-16 sm:py-20 lg:py-24 bg-[#FAFAFA]"
    >


      <div className="max-w-4xl mx-auto px-4 sm:px-6">





        <div className="text-center">


          <p className="
            text-[#C9A227]
            uppercase
            tracking-[4px]
            text-sm
            font-semibold
          ">
            FAQ
          </p>




          <h2 className="
            mt-4
            text-3xl
            sm:text-4xl
            md:text-5xl
            font-extrabold
            text-[#071D49]
          ">
            Frequently Asked Questions
          </h2>



        </div>






        <div className="mt-14 space-y-5">



          {questions.map((item)=>{


            const isOpen = open === item.id;



            return (


              <div

                key={item.id}

                className="
                  bg-white
                  rounded-2xl
                  shadow-sm
                  border
                  border-black/5
                  overflow-hidden
                "

              >




                <button

                  onClick={() =>
                    setOpen(
                      isOpen
                      ? null
                      : item.id
                    )
                  }


                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    p-5
                    sm:p-6
                    text-left
                  "

                >



                  <span className="
                    font-bold
                    text-[#071D49]
                  ">
                    {item.question}
                  </span>





                  <ChevronDown

                    className={`
                      text-[#1E5EFF]
                      transition-transform
                      ${
                        isOpen
                        ? "rotate-180"
                        : ""
                      }
                    `}

                  />



                </button>






                <motion.div

                  initial={false}

                  animate={{

                    height: isOpen
                    ? "auto"
                    : 0,

                    opacity: isOpen
                    ? 1
                    : 0,

                  }}

                  className="overflow-hidden"

                >



                  <p className="
                    px-5
                    sm:px-6
                    pb-5
                    sm:pb-6
                    text-[#6E6E73]
                    leading-relaxed
                  ">
                    {item.answer}
                  </p>




                </motion.div>




              </div>


            );


          })}




        </div>





        {
          questions.length === 0 && (

            <p className="
              mt-14
              text-center
              text-gray-500
            ">
              No FAQs available yet.
            </p>

          )
        }





      </div>


    </section>

  );

}
