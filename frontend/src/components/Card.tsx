import StarIcon from "@mui/icons-material/Star";

export const Card = ({ mock }: any) => {
  return (
    <div className="flex flex-wrap justify-between rounded-xl py-10">
      {mock &&
        mock.map((elem: any, index: number) => {
          return (
            <div
              className="flex flex-col border border-gray-400 mb-10 w-[280px] rounded-xl"
              key={index}
            >
              <div className="relative">
                <img
                  src={elem.img}
                  alt="picture"
                  className="rounded-t-xl"
                  height={180}
                  width={280}
                />
                <div className="absolute flex top-2 right-2 bg-white rounded-full text-center px-2 z-20">
                  <StarIcon sx={{ color: "#ffff00" }} />
                  <p>4.5</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-3">
                <h1 className="font-semibold">{elem.name}</h1>
                <p>{elem.desc}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-gray-600">Үнэ:</h1>
                    <p className="font-semibold">{elem.price}</p>
                  </div>
                  <button className="p-2 px-3 rounded-full flex items-center justify-center bg-[#85BB65]">
                    Сагслах
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};