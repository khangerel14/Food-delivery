"use client";

import { Footer, Navbar } from "@/components";
import { InvoiceDisplay } from "@/components/Qpay";
import StoreContextProvider from "@/context/StoreContext";

const Page = () => {
  return (
    <StoreContextProvider>
      <Navbar />
      <InvoiceDisplay />
      <Footer />
    </StoreContextProvider>
  );
};

export default Page;
