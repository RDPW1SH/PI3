import {withAuth} from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(function middleware(req) {
    
    const token = req.nextauth.token;
    
    /*
    console.log(req.nextUrl.pathname)
    console.log(req.nextauth.token)*/

    if(req.nextUrl.pathname.startsWith("/votacoes/criar") && !token) {
        return NextResponse.rewrite(new URL('/login', req.url));
    } 
    
    if(req.nextUrl.pathname.startsWith("/login") && token || req.nextUrl.pathname.startsWith("/register") && token ) {
        return NextResponse.rewrite(new URL('/', req.url));
    }  
        
    return NextResponse.next();
    
},  {
    callbacks: {
        authorized: ({token}) => !!token
    }

})

export const config = {matcher: ["/votacoes/criar", "/login", "/register"]};

