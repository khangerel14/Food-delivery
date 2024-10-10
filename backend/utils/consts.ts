// Тогтмолууд

export const enum HTTP_STATUS_CODES {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
}

//status
export const enum STATUS {
  ACTIVE = "active",
  INACTIVE = "inactive",
  DELETED = "deleted",
}

export const enum STATUS_FILTER {
  ALL = "all",
  ACTIVE = "active",
  INACTIVE = "inactive",
  DELETED = "deleted",
}

export const STATUS_ENUM: STATUS[] = [
  STATUS.ACTIVE,
  STATUS.INACTIVE,
  STATUS.DELETED,
];

//role
export const enum ROLES {
  ADMIN = "admin",
  USER = "user",
}

export const ROLES_ENUM: ROLES[] = [ROLES.ADMIN, ROLES.USER];

//хүйс
export const enum GENDER {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export const GENDER_ENUM = [GENDER.MALE, GENDER.FEMALE, GENDER.OTHER];

export const enum ACTION_TYPE {
  CREATE = "create",
  UPDATE = "update",
  VERIFY = "verify",
  LOGIN = "login",
}

// invoice
export enum INVOICE_STATUS {
  PAID = "paid",
  NOT_PAID = "not_paid",
  PENDING = "pending",
}

export enum INVOICE_STATUS_FILTER {
  ALL = "all",
  PAID = "paid",
  NOT_PAID = "not_paid",
  PENDING = "pending",
  EXPIRED = "expired",
}

export const INVOICE_STATUS_ENUM = [
  INVOICE_STATUS.PAID,
  INVOICE_STATUS.NOT_PAID,
  INVOICE_STATUS.PENDING,
];

// order
export enum ORDER_STATUS {
  BASKET = "basket",
  CANCELLED = "cancelled",
  VERIFIED = "verified",
  PAID = "paid",
}

export const ORDER_STATUS_ENUM = [
  ORDER_STATUS.BASKET,
  ORDER_STATUS.CANCELLED,
  ORDER_STATUS.VERIFIED,
  ORDER_STATUS.PAID,
];

export enum PAY_TYPES {
  QPAY = "qpay",
}

export enum PAY_TYPES_FILTER {
  ALL = "all",
  QPAY = "qpay",
}

export enum QPAY_INVOICE_STATUS {
  OPEN = "OPEN",
  PAID = "PAID",
}

/***
 * Qpay
 */

export enum QPAY_URLS {
  LOGIN = "v2/auth/token",
  CREATE_INVOICE = "v2/invoice",
  CHECK_INVOICE = "v2/payment/check",
  BASE_URL = "https://merchant-sandbox.qpay.mn",
}

export enum QPAY_LIMIT {
  MIN = 10,
}
