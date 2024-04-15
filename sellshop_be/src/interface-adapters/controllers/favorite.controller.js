import favoriteService from "../../use-cases/favorite.service.js";
import httpStatus from "http-status";
import responseUtil from "../../utils/response.util.js";

export const getAllFavorites = async (req, res, next) => {
    try {
        let favorites = await favoriteService.getAll();
        if (favorites) {
            responseUtil.response(res, httpStatus.OK, "Success", favorites);
        } else {
            responseUtil.response(res, httpStatus.NOT_FOUND, "Failed");
        }
    } catch (err) {
        next(err);
    }
};

export const getFavoritesByUser = async (req, res, next) => {
    try {
        let favorites = await favoriteService.getByUser(req.params.userId);
        if (favorites) {
            responseUtil.response(res, httpStatus.OK, "Success", favorites);
        } else {
            responseUtil.response(res, httpStatus.NOT_FOUND, "Failed");
        }
    } catch (err) {
        next(err);
    }
};

export const createFavorite = async (req, res, next) => {
    try {
        let favorite = await favoriteService.create(req.body, req.user._id);
        if (favorite) {
            responseUtil.response(res, httpStatus.OK, "Success", favorite);
        } else {
            responseUtil.response(res, httpStatus.NOT_FOUND, "Failed");
        }
    } catch (err) {
        next(err);
    }
};

export const removeFavorite = async (req, res, next) => {
    try {
        let favorite = await favoriteService.remove(req.params.favoriteId, req.user._id);
        if (favorite) {
            responseUtil.response(res, httpStatus.OK, "Success", favorite);
        } else {
            responseUtil.response(res, httpStatus.NOT_FOUND, "Failed");
        }
    } catch (err) {
        next(err);
    }
};

export const removeFavoriteByAdmin = async (req, res, next) => {
    try {
        let favorite = await favoriteService.removeByAdmin(req.params.favoriteId);
        if (favorite) {
            responseUtil.response(res, httpStatus.OK, "Success", favorite);
        } else {
            responseUtil.response(res, httpStatus.NOT_FOUND, "Failed");
        }
    } catch (err) {
        next(err);
    }
};