'use client';

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import AddIcon from '@mui/icons-material/Add';
import { green } from '@mui/material/colors';

export const GoogleMaps = ({ isLoaded }: any) => {
  const containerStyle = {
    width: '1440px',
    height: '500px'
  };
  
  const center = {
    lat: 46.8625,
    lng: 103.8467
  };

  return isLoaded && (
    <div className='flex flex-col items-center my-10'>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
      </GoogleMap>
      <div className='flex flex-col gap-10 items-start my-14 w-[1440px]'>
        <h1 className='flex gap-1 items-center font-semibold text-xl'><AddIcon sx={{ color: green[400]}}/>Хүргэлтийн бүс дэх хаягууд</h1>
        <div className='flex justify-between items-center w-full'>
          <div className='flex flex-col w-[300px] p-4'>
            <h1 className='border-2 border-solid border-b-green-500 pb-2 font-semibold'>А бүс</h1>
            <div className='flex justify-between items-center pt-2'>
              <div className='flex flex-col'>
                <button>Нархан хотхон</button>
                <button>Нархан хотхон</button>
                <button>Нархан хотхон</button>
                <button>Нархан хотхон</button>
                <button>Нархан хотхон</button>
              </div>
              <div className='flex flex-col'>
                <button>Нархан хотхон</button>
                <button>Нархан хотхон</button>
                <button>Нархан хотхон</button>
                <button>Нархан хотхон</button>
                <button>Нархан хотхон</button>
              </div>
            </div>
          </div>
          <div className='flex flex-col w-[300px] p-4'>
            <h1 className='border-2 border-solid border-b-green-500 pb-2 font-semibold'>Б бүс</h1>
            <div className='flex justify-between items-center pt-2'>
              <div className='flex flex-col'>
                <button>Нархан хотхон</button>
                <button>Нархан хотхон</button>
                <button>Нархан хотхон</button>
                <button>Нархан хотхон</button>
                <button>Нархан хотхон</button>
              </div>
              <div className='flex flex-col'>
                <button>Нархан хотхон</button>
                <button>Нархан хотхон</button>
                <button>Нархан хотхон</button>
                <button>Нархан хотхон</button>
                <button>Нархан хотхон</button>
              </div>
            </div>
          </div>
          <div className='flex flex-col w-[300px] p-4'>
            <h1 className='border-2 border-solid border-b-green-500 pb-2 font-semibold'>С бүс</h1>
            <div className='flex justify-between items-center pt-2'>
              <div className='flex flex-col'>
                <button>Нархан хотхон</button>
                <button>Нархан хотхон</button>
                <button>Нархан хотхон</button>
                <button>Нархан хотхон</button>
                <button>Нархан хотхон</button>
              </div>
              <div className='flex flex-col'>
                <button>Нархан хотхон</button>
                <button>Нархан хотхон</button>
                <button>Нархан хотхон</button>
                <button>Нархан хотхон</button>
                <button>Нархан хотхон</button>
              </div>
            </div>
          </div>
          <div className='flex flex-col w-[300px] p-4'>
            <h1 className='border-2 border-solid border-b-green-500 pb-2 font-semibold'>Д бүс</h1>
            <div className='flex justify-between items-center pt-2'>
              <div className='flex flex-col'>
                <button>Нархан хотхон</button>
                <button>Нархан хотхон</button>
                <button>Нархан хотхон</button>
                <button>Нархан хотхон</button>
                <button>Нархан хотхон</button>
              </div>
              <div className='flex flex-col'>
                <button>Нархан хотхон</button>
                <button>Нархан хотхон</button>
                <button>Нархан хотхон</button>
                <button>Нархан хотхон</button>
                <button>Нархан хотхон</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}