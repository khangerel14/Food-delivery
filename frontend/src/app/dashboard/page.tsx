'use client';

import { Carousel, Footer, ManageMent, NavbarUser } from "@/components"
import Foods from "@/utils/Foods";
import { createContext, useRef } from "react"

export const inputContext = createContext<React.MutableRefObject<string> | null>({ current: ''})

const Page = () => {
  const inputRef = useRef('')
  return (
    <inputContext.Provider value={inputRef}>
      <NavbarUser />
      <Carousel />
      <ManageMent />
      <Foods />
      <Footer />
    </inputContext.Provider>
  )
}

export default Page
