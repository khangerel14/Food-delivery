"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

export const LogIn = () => {
  const router = useRouter();
  const moveSign = () => {
    router.push("/signUp");
  };
  return (
    <div className="flex flex-col w-full items-center my-24 gap-10">
      <div className="font-bold text-2xl">
        <h1>Нэвтрэх</h1>
      </div>
      <div className="flex flex-col gap-5 w-96">
        <div className="flex flex-col gap-1">
          <h1>Е-мэйл</h1>
          <input
            className="border rounded-sm h-8 p-5"
            placeholder="Е-мэйл хаягаа оруулна уу"
            type="email"
          />
        </div>
        <div className="flex flex-col items-end">
          <div className="flex flex-col gap-1 w-full">
            <h1>Нууц үг</h1>
            <input
              className="border rounded-sm h-8 p-5"
              placeholder="Нууц үгээ оруулна уу"
              type="password"
            />
          </div>
          <button>Нууц үг сэргээх</button>
        </div>
      </div>
      <div className="flex flex-col gap-6 w-96 items-center">
        <button className="border w-full bg-gray-100 p-3 text-gray-400 rounded-sm">
          Нэвтрэх
        </button>
        <p>Эсвэл</p>
        <button
          className="border w-full border-green-400 p-3 rounded-sm"
          onClick={moveSign}
        >
          Бүртгүүлэх
        </button>
        <button className="border w-full bg-gray-100 p-3 text-gray-400 rounded-sm">
          <a href="/api/auth/login">Log In</a>
        </button>
        <button className="border w-full bg-gray-100 p-3 text-gray-400 rounded-sm">
          <a href="/api/auth/logout">Log Out</a>
        </button>
      </div>
    </div>
  );
};
