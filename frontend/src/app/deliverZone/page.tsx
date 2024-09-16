"use client";

import { Footer, GoogleMaps, Navbar, mapOptions } from "@/components";
import { useJsApiLoader } from "@react-google-maps/api";

const Page = () => {
  const { isLoaded } = useJsApiLoader({
    id: mapOptions.googleMapApiKey,
    googleMapsApiKey: mapOptions.googleMapApiKey,
  });
  return (
    <div>
      <Navbar />
      <GoogleMaps isLoaded={isLoaded} />
      <Footer />
    </div>
  );
};

export default Page;
