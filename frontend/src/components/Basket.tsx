"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useContext, useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { StoreContext } from "@/context/StoreContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type CartItem = {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  qty: number;
};

export const Basket = () => {
  const router = useRouter();
  const {
    foodData,
    cartItems,
    removeFromCart,
    addToCart,
    deleteFromCart,
  }: any = useContext(StoreContext);

  const cartItemsArray = useMemo<CartItem[]>(() => {
    return Object.entries(cartItems)
      .map(([id, qty]) => {
        const foodItem = foodData.find((item: any) => item.id === id);
        return foodItem ? { ...foodItem, qty } : null;
      })
      .filter(Boolean) as CartItem[];
  }, [foodData, cartItems]);

  const totalPrice = cartItemsArray.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );
  const deliveryPrice = 2500;
  const grandTotal = totalPrice + deliveryPrice;

  const orderPage = () => {
    router.push("/order");
  };

  return (
    <div className="flex flex-col justify-center items-start gap-20 max-w-screen-xl mx-auto w-full py-20">
      <div className="flex items-center flex-col max-w-screen-xl mx-auto">
        <Table>
          <TableHeader>
            <TableRow className="w-full">
              <TableHead className="w-[260px] text-center">
                Бүтээгдэхүүн
              </TableHead>
              <TableHead className="w-[260px]">Нэр</TableHead>
              <TableHead className="w-[260px]">Үнэ</TableHead>
              <TableHead className="w-[230px]">Тоо ширхэг</TableHead>
              <TableHead className="w-[230px]">Нийт</TableHead>
              <TableHead className="w-[180px] text-center">Устгах</TableHead>
            </TableRow>
          </TableHeader>
          {cartItemsArray.length > 0 ? (
            <TableBody>
              {cartItemsArray.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="flex justify-center rounded-md">
                    <img
                      src={item.imgUrl}
                      height={100}
                      width={120}
                      alt={item.name}
                    />
                  </TableCell>
                  <TableCell className="text-start">{item.name}</TableCell>
                  <TableCell className="text-start">{item.price}₮</TableCell>
                  <TableCell className="text-start">
                    <button
                      className="mr-5"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove one ${item.name} from cart`}
                    >
                      <RemoveIcon />
                    </button>
                    {item.qty}
                    <button
                      className="ml-5"
                      onClick={() => addToCart(item.id)}
                      aria-label={`Add one ${item.name} to cart`}
                    >
                      <AddIcon />
                    </button>
                  </TableCell>
                  <TableCell className="text-start">
                    {item.qty * item.price}₮
                  </TableCell>
                  <TableCell
                    className="text-center cursor-pointer"
                    onClick={() => deleteFromCart(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <DeleteIcon />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  Сагс хоосон байна.
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </div>
      <div className="flex flex-col gap-6 w-[480px] h-fit">
        <h1 className="text-2xl font-semibold">Төлбөрийн мэдээлэл</h1>
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center h-8 border-b">
            <p>Мөнгөн дүн:</p>
            <p>{totalPrice}₮</p>
          </div>
          <div className="flex justify-between items-center h-8 border-b">
            <p>Хүргэлтийн үнэ:</p>
            <p>{deliveryPrice}₮</p>
          </div>
          <div className="flex justify-between items-center h-8 border-b font-semibold">
            <p>Нийт:</p>
            <p>{grandTotal}₮</p>
          </div>
        </div>
        <button
          className="w-64 p-3 text-center bg-[#48A860] rounded-xl text-white"
          onClick={orderPage}
        >
          Захиалга баталгаажуулах
        </button>
      </div>
    </div>
  );
};
