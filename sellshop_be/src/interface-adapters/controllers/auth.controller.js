import httpStatus from "http-status";
import authService from "../../use-cases/auth.service.js";
import responseUtil from "../../utils/response.util.js";
import SendEmailVertify from "../../utils/sendemailvetify.utils.js";

export const login = async (req, res, next) => {
  try {
    const result = await authService.authenticate(
      req.body.email,
      req.body.password,
    );
    if (result.token != null) {
      res.status(200).json({ message: 'Đăng nhập thành công', token: result.token });
    } else {
      res.status(500).json({ message: `login fail` });
    }
  } catch (err) {
    next(err);
  }
};

export const activeUser = async (req, res, next) => {
  try {
    const result = await authService.activeUser(
      req.query.email);
    if (result) {
      res.status(200).json({ message: 'Xác nhận thành công' });
    } else {
      res.status(500).json({ message: `Xác nhận thất bại` });
    }
  } catch (err) {
    next(err);
  }
};

export const sendOTP = async (req, res, next) => {
  try {
    const result = await SendEmailVertify(
      req.query.email);
    if (result) {
      res.status(200).json({ message: 'Gửi mã OTP thành công!', otp: result });
    } else {
      res.status(500).json({ message: `Gửi thất bại` });
    }
  } catch (err) {
    next(err);
  }
};

export const register = async (req, res, next) => {
  try {
    const data = await authService.register(
      req.body.email,
      req.body.password,
      req.body.confirmPassword,
      req.body,
    );

    if (data) {
      res
        .status(200)
        .json({ message: "Bạn đã đăng ký tài khoản thành công", data });
    } else {
      res.status(500).json({ message: "đã có lỗi xảy ra" });
    }
  } catch (err) {
    next(err);
  }
};
export const changePassword = async (req, res, next) => {
  try {
    const { userId, oldPassword, newPassword, confirmNewPassword } = req.body;
    const changePassword = await authService.changePassword(
      userId,
      oldPassword,
      newPassword,
      confirmNewPassword,
    );
    if (changePassword) {
      res.status(200).json({ message: "Đổi mật khẩu thành công" });
    } else {
      res.status(500).json({ message: "đã có lỗi khi đổi mật khẩu" });
    }
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email, newPassword } = req.body;
    const result = await authService.forgotPassword(
      email,
      newPassword
    );
    if (result) {
      res.status(200).json({ message: "Đổi mật khẩu thành công" });
    } else {
      res.status(500).json({ message: "đã có lỗi khi đổi mật khẩu" });
    }
  } catch (err) {
    next(err);
  }
};

export const confirmActive = async (req, res, next) => {
  try {
    const checkActive = await authService.allowActive(req.params.userId, req.params.tokenactive);
    if (checkActive) {
      res.status(200).json({ message: 'Bạn đã xác thực thành công' })
    }
  } catch (err) {
    next(err);
  }
}

export const updateProfile = async (req, res, next) => {
  try {
    const updatUser = await authService.updateProfile(
      req.params.userId,
      req.body,
    );
    if (updatUser) {
      res
        .status(200)
        .json({
          message: "Bạn đã cập nhật thông tin thành công",
          data: updatUser,
        });
    } else {
      res.status(500).json({ message: "Đã có lỗi xảy ra" });
    }
  } catch (err) {
    next(err);
  }
};

export const loginWithGoogle = async (req, res, next) => {
  try {
    const result = await authService.authenticateWithGoogle(req.user);
    res.cookie("token", result.token);
    res.redirect("http://localhost:3000/");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const logout = async (req, res, next) => { };
