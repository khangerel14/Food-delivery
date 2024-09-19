"use client";

import { Footer, LogIn, Navbar } from "@/components";
import StoreContextProvider from "@/context/StoreContext";

const page = () => {
  return (
    <StoreContextProvider>
      <Navbar />
      <LogIn />
      <Footer />
    </StoreContextProvider>
  );
};

export default page;
