import { Carousel, Foods, Footer, ManageMent, Navbar } from "@/components";
import StoreContextProvider from "@/context/StoreContext";

export default function Home() {
  return (
    <div>
      <StoreContextProvider>
        <Navbar />
      </StoreContextProvider>
      <Carousel />
      <ManageMent />
      <Foods />
      <Footer />
    </div>
  );
}
