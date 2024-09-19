"use client";

import { Carousel, Card, Footer, ManageMent, Navbar } from "@/components";
import StoreContextProvider from "@/context/StoreContext";

const Page = () => {
  return (
    <StoreContextProvider>
      <Navbar />
      <Carousel />
      <ManageMent />
      <Card />
      <Footer />
    </StoreContextProvider>
  );
};

export default Page;
