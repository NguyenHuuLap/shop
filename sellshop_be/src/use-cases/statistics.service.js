import orderModel from '../entities/order.entity.js';

// Hàm tính tổng doanh thu của các đơn hàng
const calculateTotalRevenue = async () => {
    try {
        // Sử dụng phương pháp aggregate() để tính tổng doanh thu
        const result = await orderModel.aggregate([
            {
                // Lọc kết quả theo điều kiện bạn muốn (nếu có)
                $match: {
                    // Bạn có thể thêm điều kiện lọc đơn hàng tại đây (nếu cần)
                }
            },
            {
                // Nhóm kết quả lại và tính tổng doanh thu
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$total' }
                }
            }
        ]);

        // Trả về tổng doanh thu
        const totalRevenue = result[0]?.totalRevenue || 0;
        return totalRevenue;

    } catch (err) {
        console.error('Error calculating total revenue:', err);
        throw err;
    }
};

// Hàm lấy thống kê đơn hàng (tổng số đơn hàng, tổng doanh thu, giá trị trung bình của đơn hàng)
const getOrderStatistics = async (startDate, endDate) => {
    // Xây dựng truy vấn tìm kiếm dựa trên ngày bắt đầu và kết thúc
    const query = {};
    if (startDate) {
        query.createdAt = { ...query.createdAt, $gte: startDate };
    }
    if (endDate) {
        query.createdAt = { ...query.createdAt, $lte: endDate };
    }

    // Tính tổng số đơn hàng
    const totalOrders = await orderModel.countDocuments(query);

    // Tính tổng doanh thu
    const totalRevenue = await orderModel.aggregate([
        { $match: query },
        { $group: { _id: null, totalRevenue: { $sum: '$total' } } }
    ]);

    // Tính giá trị trung bình của đơn hàng
    const avgOrderValue = await orderModel.aggregate([
        { $match: query },
        { $group: { _id: null, avgOrderValue: { $avg: '$total' } } }
    ]);

    // Trả về các thống kê
    return {
        totalOrders,
        totalRevenue: totalRevenue[0]?.totalRevenue || 0,
        avgOrderValue: avgOrderValue[0]?.avgOrderValue || 0,
    };
};

// Hàm lấy thống kê đơn hàng theo từng trạng thái
const getOrderStatisticsByStatus = async () => {
    const statistics = await orderModel.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    return statistics;
};

// Hàm lấy thống kê đơn hàng theo từng người dùng
// const getOrderStatisticsByUser = async () => {
//     const statistics = await orderModel.aggregate([
//         { $group: { _id: '$userId', count: { $sum: 1 } } }
//     ]);

//     return statistics;
// };

// Xuất các hàm ra ngoài để sử dụng
export default {
    calculateTotalRevenue,
    getOrderStatistics,
    getOrderStatisticsByStatus,
    // getOrderStatisticsByUser,
};
