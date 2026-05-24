import { connectDb } from "@/lib/db";
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
            message: "User chhaina, username check gara"
        },
    {
        status:401
    })
    }

    const isMatchedPw = user.comparePassword(password)
    if(!isMatchedPw){
        return NextResponse.json({
            message: "Password milena"
        }, {status: 400})
    }
    return  NextResponse.json({
        message:"user chha hai"
    })
    } catch (error: any) {
        return NextResponse.json({message: error.message},{status: 400})
    }
    

}