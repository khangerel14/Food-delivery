import Basket from "@/images/Basket"
import Icon from "@/images/Icon"
import User from "@/images/User"

export const Navbar = () => {
  return (
    <div>
      <div className="flex items-center justify-between w-[1440px] mx-auto font-semibold h-20">
        <div className="flex items-center gap-10">
          <button><Icon /></button>
          <button className="hover:text-green-600">НҮҮР</button>
          <button className="hover:text-green-600">ХООЛНЫ ЦЭС</button>
          <button className="hover:text-green-600">ХҮРГЭЛТИЙН БҮС</button>                
        </div>
        <div className="flex items-center gap-10">
          <input className="border rounded-lg h-10 font-normal px-4" type="search" placeholder="Хайх" />
          <button className="flex items-center gap-4 hover:text-green-600"><Basket />Сагс</button>
          <button className="flex items-center gap-4 hover:text-green-600"><User />Нэвтрэх</button>
        </div>
      </div>
    </div>
  )
}