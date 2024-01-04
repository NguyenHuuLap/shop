import { REGEX } from "../constants.js";

const isUUID = (_id) => REGEX.UUID.test(_id);
const isEmail = (email) => REGEX.EMAIL.test(email);
const isPhone = (phone) => REGEX.PHONE.test(phone);
const isToken = (token) => REGEX.TOKEN.test(token);

export default {
  isUUID,
  isEmail,
  isPhone,
  isToken,
};
