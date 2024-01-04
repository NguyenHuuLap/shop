import httpStatus from "http-status";
import categoryService from "../../use-cases/category.service.js";
import responseUtil from "../../utils/response.util.js";

export const getAll = async (req, res, next) => {
  try {
    let categories = await categoryService.getAll();
    res.json(categories);
  } catch (err) {
    res.json({
      message: err.message,
      error: err,
    });
    next(err);
  }
};

export const getAllByAdmin = async (req, res, next) => {
  try {
    let categories = await categoryService.getAllByAdmin();
    res.json(categories);
  } catch (err) {
    res.json({
      message: err.message,
      error: err,
    });
    next(err);
  }
};

export const getOne = async (req, res, next) => {
  try {
    let category = await categoryService.getOneByIdentify(
      req.params.categoryId,
    );
    if (category)
      responseUtil.response(
        res,
        httpStatus.OK,
        `Get category ${req.params.categoryId} success`,
        category,
      );
    else
      responseUtil.response(
        res,
        httpStatus.NOT_FOUND,
        `There are no category ${req.params.categoryId}`,
      );
  } catch (err) {
    next(err);
  }
};

export const add = async (req, res, next) => {
  try {
    const newCategory = await categoryService.add(
      req.body,
      "657b14baddd65e66b4383901",
    );
    res.json(newCategory);
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
    const updateCategory = await categoryService.update(
      req.params.categoryId,
      req.body,
    );
    res.json(updateCategory);
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
    const removeCategory = await categoryService.remove(req.params.categoryId);
    res.json(removeCategory);
  } catch (err) {
    res.json({
      message: err.message,
      error: err,
    });
    next(err);
  }
};

export const softDelete = async (req, res, next) => {
  try {
    const softDeletedCategory = await categoryService.softDelete(
      req.params.categoryId,
    );
    if (softDeletedCategory)
      if (softDeletedCategory.isDelete)
        responseUtil.response(
          res,
          httpStatus.OK,
          `Soft delete category ${req.params.categoryId} success`,
          softDeletedCategory,
        );
      else
        responseUtil.response(
          res,
          httpStatus.OK,
          `Undo soft delete category ${req.params.categoryId} success`,
          softDeletedCategory,
        );
    else
      responseUtil.response(
        res,
        httpStatus.NOT_FOUND,
        `There are no category ${req.params.categoryId}`,
      );
  } catch (err) {
    next(err);
  }
};
