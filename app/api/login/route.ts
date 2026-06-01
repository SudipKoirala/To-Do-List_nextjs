import { setAuthCookies } from "@/lib/auth-cookies";
import { connectDb } from "@/lib/db";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export const  POST=async(req: Request) =>{
    try {
        await connectDb()
        const {userName, password} = await req.json();

    if(!userName || !password){
        return NextResponse.json({
            message:"Inavlid halerachhau hrr!"
        },{
            status: 400
        })
    }

    const user = await User.findOne({userName})
    if(!user){
        return NextResponse.json({
            message: "K lekhya milena hai"
        },
    {
        status:401
    })
    }

    const isMatchedPw = await user.comparePassword(password)
    if(!isMatchedPw){
        return NextResponse.json({
            message: "K lekhya milena hai"
        }, {status: 400})
    }

    const accessToken = generateAccessToken(user._id as string)
    const refreshToken = generateRefreshToken(user._id as string)

    user.refreshToken= refreshToken;
    await user.save();

    const res = NextResponse.json({message: "Login vayeu hai", user:{userName: user.userName, firstName: user.firstName,lastname: user.lastName}},)
    setAuthCookies(res, accessToken, refreshToken)
    return res;

    } catch (error: any) {
        return NextResponse.json({message: error.message},{status: 400})
    }
    

}