"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export const Paginations = ({ foodValue }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "4", 10);

  const handlePrev = () => {
    if (page > 1) {
      router.push(`?page=${page - 1}&limit=${limit}`);
    }
  };

  const handleNext = () => {
    router.push(`?page=${page + 1}&limit=${limit}`);
  };

  return (
    <div className="flex items-center gap-5 pb-7">
      {foodValue ? (
        <>
          <button
            onClick={handlePrev}
            disabled={page <= 1}
            className={`rounded-sm px-14 p-3 text-center bg-slate-500 ${
              page <= 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <ChevronLeftIcon />
          </button>
          {page} / {Math.ceil(28 / Number(limit))}
          <button
            onClick={handleNext}
            className={`rounded-sm px-14 p-3 text-center bg-slate-500 ${
              foodValue.length < limit ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <ChevronRightIcon />
          </button>
        </>
      ) : (
        <div>No Data Available</div>
      )}
    </div>
  );
};
