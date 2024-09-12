"use client";

import { Foods, Footer, MenuBar, NavbarUser } from "@/components";

const Page = () => {
  return (
    <div>
      <NavbarUser />
      <MenuBar />
      <Foods />
      <Footer />
    </div>
  );
};

export default Page;
