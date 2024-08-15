'use client';

import { useState } from "react";

export const MenuBar = () => {
    const [ isActive, setIsActive ] = useState(null)
    
    // const data = [ 'Breakfast', 'Soup', 'Main Course', 'Dessert' ];
    const handleClick = (index: any) => {
        setIsActive(index)
    }
  return (
    <div className="flex flex-col w-[1440px] mx-auto">
        <div className="flex justify-between my-8">
            <button className={isActive === 0 ? 'active' : ''} onClick={() => handleClick(0)} style={{background: isActive === 'Breakfast' ? '#3dbf0c' : ''}}>Breakfast</button>
            <button className={isActive === 1 ? 'active' : ''} onClick={() => handleClick(1)} style={{background: isActive === 'Soup' ? '#3dbf0c' : ''}}>Soup</button>
            <button className={isActive === 2 ? 'active' : ''} onClick={() => handleClick(2)} style={{background: isActive === 'Main Course' ? '#3dbf0c' : ''}}>Main Course</button>
            <button className={isActive === 3 ? 'active' : ''} onClick={() => handleClick(3)} style={{background: isActive === 'Dessert' ? '#3dbf0c' : ''}}>Dessert</button>
            {/* <button className="w-80 border h-10 rounded-md" onClick={() => handleClick(0)} style={{background: isActive === 'Breakfast' ? '#3dbf0c' : ''}}>Breakfast</button>
            <button className="w-80 border h-10 rounded-md" onClick={() => handleClick(1)} style={{background: isActive === 'Soup' ? '#3dbf0c' : ''}}>Soup</button>
            <button className="w-80 border h-10 rounded-md" onClick={() => handleClick(2)} style={{background: isActive === 'Main Course' ? '#3dbf0c' : ''}}>Main Course</button>
            <button className="w-80 border h-10 rounded-md" onClick={() => handleClick(3)} style={{background: isActive === 'Dessert' ? '#3dbf0c' : ''}}>Dessert</button> */}
        </div>
    </div>
  )
}