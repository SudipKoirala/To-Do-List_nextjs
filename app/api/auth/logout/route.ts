import { deleteAuthCookies } from "@/lib/auth-cookies"
import { connectDb } from "@/lib/db"
import { verifyRefreshToken } from "@/lib/jwt"
import { User } from "@/models/user"
import { JwtPayload } from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"

export const logout=async(req: NextRequest)=>{
    

try {
    await connectDb();
    const refreshToken =  req.cookies.get("refreshToken")?.value as string
    if(!refreshToken){
        const res = NextResponse.json({
            message: "User pailai logged out chha"
        }, {status:200})
        deleteAuthCookies(res)
        return res
    }

    const decoded = verifyRefreshToken(refreshToken) as JwtPayload

    const user = await User.findById(decoded.userId)
    if(!user){
        return NextResponse.json({
            message: `user vetiyena`
        }, {status:500})
    }

    user.refreshToken = "";
   await user.save();
    const res = NextResponse.json({
            message: "log out vayeu hai"
        }, {status:200})
        deleteAuthCookies(res)
        return res
} catch (error: any) {
    return NextResponse.json({
            message: `Error in logout: ${error.message}`
        }, {status:500})
}
}