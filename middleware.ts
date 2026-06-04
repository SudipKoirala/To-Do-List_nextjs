import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const accessToken = req.cookies.get("accessToken")?.value
    const isApiReq = path.startsWith("/api")
    const isProtectedPage = path.startsWith("/profile")

    console.log(`[Middleware] Path: ${path}, Has Token: ${!!accessToken}`)

    const isAuth = path.startsWith("/login") || path.startsWith("/signup")

    // If no token, redirect to login
    if (!accessToken) {
        console.log(`[Middleware] No token for path: ${path}`)
        if (isApiReq) {
            return NextResponse.json({
                message: "token chhaina"
            }, { status: 401 })
        }
        return NextResponse.redirect(new URL("/login", req.url))
    }

    // If already authenticated and trying to access login/signup, redirect to profile
    if (isAuth) {
        console.log(`[Middleware] User already authenticated, redirecting from ${path} to /profile`)
        return NextResponse.redirect(new URL("/profile", req.url))
    }

    // Allow the request through (JWT verification happens in API endpoints)
    return NextResponse.next();
}

export const config = {
    matcher: ["/profile/:path*", "/api/auth/:path*"]
}