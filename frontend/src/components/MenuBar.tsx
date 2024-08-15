'use client';

import { useState } from "react";

export const MenuBar = () => {
  const [ isActive, setIsActive ] = useState(Number)
  const handleClick = (index: number) => {
    setIsActive(index)
    console.log('index is', index);
  }
  return (
    <div className="flex flex-col w-[1440px] mx-auto">
      <div className="flex justify-between my-8">
        <button className="w-80 border h-10 rounded-md" onClick={() => handleClick(0)} style={{background: isActive === 0 ? '#3dbf0c' : ''}}>Breakfast</button>
        <button className="w-80 border h-10 rounded-md" onClick={() => handleClick(1)} style={{background: isActive === 1 ? '#3dbf0c' : ''}}>Soup</button>
        <button className="w-80 border h-10 rounded-md" onClick={() => handleClick(2)} style={{background: isActive === 2 ? '#3dbf0c' : ''}}>Main Course</button>
        <button className="w-80 border h-10 rounded-md" onClick={() => handleClick(3)} style={{background: isActive === 3 ? '#3dbf0c' : ''}}>Dessert</button>
      </div>
    </div>
  )
}