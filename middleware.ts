import { NextRequest, NextResponse } from "next/server"
import { verifyAccessToken } from "./lib/jwt"
import { JwtPayload } from "jsonwebtoken"


export const middleware = (req: NextRequest)=>{
    const isAPI = req.nextUrl.pathname.startsWith("/api")

    try {
        const accessToken = req.cookies.get("accessToken")?.value

    if(!accessToken){
        if(isAPI){
            return NextResponse.json({
                message: "AccessToken chhaina"
            },{status: 401})
        }
        return NextResponse.redirect(new URL("/login", req.url))
    }
    const decoded = verifyAccessToken(accessToken) as JwtPayload
    const headers = new Headers(req.headers)
    headers.set("userId", decoded.userId)
    return NextResponse.next({
        request: {
            headers: headers
        }
    })
    } catch (error) {
        console.log(`middleware error: ${error}`)
        if(isAPI){
            return NextResponse.json({
                message: "token invalid or expired"
            },{status: 401})
        }
        return NextResponse.redirect(new URL("/login", req.url))
    }
}


export const config = {
    matcher:["/dashboard", "/dashboard/:path*", "/profile", "/profile/:path*"]
} 