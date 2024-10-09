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
      <div className="relative">
        <White />
        <div className="absolute inset-0">
          <Navbar />
          <Carousel />
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
