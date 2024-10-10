import { QPAY_INVOICE_STATUS } from "../consts";

export interface IQpayAuthResponse {
  token_type: string;
  refresh_expires_in: number;
  refresh_token: string;
  access_token: string;
  expires_in: number;
}

export interface IQpayCheckInvoice {
  invoice_status: QPAY_INVOICE_STATUS;
  id: string;
  amount: number;
}

export interface IQpayBodyCreateInvoice {
  invoice_code: string;
  sender_invoice_no: string;
  invoice_receiver_code: string;
  invoice_description: string;
  amount: number;
  callback_url: string;
}

export interface ICreateQpayInvoice {
  user_id: string;
  code: string;
  amount: number;
  invoice_id: string;
}
