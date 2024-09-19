"use client";

import { Footer, Navbar, SignUp } from "@/components";
import StoreContextProvider from "@/context/StoreContext";

const page = () => {
  return (
    <div>
      <StoreContextProvider>
        <Navbar />
      </StoreContextProvider>
      <SignUp />
      <Footer />
    </div>
  );
};

export default page;
