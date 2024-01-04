import imageService from "../../use-cases/image.service.js";

export const addImage = async (req, res, next) => {
    try {
        const replacedPath = './' + req.file.path.replace(/\\/g, '/');
        const image = await imageService.uploadImage(replacedPath);
        await imageService.unlinkImage(replacedPath);
        if (image) {
            res
                .status(200)
                .json({ message: "add image successful", data: image });
        } else {
            res.status(500).json({ message: "has error when add image" });
        }
    } catch (err) {
        next(err);
    }
}

export const updateImage = async (req, res, next) => {
    try {
        const replacedPath = './' + req.file.path.replace(/\\/g, '/');
        const image = await imageService.replaceImage(req.params.id, replacedPath);
        await imageService.unlinkImage(replacedPath);
        if (image) {
            res
                .status(200)
                .json({ message: "update image successful", data: image });
        } else {
            res.status(500).json({ message: "has error when update image" });
        }
    } catch (err) {
        next(err);
    }
}

export const removeImage = async (req, res, next) => {
    try {
        const image = await imageService.removeImage(req.params.id);
        if (image) {
            res
                .status(200)
                .json({ message: "remove image successful", data: image });
        } else {
            res.status(500).json({ message: "has error when remove image" });
        }
    } catch (err) {
        next(err);
    }
}