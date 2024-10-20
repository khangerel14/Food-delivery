import { useEffect, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

type InvoiceData = {
  invoice_id: string;
  qr_text: string;
  qr_image: string;
};

type Invoice = {
  data: InvoiceData;
};

export const InvoiceDisplay = () => {
  const [inv, setInv] = useState<Invoice | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedInv = localStorage.getItem("invoice");
    if (storedInv) {
      setInv(JSON.parse(storedInv));
    }
  }, []);

  if (!inv) {
    return <p>No invoice data available</p>;
  }

  const qrImg = inv.data?.qr_image;

  const back = () => {
    router.push("order", { scroll: false });
  };
  return (
    <div className="py-20 mx-auto flex flex-col items-center w-[1230px] max-xl:px-12 h-96 justify-center">
      <div className="flex justify-start w-[1230px]">
        <button className="flex items-center gap-2" onClick={back}>
          <KeyboardBackspaceIcon />
          back
        </button>
      </div>
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Qpay</DialogTitle>
            <DialogDescription>
              Scan below QR code from your bank application
            </DialogDescription>
            {qrImg && (
              <img src={`data:image/png;base64,${qrImg}`} alt="QR Code" />
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
