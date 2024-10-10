"use client";

import {
  Carousel,
  Card,
  Footer,
  Navbar,
  MenuBar,
  ChooseUs,
} from "@/components";
import StoreContextProvider from "@/context/StoreContext";
import { White } from "@/images";

const Page = () => {
  return (
    <StoreContextProvider>
      <div className="mx-auto overflow-x-hidden overflow-y-hidden">
        <div className="relative w-[115%] flex flex-col items-center">
          <White />
          <div className="absolute inset-0 mx-auto">
            <Navbar />
            <Carousel />
          </div>
        </div>
      </div>
      <MenuBar />
      <Card />
      <ChooseUs />
      <Footer />
    </StoreContextProvider>
  );
};

export default Page;
