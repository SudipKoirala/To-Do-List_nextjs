import { connectDb } from "@/lib/db";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDb();
        const { userName, firstName, lastName, password, confirmPassword } =
        await req.json();
    if (!userName || !firstName || !lastName || !password || !confirmPassword) {
        return NextResponse.json(
            { message: "Sabai field varana hr" },
            { status: 400 },
        );
    }

    const existing = await User.findOne({ userName });
    if (existing) {
        return NextResponse.json(
            { message: "User pailai chha, aarko banau" },
            { status: 400 },
        );
    }

    const user = await User.create({
        userName,
        firstName,
        lastName,
        password,
        confirmPassword,
    });
    return NextResponse.json({user,
        message: "User create vayo hai",
    }, {
        status: 200,
    },
    );
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Server error" }, { status: 500 });

    }
    
}
