"use client";

import { Footer, GoogleMaps, Navbar, mapOptions } from "@/components";
import { useJsApiLoader } from "@react-google-maps/api";
import StoreContextProvider from "@/context/StoreContext";

const Page = () => {
  const { isLoaded } = useJsApiLoader({
    id: mapOptions.googleMapApiKey,
    googleMapsApiKey: mapOptions.googleMapApiKey,
  });
  return (
    <div>
      <StoreContextProvider>
        <Navbar />
      </StoreContextProvider>
      <GoogleMaps isLoaded={isLoaded} />
      <Footer />
    </div>
  );
};

export default Page;
