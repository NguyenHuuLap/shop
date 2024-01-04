import httpStatus from "http-status";
import userService from "../../use-cases/user.service.js";
import responseUtil from "../../utils/response.util.js";

// **User
// *Get info of logged user
export const getOwnerUser = async (req, res, next) => {
  try {
    if (!req.user)
      responseUtil.response(res, httpStatus.UNAUTHORIZED, `User need login`);
    let user = await userService.getOneByIdentity(req.user.email);
    if (user)
      responseUtil.response(
        res,
        httpStatus.OK,
        `Get user ${user.email} success`,
        users,
      );
    else
      responseUtil.response(
        res,
        httpStatus.NOT_FOUND,
        `There are no user with email ${user.email}`,
      );
  } catch (err) {
    next(err);
  }
};

// *Update info of logged user
export const updateByUser = async (req, res, next) => {
  try {
    if (!req.user)
      responseUtil.response(res, httpStatus.UNAUTHORIZED, `User need login`);
    let user = await userService.update(req.user.email, req.body);
    if (user)
      responseUtil.response(
        res,
        httpStatus.OK,
        `Update user ${user.email} success`,
        users,
      );
    else responseUtil.response(res, httpStatus.NOT_FOUND, `User cannot update`);
  } catch (err) {
    next(err);
  }
};

// *Update password of logged user
export const changePasswordByUser = async (req, res, next) => {
  try {
    if (!req.user)
      responseUtil.response(res, httpStatus.UNAUTHORIZED, `User need login`);
    let user = await userService.changePassword(
      req.user.email,
      req.body.oldPassword,
      req.body.newPassword,
    );
    if (user)
      responseUtil.response(
        res,
        httpStatus.OK,
        `Update password of user ${user.email} success`,
        users,
      );
    else responseUtil.response(res, httpStatus.NOT_FOUND, `User cannot update`);
  } catch (err) {
    next(err);
  }
};

// *Check email exist

export const isExistEmail = async (req, res, next) => {
  try {
    let result = await userService.isExistEmail(req.body.email);
    let resultStr = `${req.body.email} is `;
    if (result) resultStr += `exist`;
    else resultStr += `not exist`;
    responseUtil.response(res, httpStatus.OK, resultStr, result);
  } catch (err) {
    next(err);
  }
};

// *Check phone exist

export const isExistPhone = async (req, res, next) => {
  try {
    let result = await userService.isExistPhone(req.body.phone);
    let resultStr = `${req.body.phone} is `;
    if (result) resultStr += `exist`;
    else resultStr += `not exist`;
    responseUtil.response(res, httpStatus.OK, resultStr, result);
  } catch (err) {
    next(err);
  }
};

// *Get address
export const getListAdress = async (req, res, next) => {};

// *Get address
export const getOneAdress = async (req, res, next) => {};

// *Get address
export const updateAddress = async (req, res, next) => {};

export const deleteAddress = async (req, res, next) => {};

export const setDefaultAddress = async (req, res, next) => {};

export const getAll = async (req, res, next) => {
  try {
    let users = await userService.getAll();
    if (users.length > 0 && users)
      responseUtil.response(res, httpStatus.OK, `Get all user`, users);
    else responseUtil.response(res, httpStatus.NOT_FOUND, `There are no user`);
  } catch (err) {
    next(err);
  }
};

export const add = async (req, res, next) => {
  try {
    const newUser = await userService.add(req.body);
    res.json(newUser);
  } catch (err) {
    res.json({
      message: err.message,
      error: err,
    });
    next(err);
  }
};

export const getByRole = async (req, res, next) => {
  try {
    const users = await userService.getByRole(req.body.role);
    if (users.length > 0 && users)
      responseUtil.response(
        res,
        httpStatus.OK,
        `Get all ${req.body.role} user`,
        users,
      );
    else
      responseUtil.response(
        res,
        httpStatus.NOT_FOUND,
        `There are no ${req.body.role} user`,
      );
  } catch (err) {
    next(err);
  }
};

export const getOneByIdentity = async (req, res, next) => {
  try {
    const user = await userService.getOneByIdentity(req.params.identity);
    res.json(user);
  } catch (err) {
    res.json({
      message: err.message,
      error: err,
    });
    next(err);
  }
};
export const getOneByOwner = async (req, res, next) => {
  try {
    const user = await userService.getOneByIdentity(req.user._id);
    res.json(user);
  } catch (err) {
    res.json({
      message: err.message,
      error: err,
    });
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const updatedUser = await userService.update(req.params.userId, req.body);
    res.json(updatedUser);
  } catch (err) {
    res.json({
      message: err.message,
      error: err,
    });
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    const updatedUser = await userService.remove(req.params.identity);
    res.json(updatedUser);
  } catch (err) {
    res.json({
      message: err.message,
      error: err,
    });
    next(err);
  }
};
