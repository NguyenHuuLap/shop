import orderService from '../../use-cases/order.service.js';
import statisticsService from '../../use-cases/statistics.service.js';
import responseUtil from '../../utils/response.util.js';
import httpStatus from 'http-status';

// Hàm thống kê tổng số đơn hàng và tổng doanh thu
export const getOrderStatistics = async (req, res, next) => {
    try {
        // Gọi dịch vụ thống kê từ orderService
        const startDate = req.query.startDate ? new Date(req.query.startDate) : null;
        const endDate = req.query.endDate ? new Date(req.query.endDate) : null;

        // Trả về kết quả thống kê
        const statistics = await statisticsService.getOrderStatistics(startDate, endDate);

        // Trả về kết quả thống kê dưới dạng JSON
        responseUtil.response(res, httpStatus.OK, 'Success', statistics);
    } catch (err) {
        next(err);
    }
};

// Hàm thống kê đơn hàng theo từng trạng thái
export const getOrderStatisticsByStatus = async (req, res, next) => {
    try {
        // Gọi dịch vụ thống kê từ orderService
        const statistics = await statisticsService.getOrderStatisticsByStatus();

        // Trả về kết quả thống kê
        responseUtil.response(res, httpStatus.OK, 'Success', statistics);
    } catch (err) {
        next(err);
    }
};

// Hàm thống kê đơn hàng theo từng người dùng
export const getOrderStatisticsByUser = async (req, res, next) => {
    try {
        // Gọi dịch vụ thống kê từ orderService
        const statistics = await statisticsService.getOrderStatisticsByUser();

        // Trả về kết quả thống kê
        responseUtil.response(res, httpStatus.OK, 'Success', statistics);
    } catch (err) {
        next(err);
    }
};