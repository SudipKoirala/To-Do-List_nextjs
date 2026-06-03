import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "./lib/jwt";
import { JwtPayload } from "jsonwebtoken";
import { headers } from "next/headers";

export function middleware (req: NextRequest){
    const path = req.nextUrl.pathname
    const accessToken = req.cookies.get("accessToken")?.value
const isApiReq = path.startsWith("/api")
const isProtectedPage = path.startsWith("/dashboard") || path.startsWith("/profile")


const isAuth = path.startsWith("/login") || path.startsWith("/signup")

    if(!accessToken){
        if(isApiReq){
            return NextResponse.json({
                message: "token chhaina"
            },{status: 401})
        }
        return NextResponse.redirect(new URL("/login", req.url))
    }


    try {
        const decoded = verifyAccessToken(accessToken) as JwtPayload

        if(isAuth){
            return NextResponse.redirect(new URL("/dashboard", req.url))
        }
        const newHeader = new Headers(req.headers)
        newHeader.set("userID", decoded.userId)
        return NextResponse.next({
            request:{
                headers:newHeader
            } 
        })
    } catch (error) {
        if(isApiReq){
            return NextResponse.json({
                message: "token invalid ya expire vayo"
            }, {status: 401})
        }
        if(isProtectedPage){
            return NextResponse.redirect(new URL("/login", req.url));
        }
        return NextResponse.next();
    }
}

export const config = {
    matcher:["/dashboard/:path*", "/profile/:path*", "/api/user/:path*"]
}