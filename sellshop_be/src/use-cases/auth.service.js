import { COMMON_ERROR } from "../constants.js";
import ApiErrorUtils from "../utils/ApiErrorUtils.js";
import encodedUtil from "../utils/encoded.util.js";
import { ApplicationError } from "../utils/error.util.js";
import jwtUtil from "../utils/jwt.util.js";
import SendEmailVertify from "../utils/sendemailvetify.utils.js";
import userService from "./user.service.js";

const authenticate = async (email, password) => {
  const user = await userService.getOneByIdentity(email);
  if (!user) throw ApiErrorUtils.simple('Tài khoản hoặc mật khẩu không đúng',400);
  if (!(await encodedUtil.comparePassword(password, user.hashpassword))){
     throw ApiErrorUtils.simple('Tài khoản hoặc mật khẩu không đúng',400);
  }
  if(user.status != 'active'){
    throw ApiErrorUtils.simple(`Vui lòng xác thực email bằng cách click vào link đã được gửi vào mail của bạn`,400);
  }
    
  const token = jwtUtil.genToken({ email: user.email, _id: user._id });
  return { token };
};

const updateProfile = async (id, data) => {
  const checkUser = await userService.getOneByIdentity(id);
  if (checkUser) {
    const checkName = await userService.checkName(
      data.firstname,
      data.lastname,
    );
    if (!checkName) {
      throw ApiErrorUtils.simple(`Họ và tên không chứa số và ký tự đặc biệt`);
    }
    const updateProfile = await userService.update(id, data);
    return updateProfile;
  }
};

const register = async (email, password, confirmPassword, data) => {
  const checkName = await userService.checkName(data.firstname, data.lastname);
  if (!checkName) {
    throw ApiErrorUtils.simple(`Họ và tên không chứa số và ký tự đặc biệt`);
  }

  if (password !== confirmPassword) {
    throw ApiErrorUtils.simple(`Mật khẩu và xác nhận mật khẩu không khớp`, 400);
  }
  const checkPassword = await userService.checkPassword(password);
  if (!checkPassword) {
    throw ApiErrorUtils.simple(
      `Mật khẩu phải chứa: 1 chữ thường, 1 in hoa, 1 chữ số, 1 ký tự đặc biệt và phải dài hơn 8 ký tự`,
    );
  }
  const checkEmail = await userService.isExistEmail(email);
  if (checkEmail) {
    throw ApiErrorUtils.simple(`Email đã tồn tại`, 400);
  } else {
    const confirmationToken = Math.random().toString(36).substring(2, 15);
    const hashPassword = await encodedUtil.encodedPassword(password);
    Object.assign(data, { hashpassword: hashPassword, tokenactive: confirmationToken  });
    const newUser = await userService.add(data);
    const sendemailvetify = await SendEmailVertify(email, newUser._id, confirmationToken);
    if(sendemailvetify){
      return newUser;
    }
  }
};


const allowActive = async(userId, tokenactive) => {
  const checkUser = await userService.getOneByIdentity(userId);
  if(checkUser.status === 'inactive'){
    if(checkUser.tokenactive === tokenactive){
      await userService.update(userId, {status: 'active'});
      return true;
    }else{
      throw ApiErrorUtils.simple('Đã có lỗi xảy ra khi xác thực');
    }
  }else if(checkUser.status === 'active'){
    return true
  }
}

const changePassword = async (
  userId,
  oldPassword,
  newPassword,
  confirmNewPassword,
) => {
  if (newPassword !== confirmNewPassword) {
    throw ApiErrorUtils.simple(`Mật khẩu và xác nhận mật khẩu không khớp`, 400);
  }
  const checkPassword = await userService.checkPassword(newPassword);
  if (!checkPassword) {
    throw ApiErrorUtils.simple(
      `Mật khẩu mới phải chứa: 1 chữ thường, 1 in hoa, 1 chữ số, 1 ký tự đặc biệt và phải dài hơn 8 ký tự`,
    );
  }
  const changePassword = await userService.changePassword(
    userId,
    oldPassword,
    newPassword,
  );
  return changePassword;
};

const authenticateWithGoogle = async (user) => {
  const token = jwtUtil.genToken({ email: user.email, _id: user._id });
  return { token };
};

export default {
  authenticate,
  updateProfile,
  authenticateWithGoogle,
  changePassword,
  register,
  allowActive
};
