"use client";

import { useRouter, usePathname } from "next/navigation";
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
  const { isActive }: any = useContext(StoreContext);
  const path = usePathname();
  const router = useRouter();
  const totalPages = Math.ceil(totalItems / limit);

  const handlePrev = () => {
    if (currentPage > 1) {
      router.push(
        `?page=${currentPage - 1}&limit=${limit}&categoryId=${isActive}`
      );
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      router.push(
        `?page=${currentPage + 1}&limit=${limit}&categoryId=${isActive}`
      );
    }
  };

  return (
    <div className="flex items-center gap-5 pb-7">
      <button
        onClick={handlePrev}
        disabled={currentPage <= 1}
        className={`rounded-sm px-14 p-3 text-center bg-[#F91944] ${
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
        className={`rounded-sm px-14 p-3 text-center bg-[#F91944] ${
          currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
};
