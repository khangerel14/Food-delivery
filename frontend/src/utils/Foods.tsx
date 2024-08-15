import React from 'react'

const data = [
    {
        name: 'Будаатай хуурга',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl42MHBbf9mfrWOldWqKdwJ5SVSHIYzq1qPA&s',
        type: ''
    },
    {
        name: 'Рамен',
        image: 'https://olesiaguts.com/wp-content/uploads/2020/07/Chicken-miso-ramen.jpg',
        type: ''
    },
    {
        name: 'Пицца',
        image: 'https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRoeUqD7lgiXavof_C8DW2QeI-BHIzGPLKRPCWinurLGGMBT7GSml0le6bQro8yWjAa',
        type: ''
    },
    {
        name: 'Бууз',
        image: 'https://img.iamcook.ru/old/upl/recipes/misc/ae996ecfaf2e2b1347d183d8617e2c91-2016.jpg',
        type: ''
    },
    {
        name: 'Хуушуур',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJuSdO-laQa5oSoCTyyrJ_2yAEWnOjn58UwjFFKBds3xuMUbRyIHSzt0ICTAFyv4TmBtM&usqp=CAU',
        type: ''
    },
    {
        name: 'Өндөгтэй хуурга',
        image: 'https://www.khaanbuuz.mn/img/products/price/BRLP7322_2.jpg',
        type: ''
    },
    {
        name: 'Шарсан мах',
        image: 'https://media.caak.mn/cache/48/7a/487aa0e654d795447ff07d31bfbe3810.jpg',
        type: ''
    },
    {
        name: 'Тахиа',
        image: 'https://graph.caak.mn/rails/active_storage/disk/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDVG9JYTJWNVNTSWhlbkZ2TW5weWRXRnNZVEU0Y1dzNVp6aG5PWGh1YVhrM1p6Qmxhd1k2QmtWVU9oQmthWE53YjNOcGRHbHZia2tpQWFacGJteHBibVU3SUdacGJHVnVZVzFsUFNKR2FXeHNaWFJmUVhsaGJWOUhiM0psYm1kZlVtVnVlV0ZvWDJSbGJtZGhibDlOWVhsdmJtNWhhWE5sWDB0dmNHbGZNREF3TUhnd01EQXdYekF1YW5Cbklqc2dabWxzWlc1aGJXVXFQVlZVUmkwNEp5ZEdhV3hzWlhSZlFYbGhiVjlIYjNKbGJtZGZVbVZ1ZVdGb1gyUmxibWRoYmw5TllYbHZibTVoYVhObFgwdHZjR2xmTURBd01IZ3dNREF3WHpBdWFuQm5CanNHVkRvUlkyOXVkR1Z1ZEY5MGVYQmxTU0lQYVcxaFoyVXZhbkJsWndZN0JsUTZFWE5sY25acFkyVmZibUZ0WlRvS2JHOWpZV3c9IiwiZXhwIjoiMjAyNC0wOC0xNVQxNzoyOTo0Ny4xNTRaIiwicHVyIjoiYmxvYl9rZXkifX0=--f6143b14ab0ef921102f3efb62b5b77db957c52e/Fillet_Ayam_Goreng_Renyah_dengan_Mayonnaise_Kopi_0000x0000_0.jpg',
        type: ''
    },
    {
        name: 'Үхэрийн мах',
        image: 'https://news.xopom.com/content-mn/uploads/2019/05/XopoM.com-%D2%AE%D1%85%D1%80%D0%B8%D0%B9%D0%BD-%D0%BC%D0%B0%D1%85%D0%B0%D0%BD-%D0%B3%D1%83%D0%BB%D1%8F%D1%88-%D1%85%D0%B8%D0%B9%D1%85-%D0%B3%D0%B0%D0%B9%D1%85%D0%B0%D0%BB%D1%82%D0%B0%D0%B9-5-%D0%B6%D0%BE%D1%80-%D0%9C%D0%B0%D1%85-%D0%BD%D1%8C-%D2%AF%D0%BD%D1%8D%D1%85%D1%8D%D1%8D%D1%80-%D0%B7%D3%A9%D3%A9%D0%BB%D3%A9%D0%BD-%D0%B0%D0%BD%D1%85%D0%B8%D0%BB%D1%83%D1%83%D0%BD-%D0%B0%D0%BC%D1%82%D1%82%D0%B0%D0%B9-%D0%B1%D0%BE%D0%BB%D0%BD%D0%BE-06.jpg',
        type: ''
    },
    {
        name: 'Гахайн мах',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnisOLtFgCnNSKCynJgQuH87acPHgJPvARNQ&s',
        type: ''
    },
]

const Foods = () => {
  return (
    <div className='flex w-[1440px] mx-auto gap-20 h-96'>
        {
            data && data.map((el, index) => {
                return (
                    <div className='flex w-[1440px] flex-col h-full gap-3 items-center' key={index}>
                        <img src={el.image} alt="" className='w-20 h-20 rounded-md'/>
                        <h1>{el.name}</h1>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Foods
