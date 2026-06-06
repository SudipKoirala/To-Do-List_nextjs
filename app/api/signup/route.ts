import { connectDb } from "@/lib/db";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    await connectDb();
  const { firstName, lastName, userName, password, confirmPassword } =
    await req.json();

  if (!firstName || !lastName || !userName || !password) {
    return NextResponse.json(
      {
        message: "sabai varana hrr",
      },
      { status: 400 },
    );
  }

  if (confirmPassword !== password) {
    return NextResponse.json(
      {
        message: "password match vayena",
      },
      { status: 400 },
    );
  }
  try {
    const existingUser = await User.findOne
    ({ userName });
    if (existingUser) {
      return NextResponse.json(
        {
          message: "User pailai chha, try different name ",
        },
        { status: 400 },
      );
    }
    const user = await User.create({
      firstName,
      lastName,
      userName,
      password,
      confirmPassword
    });

    return NextResponse.json(
      {
        message: "User create vayo ",
        user,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: `Signup ma error aayo: ${error.message}`,
      },
      { status: 400 },
    );
  }
}
