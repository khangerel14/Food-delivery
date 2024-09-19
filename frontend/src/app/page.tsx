import { Carousel, Foods, Footer, ManageMent, Navbar } from "@/components";
import StoreContextProvider from "@/context/StoreContext";

export default function Home() {
  return (
    <StoreContextProvider>
      <div>
        <Navbar />
        <Carousel />
        <ManageMent />
        <Foods />
        <Footer />
      </div>
    </StoreContextProvider>
  );
}
