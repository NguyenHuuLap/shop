import brandService from "../../use-cases/brand.service.js";

export const getAll = async (req, res, next) => {
  try {
    let brands = await brandService.getAll();
    res.json(brands);
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
    let brands = await brandService.getAllByAdmin();
    res.json(brands);
  } catch (err) {
    res.json({
      message: err.message,
      error: err,
    });
    next(err);
  }
};
export const add = async (req, res, next) => {
  try {
    const newBrand = await brandService.add(req.body);
    res.json(newBrand);
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
    const updateBrand = await brandService.update(req.body);
    res.json(updateBrand);
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
    const removeBrand = await brandService.remove(req.params.brandId);
    res.json(removeBrand);
  } catch (err) {
    res.json({
      message: err.message,
      error: err,
    });
    next(err);
  }
};
