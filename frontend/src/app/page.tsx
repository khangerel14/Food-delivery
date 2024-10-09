"use client";

import {
  Carousel,
  Card,
  Footer,
  ManageMent,
  Navbar,
  MenuBar,
  ChooseUs,
} from "@/components";
import StoreContextProvider from "@/context/StoreContext";
import { White } from "@/images";

export default function Home() {
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
}
