import discountModel from "../../entities/discount.entity.js";
import discountService from "../../use-cases/discount.service.js";
import imageService from "../../use-cases/image.service.js"

export const getAllDiscount = async (req, res, next) => {
    try {
        const discountAll = await discountService.getAllDiscount();
        if (discountAll) {
            res.status(200).json({ message: 'get all discount successful', data: discountAll })
        }
        else {
            res.status(500).json({ message: 'has error when got all discount' })
        }
    } catch (err) {
        next(err)
    }
};

export const getAllByAdmin = async (req, res, next) => {
    try {
        const discountAll = await discountService.getAllByAdmin();
        if (discountAll) {
            res.status(200).json({ message: 'get all discount successful', data: discountAll })
        }
        else {
            res.status(500).json({ message: 'has error when got all discount' })
        }
    } catch (err) {
        next(err)
    }
};

export const getOne = async (req, res, next) => {
    try {
        const discount = await discountService.getOne(req.params.discountId);
        if (discount) {
            res.status(200).json({ message: 'get discount successful', data: discount })
        }
        else {
            res.status(500).json({ message: 'has error when got all discount' })
        }
    } catch (err) {
        next(err)
    }
};

export const addImage = async (req, res, next) => {
    try {
        const replacedPath = './' + req.file.path.replace(/\\/g, '/');
        const image = await imageService.uploadImage(replacedPath);
        await imageService.unlinkImage(replacedPath);
        if (image) {
            res
                .status(200)
                .json({ message: "add discount successful", data: image });
        } else {
            res.status(500).json({ message: "has error when add discount" });
        }
    } catch (err) {
        next(err);
    }
}

export const updateImage = async (req, res, next) => {
    try {
        const replacedPath = './' + req.file.path.replace(/\\/g, '/');
        const discountImageURL = await discountModel.findById(req.params.discountId).select('image').exec();
        const parts = discountImageURL.image.split("/");
        const id = parts[parts.length - 2];
        const image = await imageService.replaceImage(id, replacedPath);
        await imageService.unlinkImage(replacedPath);
        if (image) {
            res
                .status(200)
                .json({ message: "update discount successful", data: image });
        } else {
            res.status(500).json({ message: "has error when add discount" });
        }
    } catch (err) {
        next(err);
    }
}

export const removeImage = async (req, res, next) => {
    try {
        const discountImageURL = await discountModel.findById(req.params.discountId).select('image').exec();
        const parts = discountImageURL.image.split("/");
        const id = parts[parts.length - 2];
        const image = await imageService.removeImage(id);
        if (image) {
            res
                .status(200)
                .json({ message: "update discount successful", data: image });
        } else {
            res.status(500).json({ message: "has error when add discount" });
        }
    } catch (err) {
        next(err);
    }
}

export const addDiscount = async (req, res, next) => {
    try {
        const newDiscount = await discountService.addDiscount(req.body);
        if (newDiscount) {
            res
                .status(200)
                .json({ message: "add discount successful", data: newDiscount });
        } else {
            res.status(500).json({ message: "has error when add discount" });
        }
    } catch (err) {
        next(err);
    }
};

export const update = async (req, res, next) => {
    try {
        const discountId = req.params.discountId;
        const updateDiscount = await discountService.update(discountId, req.body);
        if (updateDiscount) {
            res.status(200).json({ message: 'update discount successful', data: updateDiscount })
        }
        else {
            res.status(500).json({ message: 'has error when update discount' })
        }
    } catch (err) {
        next(err);
    }
}

export const remove = async (req, res, next) => {
    try {
        const discountId = req.params.discountId;
        const discountImageURL = await discountModel.findById(discountId).select('image').exec();
        const parts = discountImageURL.image.split("/");
        const id = parts[parts.length - 2];
        const result = await imageService.removeImage(id);
        const removeDiscount = await discountService.remove(discountId);
        if (removeDiscount) {
            res.status(200).json({ message: 'delete discount successful', data: removeDiscount })
        }
        else {
            res.status(500).json({ message: 'has error when delete discount' })
        }
    } catch (err) {
        next(err);
    }
}

export const getOneByCode = async (req, res, next) => {
    try {
        const code = req.params.code;
        const discount = await discountService.getOneByCode(code);
        if (discount) {
            res.status(200).json({ message: 'Discount Founded', data: discount })
        }
        else {
            res.status(500).json({ message: 'has error when find discount' })
        }
    } catch (err) {
        next(err);
    }
}


export const calculateDiscountAmt = async (req, res, next) => {
    try {
        const code = req.params.code;
        const amount = req.body.amount;
        const discount = await discountService.calculateDiscountAmt(code, amount);
        if (discount) {
            res.status(200).json({ message: 'Discount Founded', data: discount })
        }
        else {
            res.status(500).json({ message: 'has error when find discount' })
        }
    } catch (err) {
        next(err);
    }
}
