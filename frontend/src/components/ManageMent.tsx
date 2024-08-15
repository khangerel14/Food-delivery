import { data } from '../utils/ManageData'

export const ManageMent = () => {
  return (
    <div className='flex justify-between items-center w-[1440px] mx-auto my-32'>
        { data && data.map((e, index) => {
            return (
                <button className='flex flex-col gap-8 p-4 border-2 rounded-lg shadow-lg' key={index}>
                    <div className='p-2'>{e.icon}</div>
                    <div>
                        <h1>{e.title}</h1>
                        <p>{e.desc}</p>
                    </div>
                </button>
            )
        })}
    </div>
  )
}