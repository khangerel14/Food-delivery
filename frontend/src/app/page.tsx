import { Carousel, Foods, Footer, ManageMent, Navbar } from "@/components";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Carousel />
      <ManageMent />
      <Foods />
      <Footer />
    </div>
  );
}
