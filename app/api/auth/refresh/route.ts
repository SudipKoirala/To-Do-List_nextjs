// read refreshToken from cookie
// verify refresh token
// get userId from token
// find user in DB
// check DB refresh token matches cookie refresh token
// generate new access token
// send new access token back in cookie

import { deleteAuthCookies, setAccessToken } from "@/lib/auth-cookies";
import { connectDb } from "@/lib/db";
import { generateAccessToken, verifyRefreshToken } from "@/lib/jwt";
import {  User } from "@/models/user";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server"


export const POST = async (req: NextRequest) => {
    try {
        await connectDb();
        const refreshToken = req.cookies.get("refreshToken")?.value;

        if (!refreshToken) {
            const res = NextResponse.json({ message: "refresh token chhaina" })
            deleteAuthCookies(res);
            return res
        }

        const decoded = verifyRefreshToken(refreshToken) as JwtPayload

        const userId = decoded.userId as string;

        const user = await User.findById(userId)

        if (!user || !user.refreshToken) {
            const res = NextResponse.json({ message: "user ya refreshtoken chhaina hai" }, { status: 401 })
            deleteAuthCookies(res);
            return res;
        }

        if (user.refreshToken !== refreshToken) {
            const res = NextResponse.json({ message: "token match vayena" }, { status: 401 })
            deleteAuthCookies(res);
            return res;
        }

        const res = NextResponse.json({
            message: "naya accessToken aayo hai"
        }, { status: 200 })

        const newAccessToken = generateAccessToken(user._id as string)
        setAccessToken(res, newAccessToken)

        return res
    } catch (error) {
        const response = NextResponse.json(
            { message: "Refresh fail vayo" },
            { status: 401 }
        );
        deleteAuthCookies(response);
        return response;
    }
}
