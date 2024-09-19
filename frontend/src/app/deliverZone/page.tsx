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
    <StoreContextProvider>
      <Navbar />
      <GoogleMaps isLoaded={isLoaded} />
      <Footer />
    </StoreContextProvider>
  );
};

export default Page;
