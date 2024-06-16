export const Sign = () => {
  return (
    <div className="flex flex-col w-full items-center my-24 gap-10">
        <div className="font-bold text-2xl">
            <h1>Бүртгүүлэх</h1>
        </div>
        <div className="flex flex-col gap-5 w-96">
            <div className="flex flex-col gap-1">
                <h1>Нэр</h1>
                <input className='border rounded-sm h-8 p-5' placeholder='Нэрээ оруулна уу' type="text" name="" id="" />
            </div>
            <div className="flex flex-col gap-1">
                <h1>Е-мэйл</h1>
                <input className='border rounded-sm h-8 p-5' placeholder='Е-мэйл хаягаа оруулна уу' type="email" name="" id="" />
            </div>
            <div className="flex flex-col gap-1">
                <h1>Хаяг</h1>
                <input className='border rounded-sm h-8 p-5' placeholder='Та хаягаа оруулна уу' type="text" name="" id="" />
            </div>
            <div className="flex flex-col gap-1">
                <h1>Нууц үг</h1>
                <input className='border rounded-sm h-8 p-5' placeholder='Нууц үгээ оруулна уу' type="password" name="" id="" />
            </div>
            <div className="flex flex-col gap-1">
                <h1>Нууц үгээ давтах</h1>
                <input className='border rounded-sm h-8 p-5' placeholder='Нууц үгээ давтан оруулна уу' type="password" name="" id="" />
            </div>
        </div>
        <div className="flex flex-col gap-10 w-96">
            <div className="flex gap-3">
                <input className='border rounded-sm h-8' type="checkbox" />
                <p>Үйлчилгээний нөхцөо зөвшөөрөх</p>
            </div>
            <button className="border w-full bg-gray-100 p-3 text-gray-400 rounded-sm">Бүртгүүлэх</button>
        </div>
    </div>
  )
}