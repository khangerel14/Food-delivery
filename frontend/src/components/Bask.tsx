import React from 'react'

export const Bask = () => {
  return (
    <div>
        <div className='flex flex-col justify-center items-center h-[300px] gap-6'>
            <h1 className='text-2xl font-semibold'>Та захиалга хийнэ үү!</h1>
            <h1 className='text-2xl font-semibold'>Та бүртгэлтэй юу?</h1>
            <div className='flex flex-col gap-3'>
                <p>Хэрэв тийм бол та нүүр цэсрүү нэвтрэн хоолоо захиалах боломжтой.</p>
                <p>Та бүртгэлгүй бол баруун дээд буланд байх товч дээр даран зааврийн дагуу бүртгэл үүсэх боломжтой.</p>
            </div>
        </div>
    </div>
  )
}