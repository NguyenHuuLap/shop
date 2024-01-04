import { ApplicationError } from "./utils/error.util.js";

export const USER = {
  ROLE: {
    ADMIN: "admin",
    STAFF: "staff",
    CUSTOMER: "customer",
  },
  STATUS: {
    ACTIVE: "active",
    INACTIVE: "inactive",
    LOCKED: "locked",
  },
};

export const ORDER = {
  STATUS: {
    PENDING: "pending", // order created, waiting for confirm by admin or staff
    CONFIRMED: "confirmed", // order confirmed by admin or staff
    SHIPPING: "shipping", // order has been picked up by staff and is being shipped
    COMPLETED: "completed", // order has been delivered
    CANCELLED: "cancelled", // order has been cancelled
  },
  PAYMENT_STATUS: {
    PENDING: 'pending',       // payment is pending
    PAID: 'paid',             // payment has been made
    CANCELLED: 'cancelled'    // payment has been cancelled
  },
  PAYMENT_METHOD: {
    CASH: 'cash',             // paid at store
    COD: 'cod',               // paid at delivery (cash on delivery)
    VNPAY: 'vnpay',           // paid by VNPAY
  },
};

export const DISCOUNT_CONS = {
  TYPE: {
    PERCENT: "percent",
    PRICE: "price",
  },
};

export const REGEX = {
  UUID: /^[0-9a-fA-F]{24}$/,
  PHONE: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
  EMAIL:
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  TOKEN: /Bearer\s([\w-]*\.[\w-]*\.[\w-]*$)/g,
};

export const JWT = {
  SECRET_KEY:
    "jasfhashgasohgasoighasjgjlashglaslklasngnasngasgnasngasngnklasngkasnkg",
  OPTIONS: {
    expiresIn: "72h",
    algorithm: "HS256",
  },
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_AUTHOR: 203,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHOR: 401,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  INTERNAL_SEVER_ERROR: 500,
};

export const COMMON_ERROR = {
  UNKNOWN_ERROR: {
    type: ApplicationError.type.APP_ERROR,
    code: "UNKNOWN_ERROR",
    message: "Unknown error",
    statusCode: 500,
  },
  BAD_REQUEST: {
    type: ApplicationError.type.NETWORK,
    code: "BAD_REQUEST",
    message: "Bad request",
    statusCode: 400,
  },
  UNAUTHORIZED: {
    type: ApplicationError.type.NETWORK,
    code: "UNAUTHORIZED",
    message: "Unauthorized",
    statusCode: 401,
  },
  FORBIDDEN: {
    type: ApplicationError.type.NETWORK,
    code: "FORBIDDEN",
    message: "Forbidden",
    statusCode: 403,
  },
  RESOURCE_NOT_FOUND: {
    type: ApplicationError.type.NETWORK,
    code: "RESOURCE_NOT_FOUND",
    message: "Resource not found",
    statusCode: 404,
  },
  INTERNAL_SERVER_ERROR: {
    type: ApplicationError.type.NETWORK,
    code: "INTERNAL_SERVER_ERROR",
    message: "Something went wrong, Please try again later.",
    statusCode: 500,
  },
  BAD_GATEWAY: {
    type: ApplicationError.type.NETWORK,
    code: "BAD_GATEWAY",
    message: "Bad gateway",
    statusCode: 502,
  },
  SERVICE_UNAVAILABLE: {
    type: ApplicationError.type.NETWORK,
    code: "SERVICE_UNAVAILABLE",
    message: "Service unavailable",
    statusCode: 503,
  },
  GATEWAY_TIMEOUT: {
    type: ApplicationError.type.NETWORK,
    code: "GATEWAY_TIMEOUT",
    message: "Gateway timeout",
    statusCode: 504,
  },
};

export const allowImageMineTypes = [
  "image/bmp", // .bmp       - Windows OS/2 Bitmap Graphics
  "image/jpeg", // .jpeg .jpg - JPEG images
  "image/png", // ..png      - Portable Network Graphics
  "image/gif", // .gif       - Graphics Interchange Format (GIF)
  "image/tiff", // .tif .tiff - Tagged Image File Format (TIFF)
  "image/svg+xml", // .svg       - Scalable Vector Graphics (SVG)
  "image/vnd.microsoft.icon", // .ico       - Icon format
  "image/x-icon", // same above
];

export default {
  USER,
  ORDER,
  REGEX,
  DISCOUNT_CONS,
};
