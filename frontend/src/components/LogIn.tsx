"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";

export const LogIn = () => {
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    const createUser = async () => {
      if (user) {
        try {
          const response = await fetch("http://localhost:8000/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              auth0Id: user.sub,
              email: user.email,
              name: user.nickname,
              picture: user.picture,
            }),
          });

          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error || "Something went wrong");
          }
        } catch (err) {
          console.error("Error creating user:", err);
        }
      }
    };

    if (!isLoading && user) {
      createUser();
    }
  }, [user, isLoading]);

  const moveSign = () => {
    router.push("/signUp");
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="flex flex-col w-full items-center py-24 gap-10">
      {user ? (
        <div className="flex flex-col items-center gap-7 my-5">
          {user.picture && (
            <img
              src={user.picture}
              alt="User Profile"
              className="rounded-full w-24 h-24 my-4"
            />
          )}
          <div className="font-bold text-2xl">Hi, {user.name}!</div>
          <button className="border w-full bg-gray-100 p-3 text-gray-400 rounded-sm">
            <a href="/api/auth/logout">Log Out</a>
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5">
          <h1 className="font-bold text-2xl">Нэвтрэх</h1>
          <form className="flex flex-col gap-5 w-96">
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Е-мэйл</label>
              <input
                id="email"
                className="border rounded-sm h-8 p-5"
                placeholder="Е-мэйл хаягаа оруулна уу"
                type="email"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Нууц үг</label>
              <input
                id="password"
                className="border rounded-sm h-8 p-5"
                placeholder="Нууц үгээ оруулна уу"
                type="password"
              />
            </div>
            <button
              type="submit"
              className="border w-full bg-gray-100 p-3 text-gray-400 rounded-sm"
            >
              Нэвтрэх
            </button>
          </form>
          <button
            className="border w-full bg-gray-100 p-3 text-gray-400 rounded-sm"
            onClick={moveSign}
          >
            Бүртгүүлэх
          </button>
          <button className="border w-full bg-gray-100 p-3 text-gray-400 rounded-sm">
            <a href="/api/auth/login">Log In</a>
          </button>
        </div>
      )}
    </div>
  );
};
