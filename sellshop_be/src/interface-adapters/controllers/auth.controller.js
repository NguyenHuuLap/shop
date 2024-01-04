import httpStatus from "http-status";
import authService from "../../use-cases/auth.service.js";
import responseUtil from "../../utils/response.util.js";

export const login = async (req, res, next) => {
  try {
    const result = await authService.authenticate(
      req.body.email,
      req.body.password,
    );
    if (result.token !=null) {
      res.status(200).json({message: 'Đăng nhập thành công', token: result.token});
    } else {
      res.status(500).json({ message: `login fail`});
    }
  } catch (err) {
    next(err);
  }
};

export const register = async (req, res, next) => {
  try {
    const newUser = await authService.register(
      req.body.email,
      req.body.password,
      req.body.confirmPassword,
      req.body,
    );
    if (newUser) {
      res
        .status(200)
        .json({ message: "Bạn đã đăng ký tài khoản thành công", newUser });
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

export const confirmActive = async(req,res,next) => {
  try{
    const checkActive = await authService.allowActive(req.params.userId, req.params.tokenactive);
    if(checkActive){
      res.status(200).json({message: 'Bạn đã xác thực thành công'})
    }
  }catch(err){
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

export const logout = async (req, res, next) => {};
