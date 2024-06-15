'use client';

import Basket from "@/images/Basket";
import Icon from "@/images/Icon";
import User from "@/images/User";
import { useRouter } from "next/navigation";

export const NavbarUser = () => {
  const router = useRouter();
  
  const logIn = () => {
    router.push('/logIn')
  }
  const menu = () => {
    router.push('/menu')
  }
  const deliverZone = () => {
    router.push('/deliverZone')
  }
  const homePage = () => {
    router.push('dashboard')
  }
  return (
    <div>
      <div className="flex items-center justify-between w-[1440px] mx-auto font-semibold h-20">
        <div className="flex items-center gap-10">
          <button><Icon /></button>
          <button className="hover:text-green-600" onClick={homePage}>НҮҮР</button>
          <button className="hover:text-green-600" onClick={menu}>ХООЛНЫ ЦЭС</button>
          <button className="hover:text-green-600" onClick={deliverZone}>ХҮРГЭЛТИЙН БҮС</button>                
        </div>
        <div className="flex items-center gap-10">
          <input className="border rounded-lg h-10 font-normal px-4" type="search" placeholder="Хайх" />
          <button className="flex items-center gap-4 hover:text-green-600"><Basket />Сагс</button>
          <button className="flex items-center gap-4 hover:text-green-600" onClick={logIn}><User />Хэрэглэгч</button>
        </div>
      </div>
    </div>
  )
}