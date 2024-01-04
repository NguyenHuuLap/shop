import httpStatus from "http-status";
import errorUtil, { ApplicationError } from "../../utils/error.util.js";
import responseUtil from "../../utils/response.util.js";
import { COMMON_ERROR } from "../../constants.js";

const notFound = (req, res) => {
  const err = new ApplicationError(COMMON_ERROR.RESOURCE_NOT_FOUND);
  errorHandler(err, req, res);
};

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApplicationError)
    return responseUtil.response(
      res,
      err.statusCode,
      errorUtil.errorFormat(err),
    );
  return responseUtil.response(
    res,
    httpStatus.INTERNAL_SERVER_ERROR,
    err.message,
  );
};

export default {
  errorHandler,
  notFound,
};
