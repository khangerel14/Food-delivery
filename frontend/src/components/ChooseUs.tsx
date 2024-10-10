const mock = [
  {
    img: "https://red-onion-restaurant-41dbe.web.app/assets/Image/adult-blur-blurred-background-687824.png",
    name: "Fast Delivery",
    icon: "https://red-onion-restaurant-41dbe.web.app/assets/ICON/Group%20204.png",
    desc: "Keep your systems in sync with automated web hook bases notifications each tume.",
  },
  {
    img: "https://red-onion-restaurant-41dbe.web.app/assets/Image/chef-cook-food-33614.png",
    name: "A Good Auto Responder",
    icon: "https://red-onion-restaurant-41dbe.web.app/assets/ICON/Group%201133.png",
    desc: "Keep your systems in sync with automated web hook bases notifications each tume.",
  },
  {
    img: "https://red-onion-restaurant-41dbe.web.app/assets/Image/architecture-building-city-2047397.png",
    name: "Home Delivery",
    icon: "https://red-onion-restaurant-41dbe.web.app/assets/ICON/Group%20245.png",
    desc: "Keep your systems in sync with automated web hook bases notifications each tume.",
  },
];

export const ChooseUs = () => {
  return (
    <div className="flex flex-col w-[1230px] mx-auto py-20 max-xl:px-10 max-xl:w-full">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-medium">Why you choose us</h1>
        <p className="text-gray-500 w-[620px] max-md:w-full">
          Barton waited twenty always repair in within we do. AN delighted
          offending curiosity my is dashwoods at. Boy prosperous increasing
          surrounded.
        </p>
      </div>
      <div className="flex items-center w-[1200px] mx-auto justify-between max-xl:flex-wrap max-xl:w-full max-md:justify-center">
        {mock.map((elem: any, index: number) => {
          return (
            <div
              className="flex flex-col w-[360px] h-[500px] gap-7 p-4 transition duration-300 hover:scale-105 hover:shadow-lg rounded-lg ease-in-out"
              key={index}
            >
              <div className="w-[320px] overflow-hidden transition duration-300 ease-linear hover:scale-105 rounded-xl">
                <img
                  src={elem.img}
                  alt=""
                  width={320}
                  className="transition duration-300 ease-linear hover:scale-110 bg-cover"
                />
              </div>

              <div className="flex gap-5 justify-between h-10">
                <img src={elem.icon} alt="" width={45} height={2} />
                <div className="flex flex-col items-start gap-3">
                  <h1 className="text-lg font-medium">{elem.name}</h1>
                  <p className="text-gray-600">{elem.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
