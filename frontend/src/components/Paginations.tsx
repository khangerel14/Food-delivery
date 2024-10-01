"use client";

import { useRouter } from "next/navigation";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useContext } from "react";
import { StoreContext } from "@/context/StoreContext";

export const Paginations = ({
  currentPage,
  limit,
  totalItems,
}: {
  currentPage: number;
  limit: number;
  totalItems: number;
}) => {
  const { categoryId, setCurrentPage, currentPageDef }: any =
    useContext(StoreContext);
  const router = useRouter();
  const totalPages = Math.ceil(totalItems / limit);

  const handlePrev = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      router.push(
        `?page=${currentPage - 1}&limit=${limit}${
          categoryId ? `&categoryId=${categoryId}` : ""
        }`
      );
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      router.push(
        `?page=${currentPage + 1}&limit=${limit}${
          categoryId ? `&categoryId=${categoryId}` : ""
        }`
      );
    }
  };

  return (
    <div className="flex items-center gap-5 pb-7">
      <button
        onClick={handlePrev}
        disabled={currentPage <= 1}
        className={`rounded-sm px-14 p-3 text-center bg-slate-500 ${
          currentPage <= 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <ChevronLeftIcon />
      </button>

      <span>
        {currentPage} / {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        className={`rounded-sm px-14 p-3 text-center bg-slate-500 ${
          currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
};
