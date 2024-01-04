import orderService from "../../use-cases/order.service.js";
import httpStatus from "http-status";
import responseUtil from "../../utils/response.util.js";
import userService from "../../use-cases/user.service.js";
import vnpayService from "../../use-cases/vnpay.service.js";
import constants from "../../constants.js";
import orderModel from "../../entities/order.entity.js";

export const create = async (req, res, next) => {
    try {
        const useremail = req?.user?.email || null;

        const clientUrl = req.body?.clientUrl || req.headers.origin;

        const order = await orderService.create(
            useremail,
            req.body
        );

        if (order) {

            responseUtil.response(res, httpStatus.OK, `Success`, order);
        }
        else
            responseUtil.response(res, httpStatus.NOT_FOUND, `False`);

    } catch (err) {
        next(err);
    }
}

export const repay = async (req, res, next) => {
    try {
        const userId = req?.user?._id || null;

        const clientUrl = req.body?.clientUrl || req.headers.origin;

        const order = await orderService.getOne(req.params.orderId);

        if (order && order.userId.toString() === userId.toString()) {
            let paymentUrl = '';
            if (order.paymentMethod === constants.ORDER.PAYMENT_METHOD.VNPAY) {
                const apiUrl = `${req.protocol}://${req.get('host')}`
                paymentUrl = await vnpayService.createPaymentUrl(
                    req.ipv4,
                    apiUrl,
                    clientUrl,
                    order._id.toString(),
                    order.total
                );
            }
            responseUtil.response(res, httpStatus.OK, `Success`, paymentUrl);
        }
        else
            responseUtil.response(res, httpStatus.NOT_FOUND, `False`);

    } catch (err) {
        next(err);
    }
}

export const update = async (req, res, next) => {
    try {
        let order = await orderService.update(req.params.orderId, req.body, req.user._id)

        if (order)
            responseUtil.response(res, httpStatus.OK, `Success`, order);
        else
            responseUtil.response(res, httpStatus.NOT_FOUND, `False`);

    } catch (err) {
        next(err);
    }
}

export const updateByAdmin = async (req, res, next) => {
    try {
        let order = await orderService.updateByAdmin(req.params.orderId, req.body)
        
        if (order)
            responseUtil.response(res, httpStatus.OK, `Success`, order);
        else
            responseUtil.response(res, httpStatus.NOT_FOUND, `False`);

    } catch (err) {
        next(err);
    }
}

export const getByUser = async (req, res, next) => {
    console.log(req.user._id);
    try {
        let order = await orderService.getList(req.user._id, null, null, null, null)
        if (order)
            responseUtil.response(res, httpStatus.OK, `Success`, order);
        else
            responseUtil.response(res, httpStatus.NOT_FOUND, `False`);

    } catch (err) {
        next(err);
    }
}


export const getAll = async (req, res, next) => {
    try {
        let orders = await orderService.getAll(req.body || null);
        if (orders)
            responseUtil.response(res, httpStatus.OK, `Success`, orders);
        else
            responseUtil.response(res, httpStatus.NOT_FOUND, `False`);

    } catch (err) {
        next(err);
    }
}

export const getOne = async (req, res, next) => {
    try {
        let order = await orderService.getOne(req.params.orderId);
        if (order)
            responseUtil.response(res, httpStatus.OK, `Success`, order);
        else
            responseUtil.response(res, httpStatus.NOT_FOUND, `False`);

    } catch (err) {
        next(err);
    }
}

export const getOneByOwner = async (req, res, next) => {
    try {
        let order = await orderService.getOneByOwner(req.params.orderId, req.user._id);
        if (order)
            responseUtil.response(res, httpStatus.OK, `Success`, order);
        else
            responseUtil.response(res, httpStatus.NOT_FOUND, `False`);

    } catch (err) {
        next(err);
    }
}

export const getListByOwner = async (req, res, next) => {
    try {
        let order = await orderService.getList(req.user._id, null, req.params.status, null);
        if (order)
            responseUtil.response(res, httpStatus.OK, `Success`, order);
        else
            responseUtil.response(res, httpStatus.NOT_FOUND, `False`);

    } catch (err) {
        next(err);
    }
}

export const checkOrderHasDiscount = async (req, res, next) => {
    try {
        let order = await orderService.checkOrderHasDiscount(req.user._id, req.params.discountCode);
        if (order)
            responseUtil.response(res, httpStatus.OK, `Success`, order);
        else
            responseUtil.response(res, httpStatus.NOT_FOUND, `False`);

    } catch (err) {
        next(err);
    }
}

export const getVnpayResult = async (req, res, next) => {
    try {
        const result = await vnpayService.checkPaymentStatus(req.query);
        let message = '';

        if (result.isSuccess) {
            const paidDate = new Date(
                Number.parseInt(result.data.payDate.substring(0, 4)),
                Number.parseInt(result.data.payDate.substring(4, 6)),
                Number.parseInt(result.data.payDate.substring(6, 8)),
                Number.parseInt(result.data.payDate.substring(8, 10)),
                Number.parseInt(result.data.payDate.substring(10, 12)),
                Number.parseInt(result.data.payDate.substring(12, 14))
            );

            const order = await orderModel.findById(result.data.orderId);
            if (order.total === result.data.amount / 100) {
                // order.status = constants.ORDER.PAYMENT_STATUS.PAID;
                order.paymentStatus = constants.ORDER.PAYMENT_STATUS.PAID;
                order.paidDate = paidDate
                await orderModel.updateOne({ _id: order._id }, order);
            }
            message = 'Thanh toán thành công';
        } else {
            message = 'Thanh toán thất bại';
        }

        // close window
        res.send(`
        <script>
          alert('${message}');
          window.open('${result.data.clientUrl}/order/${result.data.orderId}', '_self', '')
        </script>
      `);
    } catch (err) { next(err); }
};

export const cancelOrder = async (req, res, next) => {
    try {
        const userId = req?.user?._id || null;
        const orderId = req.params.orderId;

        // Check if the user has the authority to cancel the order
        const order = await orderService.getOne(orderId);
        if (!order || order.userId.toString() !== userId.toString()) {
            return responseUtil.response(res, httpStatus.NOT_FOUND, `Order not found or unauthorized`);
        }

        // Check if the order is cancellable (you may add more conditions here)
        if (order.status !== constants.ORDER.ORDER_STATUS.CANCELLED &&
            order.paymentStatus !== constants.ORDER.PAYMENT_STATUS.PAID) {
            // Update order status to cancelled
            const cancelledOrder = await orderService.cancelOrder(orderId);

            if (cancelledOrder) {
                responseUtil.response(res, httpStatus.OK, `Order has been cancelled successfully`, cancelledOrder);
            } else {
                responseUtil.response(res, httpStatus.INTERNAL_SERVER_ERROR, `Failed to cancel order`);
            }
        } else {
            responseUtil.response(res, httpStatus.BAD_REQUEST, `Order cannot be cancelled`);
        }

    } catch (err) {
        next(err);
    }
}