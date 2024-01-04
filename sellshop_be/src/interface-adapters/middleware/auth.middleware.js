import { COMMON_ERROR, USER } from "../../constants.js";
import userService from "../../use-cases/user.service.js";
import { ApplicationError } from "../../utils/error.util.js";
import jwtUtil from "../../utils/jwt.util.js";

const jwtAuth = (req, _, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) return next(new ApplicationError(COMMON_ERROR.UNAUTHORIZED));

  if (jwtUtil.checkFormatToken(token))
    token = jwtUtil.getTokenFromHeader(token);
  else return next(new ApplicationError(COMMON_ERROR.BAD_REQUEST));

  const decoded = jwtUtil.verifyToken(token);
  if (!decoded) {
    return next();
  }
  req.user = decoded;
  next();
};

function authorized(role = null) {
  return [
    jwtAuth,
    async (req, res, next) => {
      const user = await userService.getOneByIdentity(req.user._id);
      if (!user) return next(new ApplicationError(COMMON_ERROR.UNAUTHORIZED));
      if (role && !role.includes(user.role))
        return next(new ApplicationError(COMMON_ERROR.FORBIDDEN));
      req.user.role = user.role;
      next();
    },
  ];
}

export const isAuthorized = authorized();
export const isCustomer = authorized(USER.ROLE.CUSTOMER);
export const isStaff = authorized(USER.ROLE.STAFF);
export const isAdmin = authorized(USER.ROLE.ADMIN);
export const isAdminOrStaff = authorized([USER.ROLE.ADMIN, USER.ROLE.STAFF]);

export default {
  jwtAuth,
  authorized,
  isAuthorized,
  isCustomer,
  isStaff,
  isAdmin,
  isAdminOrStaff,
};
