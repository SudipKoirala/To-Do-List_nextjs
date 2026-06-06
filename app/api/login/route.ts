import { setAuthCookies } from "@/lib/auth-cookies";
import { connectDb } from "@/lib/db";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";
import { User } from "@/models/user";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const { userName, password } = await req.json();
    try {
        await connectDb();

        if (!userName || !password) {
            return NextResponse.json(
                {
                    message: "khali chhodera k hunchha jasto lagchha?",
                },
                { status: 400 },
            );
        }

        const user = await User.findOne({ userName });

        if (!user) {
            return NextResponse.json(
                {
                    message: "milne credentials hana na hrr",
                },
                { status: 400 },
            );
        }

        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return NextResponse.json(
                {
                    message: "milne credentials hana na hrr",
                },
                { status: 400 },
            );
        }

        const refreshToken = generateRefreshToken(user._id);
        const accessToken = generateAccessToken(user._id);

        user.refreshToken = refreshToken;
        await user.save();
        let res = NextResponse.json(
            {
                message: "Login Vayeu hai",
            },
            { status: 200 },
        );
        setAuthCookies(res, accessToken, refreshToken);
        return res;
    } catch (error) {
        return NextResponse.json(
            {
                message: `Login Error: ${error}`,
            },
            { status: 400 },
        );
    }
};
