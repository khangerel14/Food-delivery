'use client';

import { useState } from "react";

export const MenuBar = () => {
  const [ isActive, setIsActive ] = useState('Breakfast')
  const handleClick = (e: any) => {
    setIsActive(e)
  }
  return (
    <div className="flex flex-col w-[1440px] mx-auto">
      <div className="flex justify-between my-8">
        <button className="w-80 border h-10 rounded-md" style={{ background: isActive === 'Breakfast' ? '#3dbf0c' : '' }} onClick={() => handleClick('Breakfast')}>Breakfast</button>
        <button className="w-80 border h-10 rounded-md" style={{ background: isActive === 'Soup' ? '#3dbf0c' : '' }} onClick={() => handleClick('Soup')}>Soup</button>
        <button className="w-80 border h-10 rounded-md" style={{ background: isActive === 'Main Course' ? '#3dbf0c' : '' }} onClick={() => handleClick('Main Course')}>Main Course</button>
        <button className="w-80 border h-10 rounded-md" style={{ background: isActive === 'Dessert' ? '#3dbf0c' : '' }} onClick={() => handleClick('Dessert')}>Dessert</button>
      </div>
    </div>
  )
}