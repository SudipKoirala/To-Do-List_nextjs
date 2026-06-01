import { NextResponse } from "next/server";

const isProduction = process.env.NODE_ENV === "production"

const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";

export const setAuthCookies = (
    res: NextResponse, 
    accessToken: string,
    refreshToken: string
) =>{
    res.cookies.set(ACCESS_TOKEN, accessToken,{
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        maxAge: 15 * 60,
        path: "/"
    })

    res.cookies.set(REFRESH_TOKEN, refreshToken,{
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
        path: "/"
    })

    return res
}


export const deleteAuthCookies = (res: NextResponse)=>{
    res.cookies.set(ACCESS_TOKEN, "",{
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        expires: new Date(0),
        path: "/"
    })

    res.cookies.set(REFRESH_TOKEN, "",{
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        expires: new Date(0),
        path: "/"
    })

    return res
}