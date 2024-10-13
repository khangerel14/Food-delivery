import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type InvoiceData = {
  invoice_id: string;
  qr_text: string;
  qr_image: string;
};

type Invoice = {
  data: InvoiceData;
};

const InvoiceDisplay = () => {
  const [inv, setInv] = useState<Invoice | null>(null);

  useEffect(() => {
    const storedInv = localStorage.getItem("invoice");
    if (storedInv) {
      setInv(JSON.parse(storedInv));
    }
  }, []);

  if (!inv) {
    return <p>No invoice data available</p>;
  }

  const qrImg = inv.data.qr_image;
  return (
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
  );
};

export default InvoiceDisplay;
