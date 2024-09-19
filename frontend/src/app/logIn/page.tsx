"use client";

import { Footer, LogIn, Navbar } from "@/components";
import StoreContextProvider from "@/context/StoreContext";

const page = () => {
  return (
    <div>
      <StoreContextProvider>
        <Navbar />
      </StoreContextProvider>
      <LogIn />
      <Footer />
    </div>
  );
};

export default page;
