'use client';

import { Carousel, Footer, ManageMent, NavbarUser } from "@/components"
import Foods from "@/utils/Foods";

const page = () => {
  return (
    <div>
      <NavbarUser />
      <Carousel />
      <ManageMent />
      <Foods />
      <Footer />
    </div>
  )
}

export default page
