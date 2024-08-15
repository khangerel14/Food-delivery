import React from 'react'

const data = [
    {
        name: 'Будаатай хуурга',
        image: '',
        type: ''
    },
    {
        name: 'Рамен',
        image: '',
        type: ''
    },
    {
        name: 'Пицца',
        image: '',
        type: ''
    },
    {
        name: 'Бууз',
        image: '',
        type: ''
    },
    {
        name: 'Хуушуур',
        image: '',
        type: ''
    },
    {
        name: 'Өндөгтэй хуурга',
        image: '',
        type: ''
    },
    {
        name: 'Шарсан мах',
        image: '',
        type: ''
    },
    {
        name: 'Тахиа',
        image: '',
        type: ''
    },
    {
        name: 'Үхэр',
        image: '',
        type: ''
    },
    {
        name: 'Гахай',
        image: '',
        type: ''
    },
]

const Foods = () => {
  return (
    <div className='flex w-[1440px] mx-auto gap-5'>
        {
            data && data.map((el, index) => {
                return (
                    <div className='flex w-[1440px]' key={index}>
                        <h1>{el.name}</h1>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Foods
