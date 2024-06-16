'use client';

import { Footer, GoogleMaps, NavbarUser, mapOptions } from "@/components"
import { useJsApiLoader } from '@react-google-maps/api';



const page = () => {
  const { isLoaded } = useJsApiLoader({
    id: mapOptions.googleMapApiKey,
    googleMapsApiKey: mapOptions.googleMapApiKey
  })
  return (
    <div>
      <NavbarUser />
      <GoogleMaps isLoaded={isLoaded}/>
      <Footer />
    </div>
  )
}

export default page
