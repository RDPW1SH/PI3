import {withAuth} from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(function middleware(req) {
    
    const token = req.nextauth.token;
    
    
    // console.log(req.nextUrl.pathname);
    // console.log("TOKEN:" + JSON.stringify(token));


    if(req.nextUrl.pathname.startsWith("/admin") && (!token || !token.isAdmin)) {
        if (!token) {
            return NextResponse.rewrite(new URL("/login", req.url));
        }
        if (!token.isAdmin) {   
            return NextResponse.rewrite(new URL("/unauthorized", req.url));
        }
    } 

    if(req.nextUrl.pathname.startsWith("/votacoes/criar") && !token) {
        return NextResponse.rewrite(new URL('/login', req.url));
    } 

    if(req.nextUrl.pathname.startsWith("/conta/settings") && !token) {
        return NextResponse.rewrite(new URL('/login', req.url));
    } 

        
    return NextResponse.next();
    
},  {
    callbacks: {
        authorized: ({ token }) => {
            
            return !!token;
          },
    }

})

export const config = {matcher: ["/votacoes/criar", "/conta/settings", "/admin"]};

