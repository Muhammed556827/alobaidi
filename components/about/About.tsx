"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Paintbrush,
  Users,
  Sparkles
} from "lucide-react";

import { supabase } from "@/lib/supabase";



const features = [
  {
    icon: ShieldCheck,
    title: "Licensed & Insured",
    description:
      "Professional painting services delivered with safety, reliability, and peace of mind.",
  },
  {
    icon: Paintbrush,
    title: "Premium Materials",
    description:
      "We use high-quality paints and products to achieve beautiful, long-lasting finishes.",
  },
  {
    icon: Users,
    title: "Experienced Team",
    description:
      "Skilled painters focused on precision, cleanliness, and exceptional craftsmanship.",
  },
  {
    icon: Sparkles,
    title: "Clean Job Sites",
    description:
      "Respectful service with careful preparation and a clean workspace from start to finish.",
  },
];



type AboutSettings = {
  about_title?: string;
  about_description?: string;
  about_image?: string;
};




export default function About(){


const [settings,setSettings] = useState<AboutSettings>({});



useEffect(()=>{


async function loadAbout(){


const {data,error}=await supabase
.from("settings")
.select(
`
about_title,
about_description,
about_image
`
)
.order("created_at",{
ascending:false
})
.limit(1)
.maybeSingle();



if(error){

console.log(
"About CMS Error:",
error
);

return;

}



if(data){

setSettings(data);

}


}



loadAbout();



},[]);






return (

<section
id="about"
className="
py-16
sm:py-20
lg:py-24
bg-[#FAFAFA]
"
>


<div className="
max-w-7xl
mx-auto
px-4
sm:px-6
grid
lg:grid-cols-2
gap-16
items-center
">





{/* IMAGE */}


<motion.div

initial={{
opacity:0,
x:-50
}}

whileInView={{
opacity:1,
x:0
}}

transition={{
duration:.7
}}

viewport={{
once:true
}}

>


<div className="
rounded-[32px]
overflow-hidden
shadow-xl
">


{settings.about_image ? (
<img
src={settings.about_image}
alt="Alobaidi Group Painting team"
className="w-full h-[360px] sm:h-[460px] lg:h-[550px] object-cover"
/>
) : (
<div className="grid h-[360px] w-full place-items-center bg-[linear-gradient(135deg,#071D49,#1E5EFF)] p-8 sm:h-[460px] lg:h-[550px]">
<div className="text-center text-white">
<Paintbrush size={44} className="mx-auto text-[#C9A227]" />
<p className="mt-4 font-bold">Your About image can be uploaded from Business Settings.</p>
</div>
</div>
)}


</div>


</motion.div>









{/* CONTENT */}


<motion.div

initial={{
opacity:0,
x:50
}}

whileInView={{
opacity:1,
x:0
}}

transition={{
duration:.7
}}

viewport={{
once:true
}}

>


<p className="
text-[#C9A227]
uppercase
tracking-[4px]
text-sm
font-semibold
">

About Us

</p>






<h2 className="
mt-4
text-3xl
sm:text-4xl
md:text-5xl
font-extrabold
text-[#071D49]
">

{settings.about_title ||
"About Alobaidi Group Painting"}

</h2>







<p className="
mt-6
text-[#6E6E73]
leading-relaxed
text-lg
">

{settings.about_description ||

"Alobaidi Group Painting provides premium residential and commercial painting services with expert craftsmanship, quality materials, and attention to every detail."
}

</p>








<div className="
mt-10
grid
sm:grid-cols-2
gap-5
">


{features.map((feature,index)=>{


const Icon = feature.icon;


return (

<motion.div

key={index}

whileHover={{
y:-8
}}

className="
bg-white
rounded-2xl
p-6
shadow-sm
border
border-black/5
transition
"

>


<Icon

size={32}

className="
text-[#1E5EFF]
mb-4
"

/>




<h3 className="
font-bold
text-[#071D49]
">

{feature.title}

</h3>





<p className="
mt-2
text-sm
text-[#6E6E73]
">

{feature.description}

</p>



</motion.div>


);


})}



</div>






</motion.div>





</div>


</section>

);


}
