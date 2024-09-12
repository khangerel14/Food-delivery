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
    <div className="flex flex-col justify-center items-center h-[500px] gap-6 max-w-screen-xl">
      <div className="flex items-center flex-col max-w-screen-xl mx-auto">
        {mockData.map((elem: any, index: number) => {
          return (
            <Table className="mx-auto" key={index}>
              <TableHeader>
                <TableRow className="w-full">
                  <TableHead className="w-[200px] text-center">
                    Бүтээгдэхүүн
                  </TableHead>
                  <TableHead className="w-[200px]">Нэр</TableHead>
                  <TableHead className="w-[200px]">Үнэ</TableHead>
                  <TableHead className="w-[200px]">Тоо ширхэг</TableHead>
                  <TableHead className="w-[200px]">Тоо Нийт</TableHead>
                  <TableHead className="w-[200px] text-center">
                    Устгах
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="flex justify-center rounded-md">
                    <img src={elem.img} height={80} width={100} />
                  </TableCell>
                  <TableCell className="text-start">{elem.name}</TableCell>
                  <TableCell className="text-start">{elem.price}</TableCell>
                  <TableCell className="text-start">{elem.qty}</TableCell>
                  <TableCell className="text-start">{elem.qty}</TableCell>
                  <TableCell className="text-center">
                    <DeleteIcon />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          );
        })}
      </div>
      <div>
        <h1>Төлбөр төлөх</h1>
        <p></p>
      </div>
    </div>
  );
};
