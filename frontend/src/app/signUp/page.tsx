"use client";

import { Footer, Navbar, SignUp } from "@/components";
import StoreContextProvider from "@/context/StoreContext";

const page = () => {
  return (
    <StoreContextProvider>
      <Navbar />
      <SignUp />
      <Footer />
    </StoreContextProvider>
  );
};

export default page;
