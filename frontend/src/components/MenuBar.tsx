'use client';

import { useState } from "react";

export const MenuBar = () => {
    const [ isActive, setIsActive ] = useState('Breakfast')

    const menuData = [ 'Breakfast', 'Soup', 'Main Course', 'Dessert' ]
  return (
    <div className="flex flex-col w-[1440px] mx-auto">
        <div className="flex justify-between items-center my-5">
            { menuData.map((item, index) => {
                return (
                    <div className="border p-3 w-80 rounded-lg" onClick={() => setIsActive(item)} style={{ background: isActive === item ? '#18BA51' : '#fff' }} key={index}>{item}</div>
                )
            })}
            {/* <button className="border p-3 w-80 rounded-lg" onClick={() => setIsActive('Breakfast')} style={{ background: isActive === 'Breakfast' ? '#18BA51' : '#fff' }}>Breakfast</button>
            <button className="border p-3 w-80 rounded-lg" onClick={() => setIsActive('Soup')} style={{ background: isActive === 'Soup' ? '#18BA51' : '#fff' }}>Soup</button>
            <button className="border p-3 w-80 rounded-lg" onClick={() => setIsActive('Main Course')} style={{ background: isActive === 'Main Course' ? '#18BA51' : '#fff' }}>Main Course</button>
            <button className="border p-3 w-80 rounded-lg" onClick={() => setIsActive('Dessert')} style={{ background: isActive === 'Dessert' ? '#18BA51' : '#fff' }}>Dessert</button> */}
        </div>
    </div>
  )
}