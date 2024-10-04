import { data } from "../utils/ManageData";

export const ManageMent = () => {
  return (
    <div className="flex justify-between items-center max-w-screen-xl mx-auto my-32 max-xl:px-12 max-md:flex-wrap gap-5 max-md:justify-center">
      {data &&
        data.map((e, index) => {
          return (
            <button
              className="flex flex-col gap-8 p-4 border-gray-400 border-2 rounded-lg shadow-lg max-md:w-[260px] max-sm:w-[360px]"
              key={index}
            >
              <div className="p-2">{e.icon}</div>
              <div>
                <h1>{e.title}</h1>
                <p>{e.desc}</p>
              </div>
            </button>
          );
        })}
    </div>
  );
};
