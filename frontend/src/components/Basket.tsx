"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState, useEffect, useContext } from "react";
import { StoreContext } from "@/context/StoreContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Basket = () => {
  const [cartItemsArray, setCartItemsArray] = useState<any[]>([]);
  const {
    foodData,
    cartItems,
    removeFromCart,
    addToCart,
    deleteFromCart,
  }: any = useContext(StoreContext);
  console.log("cart", cartItems);

  useEffect(() => {
    if (cartItems && foodData.length > 0) {
      try {
        const parsedItems =
          typeof cartItems === "string" ? JSON.parse(cartItems) : cartItems;

        const itemsArray = Object.entries(parsedItems)
          .map(([id, qty]) => {
            const foodItem = foodData.find(
              (item: any) => item.id === Number(id)
            );

            return foodItem ? { ...foodItem, qty } : null;
          })
          .filter(Boolean);

        setCartItemsArray(itemsArray);
      } catch (error) {
        console.error("Error parsing cartItems", error);
        setCartItemsArray([]);
      }
    }
  }, [foodData, cartItems]);

  const totalPrice = cartItemsArray.length
    ? cartItemsArray.reduce((acc, item) => acc + item.qty * item.price, 0)
    : 0;

  const deliveryPrice = 2500;
  const grandTotal = totalPrice + deliveryPrice;

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
            cartItemsArray.map((item: any, index: number) => (
              <TableBody key={index} className="border-b">
                <TableRow>
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
                    >
                      <RemoveIcon />
                    </button>
                    {item.qty}
                    <button className="ml-5" onClick={() => addToCart(item.id)}>
                      <AddIcon />
                    </button>
                  </TableCell>
                  <TableCell className="text-start">
                    {item.qty * item.price}₮
                  </TableCell>
                  <TableCell
                    className="text-center"
                    onClick={() => deleteFromCart(item.id)}
                  >
                    <DeleteIcon />
                  </TableCell>
                </TableRow>
              </TableBody>
            ))
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
        <button className="w-64 p-3 text-center bg-[#48A860] rounded-xl text-white">
          Төлбөр төлөх
        </button>
      </div>
    </div>
  );
};
