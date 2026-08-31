"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


type Service = {
  id:string;
  title:string;
  description:string;
};




export default function ServicesAdmin(){


const [services,setServices] = useState<Service[]>([]);


const [title,setTitle] = useState("");

const [description,setDescription] = useState("");


const [editingId,setEditingId] = useState<string | null>(null);


const [loading,setLoading] = useState(false);







async function loadServices(){


const {data,error}=await supabase

.from("services")

.select("*")

.order("created_at",{
ascending:false
});



if(error){

console.log(error);

return;

}



setServices(data || []);



}






useEffect(()=>{


loadServices();


},[]);









async function saveService(){



if(!title || !description){

alert(
"Please fill all fields"
);

return;

}





try{


setLoading(true);





if(editingId){



const {error}=await supabase

.from("services")

.update({

title,

description

})

.eq(
"id",
editingId
);



if(error)
throw error;



alert(
"Service Updated!"
);



}else{



const {error}=await supabase

.from("services")

.insert({

title,

description

});



if(error)
throw error;



alert(
"Service Added!"
);



}






setTitle("");

setDescription("");

setEditingId(null);


loadServices();






}catch(error){


console.log(
"Service Error:",
error
);


alert(
"Something went wrong"
);



}finally{


setLoading(false);


}



}









function editService(item:Service){


setTitle(
item.title
);


setDescription(
item.description
);


setEditingId(
item.id
);



}









async function deleteService(id:string){



const confirmDelete = confirm(
"Delete this service?"
);



if(!confirmDelete)
return;






const {error}=await supabase

.from("services")

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
"Service Deleted!"
);



loadServices();



}









return (

<div className="p-4 sm:p-6 lg:p-8 xl:p-10">



<h1 className="
text-3xl
sm:text-4xl
font-bold
text-[#071D49]
">

Services Manager

</h1>





<p className="
mt-3
text-gray-500
">

Manage painting services displayed on your website.

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
"Edit Service"
:
"Add New Service"
}

</h2>








<input

placeholder="Service Title"

value={title}

onChange={(e)=>
setTitle(e.target.value)
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

placeholder="Service Description"

value={description}

onChange={(e)=>
setDescription(e.target.value)
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

onClick={saveService}

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
"Update Service"
:
"Add Service"
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
services.map((service)=>(


<div

key={service.id}

className="
bg-white
rounded-3xl
p-6
shadow
border
"

>



<h3 className="
text-xl
font-bold
text-[#071D49]
">

{service.title}

</h3>







<p className="
mt-3
text-gray-600
">

{service.description}

</p>







<div className="
mt-5
flex
gap-3
">





<button

onClick={()=>editService(service)}

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

onClick={()=>deleteService(service.id)}

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
