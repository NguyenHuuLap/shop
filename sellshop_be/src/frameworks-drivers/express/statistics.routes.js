import { Router } from 'express';
import {
    getOrderStatistics,
    getOrderStatisticsByStatus,
    getOrderStatisticsByUser,
} from '../../interface-adapters/controllers/statistics.controller.js';

const router = Router();

// Thống kê tổng số đơn hàng và tổng doanh thu
router.get('/', getOrderStatistics);
// router.get('/statistics1', getOrderStatistics);

// Thống kê đơn hàng theo từng trạng thái
router.get('/status', getOrderStatisticsByStatus);

// Thống kê đơn hàng theo từng người dùng
router.get('/user', getOrderStatisticsByUser);

export default router;