import jwt from "jsonwebtoken";
import { JWT, REGEX } from "../constants.js";
import stringformatUtils from "./stringformat.utils.js";

const key = JWT.SECRET_KEY;
const options = JWT.OPTIONS;

const genToken = (payload) => jwt.sign(payload, key, options);

const checkFormatToken = (token) => stringformatUtils.isToken(token);

const getTokenFromHeader = (token) => token.match(REGEX.TOKEN)[0].split(" ")[1];

const verifyToken = (token) => jwt.verify(token, key);

const decodedToken = (token) => jwt.decode(token, { complete: true });

export default {
  genToken,
  checkFormatToken,
  getTokenFromHeader,
  verifyToken,
  decodedToken,
};
