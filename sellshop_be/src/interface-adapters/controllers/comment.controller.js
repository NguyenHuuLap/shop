import commentService from "../../use-cases/comment.service.js";
import httpStatus from "http-status";
import responseUtil from "../../utils/response.util.js";

export const getAll = async (req, res, next) => {
  try {
    let comments = await commentService.getAll();
    if (comments) responseUtil.response(res, httpStatus.OK, `Sucess`, comments);
    else responseUtil.response(res, httpStatus.NOT_FOUND, `Failed`);
  } catch (err) {
    next(err);
  }
};

export const getAllByAdmin = async (req, res, next) => {
  try {
    let comments = await commentService.getListByAdmin(null,null,null,null,null);
    if (comments) responseUtil.response(res, httpStatus.OK, `Sucess`, comments);
    else responseUtil.response(res, httpStatus.NOT_FOUND, `Failed`);
  } catch (err) {
    next(err);
  }
};

export const getByProduct = async (req, res, next) => {
  try {
    let comments = await commentService.getByProduct(
      req.params.productId,
      req.body || null,
      req.query.page,
      req.query.limit,
    );
    if (comments) responseUtil.response(res, httpStatus.OK, `Sucess`, comments);
    else responseUtil.response(res, httpStatus.NOT_FOUND, `Failed`);
  } catch (err) {
    next(err);
  }
};

export const getByUser = async (req, res, next) => {
  try {
    let comments = await commentService.getByUser(
      req.params.userId,
      req.body || null,
    );
    if (comments) responseUtil.response(res, httpStatus.OK, `Sucess`, comments);
    else responseUtil.response(res, httpStatus.NOT_FOUND, `Failed`);
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req, res, next) => {
  try {
    let comment = await commentService.getOne(req.params.commentId);
    if (comment) responseUtil.response(res, httpStatus.OK, `Sucess`, comment);
    else responseUtil.response(res, httpStatus.NOT_FOUND, `Failed`);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    let comment = await commentService.create(req.body, req.user._id);
    if (comment) responseUtil.response(res, httpStatus.OK, `Sucess`, comment);
    else responseUtil.response(res, httpStatus.NOT_FOUND, `Failed`);
  } catch (err) {
    next(err);
  }
};

export const createByAdmin = async (req, res, next) => {
  try {
    let comment = await commentService.createByAdmin(req.body);
    if (comment) responseUtil.response(res, httpStatus.OK, `Sucess`, comment);
    else responseUtil.response(res, httpStatus.NOT_FOUND, `Failed`);
  } catch (err) {
    next(err);
  }
};


export const update = async (req, res, next) => {
  try {
    let comment = await commentService.update(
      req.body,
      req.params.commentId,
      req.user._id,
    );
    if (comment) responseUtil.response(res, httpStatus.OK, `Sucess`, comment);
    else responseUtil.response(res, httpStatus.NOT_FOUND, `Failed`);
  } catch (err) {
    next(err);
  }
};

export const updateByAdmin = async (req, res, next) => {
  try {
    let comment = await commentService.updateByAdmin(
      req.body,
      req.params.commentId,
    );
    if (comment) responseUtil.response(res, httpStatus.OK, `Sucess`, comment);
    else responseUtil.response(res, httpStatus.NOT_FOUND, `Failed`);
  } catch (err) {
    next(err);
  }
};


export const softDelete = async (req, res, next) => {
  try {
    let comment = await commentService.softDelete(
      req.params.commentId,
      req.user._id,
    );
    if (comment) responseUtil.response(res, httpStatus.OK, `Sucess`, comment);
    else responseUtil.response(res, httpStatus.NOT_FOUND, `Failed`);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    let comment = await commentService.remove(
      req.params.commentId,
      req.user._id,
    );
    if (comment) responseUtil.response(res, httpStatus.OK, `Sucess`, comment);
    else responseUtil.response(res, httpStatus.NOT_FOUND, `Failed`);
  } catch (err) {
    next(err);
  }
};

export const removeByAdmin = async (req, res, next) => {
  try {
    let comment = await commentService.removeByAdmin(
      req.params.commentId,
    );
    if (comment) responseUtil.response(res, httpStatus.OK, `Sucess`, comment);
    else responseUtil.response(res, httpStatus.NOT_FOUND, `Failed`);
  } catch (err) {
    next(err);
  }
};

export const checkComment = async (req, res, next) => {
  try {
    let comment = await commentService.checkComment(
      req.user._id,
      req.params.orderId,
      req.params.productId
    );
    if (comment !== null || comment !== undefined) responseUtil.response(res, httpStatus.OK, `Sucess`, comment);
    else responseUtil.response(res, httpStatus.NOT_FOUND, `Failed`);
  } catch (err) {
    next(err);
  }
};
