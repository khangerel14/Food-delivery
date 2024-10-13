import dotenv from "dotenv";
import i18n from "i18n";

import { INVOICE_STATUS, QPAY_INVOICE_STATUS, QPAY_URLS } from "../consts.js";
import {
  ICreateQpayInvoice,
  IQpayAuthResponse,
  IQpayBodyCreateInvoice,
  IQpayCheckInvoice,
} from "../interface/Qpay";

dotenv.config();
const { QPAY_PASSWORD, QPAY_USERNAME, QPAY_CALLBACK, QPAY_INVOICE_CODE } =
  process.env;

export const getTokenQpay: () => Promise<string> =
  async (): Promise<string> => {
    try {
      const auth = `Basic ${Buffer.from(
        `${QPAY_USERNAME}:${QPAY_PASSWORD}`
      ).toString("base64")}`;

      const { access_token }: IQpayAuthResponse = await fetchData(
        auth,
        {},
        QPAY_URLS.LOGIN
      );

      return `Bearer ${access_token}`;
    } catch (err) {
      console.log(err, "get_token_qpay");
      return "";
    }
  };

export const createQpayInvoice = async (
  doc: ICreateQpayInvoice
): Promise<any> => {
  const { amount, user_id, code, invoice_id } = doc;
  const accessToken: string = await getTokenQpay();
  if (!QPAY_CALLBACK) throw new Error(i18n.__("error.not_fount.callback_url"));
  if (!QPAY_INVOICE_CODE)
    throw new Error(i18n.__("error.not_fount.qpay_invoice_code"));

  const body: IQpayBodyCreateInvoice = {
    invoice_code: QPAY_INVOICE_CODE,
    sender_invoice_no: invoice_id,
    invoice_receiver_code: user_id,
    invoice_description: code,
    amount: amount,
    callback_url: `${QPAY_CALLBACK}code=${code}&user_id=${user_id}`,
  };

  const response = await fetchData(accessToken, body, QPAY_URLS.CREATE_INVOICE);

  return response;
};

export const checkInvoiceQpay = async (
  invoice_id: string,
  status: INVOICE_STATUS
): Promise<INVOICE_STATUS> => {
  try {
    let invoiceStatus: INVOICE_STATUS = status;
    const accessToken: string = await getTokenQpay();
    const response: IQpayCheckInvoice = await fetchData(
      accessToken,
      { invoice_id },
      QPAY_URLS.CHECK_INVOICE
    );

    const { invoice_status } = response;
    if (invoice_status === QPAY_INVOICE_STATUS.PAID)
      invoiceStatus = INVOICE_STATUS.PAID;

    return invoiceStatus;
  } catch (err) {
    return status;
  }
};

export const fetchData = async (
  auth: string,
  data: any,
  url: QPAY_URLS
): Promise<any> => {
  let body: any = {};
  if (data) body = data;
  const response: any = await fetch(decodeURI(`${QPAY_URLS.BASE_URL}/${url}`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
      redirect: "follow",
    },
    body: JSON.stringify(body),
  })
    .then((response): Promise<any> => response.json())
    .then((data: any): any => {
      return data;
    })
    .catch((error: any): void => console.error(error));

  if (response.error) throw new Error(response.message);
  return response;
};
