"use client";

import { useState } from "react";

export default function InvoicePage() {
  const [invoiceData, setInvoiceData] = useState(null);
  const [error, setError] = useState(null);

  const createInvoice = async () => {
    try {
      const response = await fetch("/api/create-invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invoice_code: "TEST_INVOICE",
          amount: 100,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setInvoiceData(data);
        setError(null);
      } else {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };

  return (
    <div>
      <button onClick={createInvoice}>Create Invoice</button>

      {invoiceData && (
        <div>
          Invoice created: <pre>{JSON.stringify(invoiceData, null, 2)}</pre>
        </div>
      )}

      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
