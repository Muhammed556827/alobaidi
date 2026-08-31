"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";


export default function AdminLogin(){

const [email,setEmail] = useState("");

const [password,setPassword] = useState("");

const [loading,setLoading] = useState(false);

const [message,setMessage] = useState("");




async function login(e: React.FormEvent){


e.preventDefault();


setMessage("");



if(!email || !password){

setMessage("Please enter email and password");

return;

}



try{


setLoading(true);



const {data,error} = await supabase.auth.signInWithPassword({

email: email.trim(),

password: password.trim(),

});




if(error){

console.log(
"LOGIN ERROR:",
error
);

setMessage(error.message);

return;

}




if(!data.user){

setMessage(
"Login failed"
);

return;

}



console.log(
"Logged in:",
data.user.email
);



setMessage(
"Login successful..."
);



// Force redirect

window.location.href = "/admin";



}
catch(error: unknown){


console.log(
"LOGIN FAILED:",
error
);


setMessage(
error instanceof Error ? error.message : "Something went wrong"
);



}
finally{


setLoading(false);


}



}







return (

<div className="
min-h-screen
flex
items-center
justify-center
bg-[#FAFAFA]
px-6
">


<form

onSubmit={login}

className="
bg-white
rounded-3xl
shadow-xl
p-10
w-full
max-w-md
"

>



<h1 className="
text-3xl
font-bold
text-[#071D49]
">

Admin Login

</h1>




<p className="
mt-2
text-gray-500
">

Alobaidi CMS

</p>





{
message && (

<div className="
mt-6
p-4
rounded-xl
bg-gray-100
text-sm
"
>

{message}

</div>

)

}





<input

type="email"

placeholder="Email"

value={email}

onChange={(e)=>
setEmail(e.target.value)
}

className="
mt-8
w-full
p-4
border
rounded-xl
outline-none
"

/>





<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>
setPassword(e.target.value)
}

className="
mt-4
w-full
p-4
border
rounded-xl
outline-none
"

/>





<button

type="submit"

disabled={loading}

className="
mt-6
w-full
py-4
rounded-xl
bg-[#071D49]
text-white
font-semibold
hover:bg-[#1E5EFF]
transition
disabled:opacity-50
"

>

{
loading
?
"Logging in..."
:
"Login"
}


</button>




</form>


</div>

);


}
