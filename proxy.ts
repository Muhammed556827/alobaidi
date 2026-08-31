import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export async function proxy(req: NextRequest){


const res = NextResponse.next({
request:req
});



const supabase = createServerClient(

process.env.NEXT_PUBLIC_SUPABASE_URL!,

process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

{

cookies:{

getAll(){

return req.cookies.getAll();

},


setAll(cookies){


cookies.forEach(({name,value,options})=>{


req.cookies.set(
name,
value
);


res.cookies.set(
name,
value,
options
);


});


}


}

}

);





const {
data:{
session
}

}=await supabase.auth.getSession();




const path=req.nextUrl.pathname;





if(

path.startsWith("/admin") &&

path !== "/admin/login"

){


if(!session){


return NextResponse.redirect(

new URL(
"/admin/login",
req.url
)

);


}


}




return res;


}



export const config={

matcher:[
"/admin/:path*"
]

};
