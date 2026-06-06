// read refreshToken from cookie
// verify refresh token
// get userId from token
// find user in DB
// check DB refresh token matches cookie refresh token
// generate new access token
// send new access token back in cookie

import { deleteAuthCookies, setAccessToken } from "@/lib/auth-cookies";
import { connectDb } from "@/lib/db"
import { generateAccessToken, verifyRefreshToken } from "@/lib/jwt";
import { IUser, User } from "@/models/user";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest)=>{
    try {
await connectDb();
const refreshToken = req.cookies.get("refreshToken")?.value

if(!refreshToken){
    const res =  NextResponse.json({
        message: "refresh token chhaina"
    })
    deleteAuthCookies(res)
    return res
}

const decoded = verifyRefreshToken(refreshToken) as JwtPayload
const userId = decoded.userId;
const user  =await User.findById(userId)

if(!user || !user.refreshToken){
    const res =  NextResponse.json({
        message: "refresh ya user chhaina"
    })
    deleteAuthCookies(res)
    return res
}

if(refreshToken!==user.refreshToken){
    const res =  NextResponse.json({
        message: "refresh token milena ta k ho?"
    })
    deleteAuthCookies(res)
    return res
}

const accessToken = generateAccessToken(userId)
const res = NextResponse.json({
        message: "naya accesstoken aayo hai"
    })
    setAccessToken(res,accessToken)
    return res
    } catch (error) {
       const res =  NextResponse.json({
        message: `error in refreshToken: ${error}`
    })
    deleteAuthCookies(res)
    return res
    }

}