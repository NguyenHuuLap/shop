import cartService from "../../use-cases/cart.service.js";

export const getCartItems = async (req, res, next) => {
  try {
    let items;
    const userId = req.params.userId;
    const clientItems = req?.body?.items || [];
    if (userId) {
      items = await cartService.getCartItemsByUser({ userId });
    } else {
      items = await cartService.getCartItemsFromData(clientItems);
    }
    if (items) {
      res.status(200).json({ data: items });
    } else {
      res.status(200).json({ data: items });
    }
  } catch (err) {
    res.json({
      message: err.message,
      error: err,
    });
    next(err);
  }
};

export const addItem = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const { productId, sku, quantity } = req.body;
    const addResult = await cartService.addItems(
      userId,
      productId,
      sku,
      quantity,
    );
    if (addResult) {
      res
        .status(200)
        .json({ message: "Add item to cart successfully", data: addResult });
    } else {
      res.status(200).json({ message: "Error when at item to cart" });
    }
  } catch (err) {
    next(err);
  }
};

export const updateItemQuantity = async (req, res, next) => {
  try {
    const { userId, productId, sku, delta } = req.body;
    const updateResult = await cartService.updateItemQuantity(
      userId,
      productId,
      sku,
      delta,
    );
    if (updateResult) {
      res
        .status(200)
        .json({
          message: "update quantity item in cart successfully",
          data: updateResult,
        });
    } else {
      res
        .status(500)
        .json({ message: "has error update quantity", data: updateResult });
    }
  } catch (err) {
    next(err);
  }
};
export const removeItem = async (req, res, next) => {
  try {
    const { userId, productId, sku } = req.query;
    const deleteResult = await cartService.removeItem(userId, productId, sku);
    if (deleteResult) {
      res.status(200).json({ message: "delete item in cart successfully" });
    } else {
      res.status(500).json({ message: "has error delete item" });
    }
  } catch (err) {
    next(err);
  }
};
export const cleanCart = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const cleanCart = await cartService.cleanCart(userId);
    if (cleanCart) {
      res.status(200).json({ message: "clean item in cart successfully" });
    } else {
      res.status(500).json({ message: "has error clean cart" });
    }
  } catch (err) {
    next(err);
  }
};
