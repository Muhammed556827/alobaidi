"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


type FAQ = {
  id:string;
  question:string;
  answer:string;
};



export default function FAQAdmin(){


const [faqs,setFaqs] = useState<FAQ[]>([]);

const [question,setQuestion] = useState("");

const [answer,setAnswer] = useState("");

const [editingId,setEditingId] = useState<string | null>(null);

const [loading,setLoading] = useState(false);






async function loadFAQs(){


const {data,error}=await supabase

.from("faq")

.select("*")

.order("created_at",{
ascending:false
});



if(error){

console.log(error);

return;

}



setFaqs(data || []);


}





useEffect(()=>{

loadFAQs();

},[]);









async function saveFAQ(){



if(!question || !answer){

alert(
"Please fill all fields"
);

return;

}





try{


setLoading(true);




if(editingId){



const {error}=await supabase

.from("faq")

.update({

question,

answer

})

.eq(
"id",
editingId
);



if(error)
throw error;



alert(
"FAQ Updated!"
);



}else{



const {error}=await supabase

.from("faq")

.insert({

question,

answer

});



if(error)
throw error;



alert(
"FAQ Added!"
);



}






setQuestion("");

setAnswer("");

setEditingId(null);


loadFAQs();




}catch(error){


console.log(
"FAQ Error:",
error
);


alert(
"Something went wrong"
);



}finally{


setLoading(false);


}



}









function editFAQ(faq:FAQ){


setQuestion(
faq.question
);


setAnswer(
faq.answer
);


setEditingId(
faq.id
);


}










async function deleteFAQ(id:string){



const confirmDelete = confirm(
"Delete this FAQ?"
);



if(!confirmDelete)
return;






const {error}=await supabase

.from("faq")

.delete()

.eq(
"id",
id
);





if(error){

console.log(error);

alert(
"Delete failed"
);

return;

}





alert(
"FAQ Deleted!"
);



loadFAQs();



}











return (

<div className="p-4 sm:p-6 lg:p-8 xl:p-10">



<h1 className="
text-3xl
sm:text-4xl
font-bold
text-[#071D49]
">

FAQ Manager

</h1>





<p className="
mt-3
text-gray-500
">

Manage frequently asked questions for customers.

</p>







<div className="
mt-10
max-w-xl
bg-white
rounded-3xl
p-5
sm:p-8
shadow
">





<h2 className="
text-xl
font-bold
">

{
editingId
?
"Edit FAQ"
:
"Add New FAQ"
}

</h2>






<input

placeholder="Question"

value={question}

onChange={(e)=>
setQuestion(e.target.value)
}

className="
mt-6
w-full
p-4
border
rounded-xl
"

/>







<textarea

placeholder="Answer"

value={answer}

onChange={(e)=>
setAnswer(e.target.value)
}

rows={5}

className="
mt-4
w-full
p-4
border
rounded-xl
"

/>







<button

onClick={saveFAQ}

disabled={loading}

className="
mt-6
px-8
py-4
rounded-xl
bg-[#1E5EFF]
text-white
font-semibold
"

>

{
loading
?
"Saving..."
:
editingId
?
"Update FAQ"
:
"Add FAQ"
}

</button>



</div>










<div className="
mt-12
grid
gap-6
max-w-3xl
">





{
faqs.map((faq)=>(


<div

key={faq.id}

className="
bg-white
rounded-3xl
p-6
shadow
border
"

>


<h3 className="
font-bold
text-[#071D49]
text-lg
">

{faq.question}

</h3>





<p className="
mt-3
text-gray-600
">

{faq.answer}

</p>







<div className="
mt-5
flex
gap-3
">


<button

onClick={()=>editFAQ(faq)}

className="
px-5
py-2
rounded-xl
bg-[#071D49]
text-white
"

>

Edit

</button>






<button

onClick={()=>deleteFAQ(faq.id)}

className="
px-5
py-2
rounded-xl
bg-red-600
text-white
"

>

Delete

</button>



</div>





</div>



))

}






</div>





</div>

);

}
