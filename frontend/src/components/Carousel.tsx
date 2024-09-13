import { Food, White } from "@/images";

export const Carousel = () => {
  return (
    <div className="bg-[#18BA51] w-full h-[650px]">
      <div className="flex bg-cover relative justify-center items-center">
        <White />
        <div className="flex justify-between w-[1280px] absolute mx-auto">
          <div className="flex flex-col gap-5 mx-auto text-white w-[550px]">
            <h1 className="font-bold text-7xl">Pinecone Food delivery</h1>
            <hr />
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur
              rehv grieo natus eum, iste in nobis perferendis error eligendi
              magni possimus ex eos fugiat quae quod obcaecati sint ad optio
              ullam. Nihil.
            </p>
          </div>
          <div>
            <Food />
          </div>
        </div>
      </div>
    </div>
  );
};
