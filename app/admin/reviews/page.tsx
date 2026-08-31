"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


type Review = {
  id:string;
  name:string;
  project:string;
  review:string;
};




export default function ReviewsAdmin(){


const [reviews,setReviews] = useState<Review[]>([]);


const [name,setName] = useState("");

const [project,setProject] = useState("");

const [review,setReview] = useState("");


const [editingId,setEditingId] = useState<string | null>(null);

const [loading,setLoading] = useState(false);







async function loadReviews(){


const {data,error}=await supabase

.from("reviews")

.select("*")

.order("created_at",{
ascending:false
});



if(error){

console.log(error);

return;

}



setReviews(data || []);



}







useEffect(()=>{

loadReviews();

},[]);









async function saveReview(){



if(!name || !project || !review){

alert(
"Please fill all fields"
);

return;

}




try{


setLoading(true);





if(editingId){



const {error}=await supabase

.from("reviews")

.update({

name,

project,

review

})

.eq(
"id",
editingId
);



if(error)
throw error;



alert(
"Review Updated!"
);



}else{



const {error}=await supabase

.from("reviews")

.insert({

name,

project,

review

});



if(error)
throw error;



alert(
"Review Added!"
);



}






setName("");

setProject("");

setReview("");

setEditingId(null);


loadReviews();





}catch(error){


console.log(
"Review Error:",
error
);


alert(
"Something went wrong"
);



}finally{


setLoading(false);


}



}









function editReview(item:Review){


setName(
item.name
);


setProject(
item.project
);


setReview(
item.review
);


setEditingId(
item.id
);



}









async function deleteReview(id:string){



const confirmDelete = confirm(
"Delete this review?"
);



if(!confirmDelete)
return;





const {error}=await supabase

.from("reviews")

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
"Review Deleted!"
);


loadReviews();



}









return (

<div className="p-4 sm:p-6 lg:p-8 xl:p-10">



<h1 className="
text-3xl
sm:text-4xl
font-bold
text-[#071D49]
">

Reviews Manager

</h1>



<p className="
mt-3
text-gray-500
">

Manage customer reviews shown on your website.

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
"Edit Review"
:
"Add New Review"
}

</h2>







<input

placeholder="Customer Name"

value={name}

onChange={(e)=>
setName(e.target.value)
}

className="
mt-6
w-full
p-4
border
rounded-xl
"

/>







<input

placeholder="Project Type"

value={project}

onChange={(e)=>
setProject(e.target.value)
}

className="
mt-4
w-full
p-4
border
rounded-xl
"

/>







<textarea

placeholder="Customer Review"

value={review}

onChange={(e)=>
setReview(e.target.value)
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

onClick={saveReview}

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
"Update Review"
:
"Add Review"
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
reviews.map((item)=>(


<div

key={item.id}

className="
bg-white
rounded-3xl
p-6
shadow
border
"

>


<h3 className="
text-lg
font-bold
text-[#071D49]
">

{item.name}

</h3>




<p className="
text-sm
text-gray-500
mt-1
">

{item.project}

</p>






<p className="
mt-4
text-gray-600
">

&ldquo;{item.review}&rdquo;

</p>








<div className="
mt-5
flex
gap-3
">


<button

onClick={()=>editReview(item)}

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

onClick={()=>deleteReview(item.id)}

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
