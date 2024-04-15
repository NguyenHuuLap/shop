import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const Statistics = () => {
    // State để lưu trữ các dữ liệu thống kê
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [orderStatusData, setOrderStatusData] = useState([]);
    const [userOrderData, setUserOrderData] = useState([]);

    // Gọi API để lấy dữ liệu tổng số đơn hàng, tổng doanh thu, thống kê đơn hàng theo trạng thái và người dùng
    useEffect(() => {
        axios.get('/api/statistics')
            .then(response => {
                setTotalOrders(response.data.totalOrders);
                setTotalRevenue(response.data.totalRevenue);
            })
            .catch(error => console.error('Lỗi khi lấy dữ liệu tổng số đơn hàng và doanh thu:', error));

        axios.get('/api/statistics/status')
            .then(response => {
                setOrderStatusData(response.data);
            })
            .catch(error => console.error('Lỗi khi lấy dữ liệu thống kê đơn hàng theo trạng thái:', error));

        // axios.get('/api/statistics/user')
        //     .then(response => {
        //         setUserOrderData(response.data);
        //     })
        //     .catch(error => console.error('Lỗi khi lấy dữ liệu thống kê đơn hàng theo người dùng:', error));
    }, []);

    // Tạo dữ liệu cho biểu đồ cột thống kê đơn hàng theo trạng thái
    const orderStatusChartData = {
        labels: orderStatusData.map(data => data.status),
        datasets: [
            {
                label: 'Số đơn hàng',
                data: orderStatusData.map(data => data.count),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    // Tạo dữ liệu cho biểu đồ tròn thống kê đơn hàng theo người dùng
    const userOrderChartData = {
        labels: userOrderData.map(data => data.username),
        datasets: [
            {
                label: 'Số đơn hàng',
                data: userOrderData.map(data => data.count),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
            },
        ],
    };

    return (
        <div>
            <h2>Thống kê</h2>
            
            {/* Hiển thị tổng số đơn hàng và tổng doanh thu */}
            <div>
                <h3>Tổng số đơn hàng: {totalOrders}</h3>
                <h3>Tổng doanh thu: {totalRevenue} VND</h3>
            </div>

            {/* Hiển thị biểu đồ cột thống kê đơn hàng theo trạng thái */}
            <div>
                <h3>Thống kê đơn hàng theo trạng thái</h3>
                <Bar data={orderStatusChartData} />
            </div>

            {/* Hiển thị biểu đồ tròn thống kê đơn hàng theo người dùng */}
            {/* <div>
                <h3>Thống kê đơn hàng theo người dùng</h3>
                <Pie data={userOrderChartData} />
            </div> */}
        </div>
    );
};

export default Statistics;
