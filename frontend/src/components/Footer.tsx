"use client";

import { RedOnion } from "@/images";

export const Footer = () => {
  return (
    <div className="bg-slate-800 w-full">
      <div className="flex justify-between py-10 h-[310px] w-[1230px] mx-auto max-xl:w-full max-md:px-8 max-sm:text-xs">
        <div className="flex flex-col justify-between">
          <RedOnion />
          <p className="text-gray-400 text-lg">Developed by 💗 khaankoo</p>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex gap-9 text-white">
            <div className="flex flex-col gap-2">
              <h1>About Online Food</h1>
              <h1>Read our blog</h1>
              <h1>Sign up to deliver</h1>
              <h1>Add your restaurant</h1>
            </div>
            <div className="flex flex-col gap-2">
              <h1>Get Help</h1>
              <h1>Ask any question</h1>
              <h1>Order Now</h1>
              <h1>Contact</h1>
            </div>
            <div className="flex flex-col gap-2">
              <h1>Facebook</h1>
              <h1>Instagram</h1>
              <h1>Twitter</h1>
              <h1>Youtube</h1>
            </div>
          </div>
          <div className="flex gap-5 text-white justify-end">
            <p>Privacy Policy</p>
            <p>Terms of Use</p>
            <p>Pricing</p>
          </div>
        </div>
      </div>
    </div>
  );
};
