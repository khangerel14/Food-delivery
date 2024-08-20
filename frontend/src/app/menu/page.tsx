'use client';

import { Footer, MenuBar, NavbarUser } from "@/components"
import Foods from "@/utils/Foods";

const page = () => {
  return (
    <div>
      <NavbarUser />
      <MenuBar />
      <Foods />
      <Footer />
    </div>
  )
}

export default page
