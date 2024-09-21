import { Carousel, Card, Footer, ManageMent, Navbar } from "@/components";
import StoreContextProvider from "@/context/StoreContext";

export default function Home() {
  return (
    <StoreContextProvider>
      <Navbar />
      <Carousel />
      <ManageMent />
      <Card />
      <Footer />
    </StoreContextProvider>
  );
}
