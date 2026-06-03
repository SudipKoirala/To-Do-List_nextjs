import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "./lib/jwt";
import { JwtPayload } from "jsonwebtoken";
import { headers } from "next/headers";

export function middleware (req: NextRequest){
    const accessToken = req.cookies.get("accessToken")?.value
const isApiReq = req.nextUrl.pathname.startsWith("/api")

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
        const newHeader = new Headers(req.headers)
        newHeader.set("userID", decoded.userId)
        return NextResponse.json({
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
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matchers:["/dashboard/:path*", "/profile/:path*", "/api/user/:path*"]
}