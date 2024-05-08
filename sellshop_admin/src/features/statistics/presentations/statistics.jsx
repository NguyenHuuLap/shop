import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const Statistics = () => {
    // State để lưu trữ các dữ liệu thống kê
    const [statisticsDate, setStatisticsDate] = useState(null);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [orderStatusData, setOrderStatusData] = useState([]);
    const [userOrderData, setUserOrderData] = useState([]);

    // Gọi API để lấy dữ liệu tổng số đơn hàng, tổng doanh thu, thống kê đơn hàng theo trạng thái và người dùng
    useEffect(() => {
        const fetchOrderStatusData = async () => {
            const Statictisawait = await axios.get('http://localhost:3030/statistics')
                .catch(error => console.error('Lỗi khi lấy dữ liệu tổng số đơn hàng và doanh thu:', error));
            if (Statictisawait && Statictisawait.status == 200) {
                setTotalOrders(Statictisawait.data.data.totalOrders);
                console.log(Statictisawait.data)
                setTotalRevenue(Statictisawait.data.data.totalRevenue);

                // setStatisticsDate(statistics.data.date || new Date().toISOString());
            }
            await axios.get('http://localhost:3030/statistics/status')
                .then(response => {
                    setOrderStatusData(response.data.data);
                })
                .catch(error => console.error('Lỗi khi lấy dữ liệu thống kê đơn hàng theo trạng thái:', error));
        }

        fetchOrderStatusData()

        // axios.get('/api/statistics/user')
        //     .then(response => {
        //         setUserOrderData(response.data);
        //     })
        //     .catch(error => console.error('Lỗi khi lấy dữ liệu thống kê đơn hàng theo người dùng:', error));
    }, []);

    const revenueChartData = {
        labels: ['Doanh thu'],
        datasets: [
            {
                label: 'Tổng doanh thu',
                data: [totalRevenue],
                backgroundColor: ['#36A2EB'],
            },
        ],
    };

    // Tạo dữ liệu cho biểu đồ cột thống kê đơn hàng theo trạng thái
    const orderStatusChartData = {
        labels: orderStatusData.map(data => data._id),
        datasets: [
            {
                label: 'Số đơn hàng',
                data: orderStatusData.map(data => data.count),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    const formatNumber = (number) => {
        return number.toLocaleString('vi-VN');
    };

    // Tạo dữ liệu cho biểu đồ tròn thống kê đơn hàng theo người dùng
    // const userOrderChartData = {
    //     labels: userOrderData.map(data => data.username),
    //     datasets: [
    //         {
    //             label: 'Số đơn hàng',
    //             data: userOrderData.map(data => data.count),
    //             backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
    //         },
    //     ],
    // };

    return (
        <div>
            <h2>Thống kê</h2>
            {/* <div>
                <h3>Ngày thống kê: {new Date(statisticsDate).toLocaleDateString('vi-VN')}</h3>
            </div> */}

            {/* Hiển thị tổng số đơn hàng và tổng doanh thu */}
            <div>
                <h3>Tổng số đơn hàng: {formatNumber(totalOrders)}</h3>
                <h3>Tổng doanh thu: {formatNumber(totalRevenue)} VND</h3>
            </div>

            <div>
                <h3>Thống kê doanh thu</h3>
                <Bar data={revenueChartData} />
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
