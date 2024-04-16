import { Router } from 'express';
import {
    getOrderStatistics,
    getOrderStatisticsByStatus,
    getOrderStatisticsByUser,
} from '../../interface-adapters/controllers/statistics.controller.js';

const router = Router();

// Thống kê tổng số đơn hàng và tổng doanh thu
router.get('/statistics', getOrderStatistics);
// router.get('/statistics1', getOrderStatistics);

// Thống kê đơn hàng theo từng trạng thái
router.get('/statistics/status', getOrderStatisticsByStatus);

// Thống kê đơn hàng theo từng người dùng
router.get('/statistics/user', getOrderStatisticsByUser);

export default router;