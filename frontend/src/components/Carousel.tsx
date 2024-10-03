import { Food } from "@/images";

export const Carousel = () => {
  return (
    <div className="flex items-center w-full h-[600px] pt-32 max-xl:pl-12 max-md:pl-0">
      <div className="flex justify-between w-[1280px] mx-auto items-center">
        <div className="flex flex-col gap-5 mx-auto w-[550px] max-md:text-center max-sm:w-[300px]">
          <h1 className="font-bold text-7xl text-[#626567] max-sm:text-5xl">
            <span className="text-[#85BB65] pr-3">Welcome</span>
            to the World of Taste & Fresh food
          </h1>
          <div className="w-full h-1 bg-[#85BB65] rounded-full"></div>
          <p className="text-xl font-normal text-[#626567]">
            People who love to eat are always the best people
          </p>
        </div>
        <div className="pr-10 max-md:hidden">
          <Food />
        </div>
      </div>
    </div>
  );
};
