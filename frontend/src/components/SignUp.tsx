"use client";

import { useRouter } from "next/navigation";

export const SignUp = () => {
  const router = useRouter();
  const logIn = () => {
    router.push("/logIn");
  };
  return (
    <div className="flex flex-col w-full items-center my-24 gap-10">
      <div className="font-bold text-2xl">
        <h1>Бүртгүүлэх</h1>
      </div>
      <div className="flex flex-col gap-5 w-96">
        <div className="flex flex-col gap-1">
          <h1>Нэр</h1>
          <input
            className="border rounded-sm h-8 p-5"
            placeholder="Нэрээ оруулна уу"
            type="text"
            name=""
            id=""
          />
        </div>
        <div className="flex flex-col gap-1">
          <h1>Е-мэйл</h1>
          <input
            className="border rounded-sm h-8 p-5"
            placeholder="Е-мэйл хаягаа оруулна уу"
            type="email"
            name=""
            id=""
          />
        </div>
        <div className="flex flex-col gap-1">
          <h1>Хаяг</h1>
          <input
            className="border rounded-sm h-8 p-5"
            placeholder="Та хаягаа оруулна уу"
            type="text"
            name=""
            id=""
          />
        </div>
        <div className="flex flex-col gap-1">
          <h1>Нууц үг</h1>
          <input
            className="border rounded-sm h-8 p-5"
            placeholder="Нууц үгээ оруулна уу"
            type="password"
            name=""
            id=""
          />
        </div>
      </div>
      <div className="flex flex-col gap-8 w-96 items-center">
        <div className="flex gap-3">
          <input className="border rounded-sm h-8" type="checkbox" />
          <p>Үйлчилгээний нөхцөл зөвшөөрөх</p>
        </div>
        <button className="border w-full justify-center h-12 flex items-center bg-gray-100 p-3 text-gray-400 rounded-sm border-green-600">
          Бүртгүүлэх
        </button>
        <p>Эсвэл</p>
        <button
          className="border w-full justify-center h-12 flex items-center bg-gray-100 p-3 text-gray-400 rounded-sm border-green-600"
          onClick={logIn}
        >
          Нэвтрэх
        </button>
      </div>
    </div>
  );
};
