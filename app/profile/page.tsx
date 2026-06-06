// app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      console.log("Fetching profile...");
      let res = await fetch("/api/auth/profile", {
        credentials: "include",
      });

      console.log("Profile fetch response status:", res.status);

      if (res.status === 401) {
        console.log("Got 401, attempting token refresh...");
        const refreshRes = await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include",
        });

        if (refreshRes.ok) {
          console.log("Token refreshed successfully");
          res = await fetch("/api/auth/profile", {
            credentials: "include",
          });
        } else {
          console.log("Token refresh failed, redirecting to login");
          router.push("/login");
          return;
        }
      }

      if (!res.ok) {
        console.log("Profile fetch failed with status:", res.status);
        router.push("/login");
        return;
      }

      const data = await res.json();
      setUser(data.user);
    } catch {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      router.push("/login");
    } catch {
      console.log("Logout failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500 text-lg">
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Profile
        </h1>

        {user && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Username</p>
              <p className="text-lg font-medium text-gray-800">
                {user.userName}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">First Name</p>
              <p className="text-lg font-medium text-gray-800">
                {user.firstName}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Last Name</p>
              <p className="text-lg font-medium text-gray-800">
                {user.lastName}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">PW</p>
              <p className="text-lg font-medium text-gray-800">
                {user.password}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="mt-8 w-full bg-red-500 hover:bg-red-600 active:scale-[0.98] transition text-white font-medium py-3 rounded-lg shadow-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
