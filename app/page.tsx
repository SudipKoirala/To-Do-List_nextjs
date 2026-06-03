// app/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccessToken } from "@/lib/jwt";

export default async function HomePage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  // If access token is missing -> show signup
  if (!accessToken) return redirect("/signup");

  try {
    // If access token is valid -> go to profile
    verifyAccessToken(accessToken);
    return redirect("/profile");
  } catch {
    // If access token expired/invalid -> show signup
    return redirect("/signup");
  }
}