import DeleteIcon from "@mui/icons-material/Delete";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockData = [
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdp20o9NY1dVAsKfKqNUZs9XAIk5A0_ndo0A&s",
    name: "Cheese Burger",
    qty: "2",
    desc: "best cheeseburger, including homemade burger sauces. Quick and easy.",
    price: "15000₮",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdp20o9NY1dVAsKfKqNUZs9XAIk5A0_ndo0A&s",
    name: "Cheese Burger",
    qty: "2",
    desc: "best cheeseburger, including homemade burger sauces. Quick and easy.",
    price: "15000₮",
  },
];

export const Basket = () => {
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
              <TableHead className="w-[230px]">Тоо Нийт</TableHead>
              <TableHead className="w-[180px] text-center">Устгах</TableHead>
            </TableRow>
          </TableHeader>
          {mockData.map((elem: any, index: number) => {
            return (
              <TableBody key={index} className="border-b">
                <TableRow>
                  <TableCell className="flex justify-center rounded-md">
                    <img src={elem.img} height={100} width={120} />
                  </TableCell>
                  <TableCell className="text-start">{elem.name}</TableCell>
                  <TableCell className="text-start">{elem.price}</TableCell>
                  <TableCell className="text-start">{elem.qty}</TableCell>
                  <TableCell className="text-start">{elem.price}</TableCell>
                  <TableCell className="text-center">
                    <DeleteIcon />
                  </TableCell>
                </TableRow>
              </TableBody>
            );
          })}
        </Table>
      </div>
      <div className="flex flex-col gap-6 w-[480px] h-fit">
        <h1 className="text-2xl font-semibold">Төлбөрийн мэдээлэл</h1>
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center h-8 border-b">
            <p>Мөнгөн дүн:</p>
            <p>30000₮</p>
          </div>
          <div className="flex justify-between items-center h-8 border-b">
            <p>Хүргэлтийн үнэ:</p>
            <p>2500₮</p>
          </div>
          <div className="flex justify-between items-center h-8 border-b font-semibold">
            <p>Нийт:</p>
            <p>32500₮</p>
          </div>
        </div>
        <button className="w-64 p-3 text-center bg-[#48A860] rounded-xl text-white">
          Төлбөр төлөх
        </button>
      </div>
    </div>
  );
};
