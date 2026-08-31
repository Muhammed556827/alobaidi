"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { supabase } from "@/lib/supabase";


type Review = {
  id: string;
  name: string;
  project: string;
  review: string;
  rating?: number | null;
};



export default function Testimonials() {


  const [reviews, setReviews] = useState<Review[]>([]);



  useEffect(() => {


    async function fetchReviews(){


      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", {
          ascending: false
        });



      if(error){

        console.log("Reviews Error:", error);
        return;

      }



      setReviews(data || []);


    }



    fetchReviews();


  }, []);





  return (

    <section
      id="reviews"
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
            Reviews
          </p>



          <h2 className="
            mt-4
            text-3xl
            sm:text-4xl
            md:text-5xl
            font-extrabold
            text-white
          ">
            What Our Clients Say
          </h2>



          <p className="
            mt-6
            text-gray-300
            text-lg
          ">
            Trusted by homeowners and businesses for professional painting
            services and exceptional results.
          </p>


        </div>





        <div className="
          mt-16
          grid
          md:grid-cols-3
          gap-8
        ">



          {reviews.map((review,index)=>(


            <motion.div

              key={review.id}

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
                delay:index * .15
              }}

              className="
                bg-white/10
                backdrop-blur-xl
                border
                border-white/10
                rounded-3xl
                p-6
                sm:p-8
              "

            >



              <div className="flex gap-1 mb-6">


                {[1,2,3,4,5].map((star)=>(

                  <Star

                    key={star}

                    size={18}

                    fill={
                      star <= (Number(review.rating) || 5)
                      ? "#C9A227"
                      : "transparent"
                    }

                    className="text-[#C9A227]"

                  />

                ))}


              </div>





              <p className="
                text-gray-200
                leading-relaxed
              ">
                &ldquo;{review.review}&rdquo;
              </p>





              <div className="mt-8">


                <h3 className="
                  text-white
                  font-bold
                ">
                  {review.name}
                </h3>




                <p className="
                  text-gray-400
                  text-sm
                  mt-1
                ">
                  {review.project}
                </p>



              </div>




            </motion.div>


          ))}



        </div>





        {
          reviews.length === 0 && (

            <p className="
              mt-16
              text-center
              text-gray-400
            ">
              No reviews available yet.
            </p>

          )
        }




      </div>


    </section>

  );

}
