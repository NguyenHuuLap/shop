import { useMemo, useState } from 'react';
import {
    MRT_EditActionButtons,
    MaterialReactTable,
    // createRow,
    useMaterialReactTable,
} from 'material-react-table';
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Toolbar,
    Tooltip,
} from '@mui/material';
import {
    QueryClient,
    QueryClientProvider,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import styled, { css } from 'styled-components'

const ProfileProduct = styled(Button)({
  backgroundColor: "#ee4d2d",
  fontSize: 12,
  "&:hover": {
    backgroundColor: "#ee4d2d",
  },
});

const Example = () => {
    const [validationErrors, setValidationErrors] = useState({});
    
    const columns = useMemo(
        () => [
            // {
            //     accessorKey: '_id',
            //     header: 'Id',
            //     enableEditing: false,
            //     size: 80,
            // },
            {
                accessorKey: 'createdAt',
                header: 'Ngày tạo',
                enableEditing: false,
                Cell: ({ renderedCellValue }) => {
                    return <span>{new Intl.DateTimeFormat('vi-VN', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }).format(new Date(renderedCellValue))}</span>;
                },
            },
            {
                accessorKey: 'customer.name',
                header: 'Họ tên khách hàng',
                muiEditTextFieldProps: {
                    required: true,
                }
            },
            {
                accessorKey: 'customer.phone',
                header: 'Số điện thoại khách hàng',
                muiEditTextFieldProps: {
                    required: true,
                }
            },
            // {
            //     accessorKey: 'userId',
            //     header: 'Người dùng đặt hàng',
            //     muiEditTextFieldProps: {
            //         required: true,
            //     }
            // },
            {
                accessorKey: 'isReceiveAtStore',
                header: 'Nhận tại cửa hàng',
                enableEditing: false,
                muiEditTextFieldProps: {
                    error: !!validationErrors?.state,
                    helperText: validationErrors?.state,
                },
                Cell: (cell) => {
                    const value = cell.renderedCellValue;
                    let displayValue = '';
                    if (value === true) {
                        displayValue = 'Nhận tại cửa hàng';
                    } else if (value === false) {
                        displayValue = 'Không nhận tại cửa hàng';
                    } else {
                        displayValue = 'Lỗi'
                    }
                    return <span>{displayValue}</span>;
                },
            },
            {
                accessorKey: 'items',
                header: 'Các sản phẩm',
                enableEditing: false,
                Cell: (cell) => {
                    return <ProfileProduct variant='contained' component={Link} to={`/order/${cell.row.original._id}/item`} >Chi tiết sản phẩm</ProfileProduct>;
                },
            },
            {
                accessorKey: 'address.province',
                header: 'Tỉnh',
                enableEditing: false,

            },
            {
                accessorKey: 'address.district',
                header: 'Quận/Huyện',
                enableEditing: false,

            },
            {
                accessorKey: 'address.ward',
                header: 'Phường/Xã',
                enableEditing: false,

            },
            {
                accessorKey: 'address.street',
                header: 'Đường/Địa chỉ',
                enableEditing: false,

            },
            {
                accessorKey: 'note',
                header: 'Ghi chú',
                enableEditing: false,
            },
            {
                accessorKey: 'paymentMethod',
                header: 'Hình thức thanh toán',
                enableEditing: false,
            },
            {
                accessorKey: 'paymentStatus',
                header: 'Trạng thái thanh toán',
                editVariant: 'select',
                editSelectOptions: [
                    { label: 'Chưa thanh toán', value: "pending" },
                    { label: 'Đã thanh toán', value: "paid" },
                    { label: 'Đã hủy', value: "cancelled" },
                ],
                muiEditTextFieldProps: {
                    select: true,
                },
                Cell: (cell) => {
                    const value = cell.renderedCellValue;
                    let displayValue = '';
                    if (value === 'pending') {
                        displayValue = 'Chưa thanh toán';
                    } else if (value === 'paid') {
                        displayValue = 'Đã thanh toán';
                    } else if (value === 'cancelled') {
                        displayValue = 'Đã hủy';
                    } else {
                        displayValue = 'Lỗi'
                    }
                    return <span>{displayValue}</span>;
                },
            },
            {
                accessorKey: 'status',
                header: 'Trạng thái',
                editVariant: 'select',
                editSelectOptions: [
                    { label: 'Chưa xác nhận', value: "pending" },
                    { label: 'Đã xác nhận', value: "confirmed" },
                    { label: 'Đang giao', value: "shipping" },
                    { label: 'Đã giao', value: "completed" },
                    { label: 'Đã hủy', value: "cancelled" },
                ],
                muiEditTextFieldProps: {
                    select: true,
                },
                Cell: (cell) => {
                    const value = cell.renderedCellValue;
                    let displayValue = '';
                    if (value === 'pending') {
                        displayValue = 'Chưa xác nhận';
                    } else if (value === 'confirmed') {
                        displayValue = 'Đã xác nhận';
                    } else if (value === 'shipping') {
                        displayValue = 'Đang giao';
                    } else if (value === 'completed') {
                        displayValue = 'Đã giao';
                    } else if (value === 'cancelled') {
                        displayValue = 'Đã hủy';
                    } else {
                        displayValue = 'Lỗi'
                    }
                    return <span>{displayValue}</span>;
                },
            },
            {
                accessorKey: 'subTotal',
                header: 'Tổng tiền sản phẩm',
                enableEditing: false,
                Cell: ({ renderedCellValue }) => {
                    return <span>{renderedCellValue.toLocaleString('vi-VN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>;
                },

            },
            {
                accessorKey: 'discountCode',
                header: 'Mã khuyến mãi',
                enableEditing: false,

            },
            {
                accessorKey: 'discount',
                header: 'Giá khuyến mãi',
                enableEditing: false,
                Cell: ({ renderedCellValue }) => {
                    return <span>{renderedCellValue.toLocaleString('vi-VN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>;
                },

            },
            {
                accessorKey: 'total',
                header: 'Tổng tiền',
                enableEditing: false,
                Cell: ({ renderedCellValue }) => {
                    return <span>{renderedCellValue.toLocaleString('vi-VN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>;
                },

            },
            // {
            //     accessorKey: 'updatedAt',
            //     header: 'Ngày cập nhật',
            //     enableEditing: false,
            //     Cell: ({ renderedCellValue }) => {
            //         return <span>{new Intl.DateTimeFormat('vi-VN', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }).format(new Date(renderedCellValue))}</span>;
            //     },
            // },
        ],
        [validationErrors],
    );

    //call CREATE hook
    const { mutateAsync: createOrder, isPending: isCreatingOrder } =
        useCreateOrder();
    //call READ hook
    const {
        data: fetchedOrders = [],
        isError: isLoadingOrdersError,
        isFetching: isFetchingOrders,
        isLoading: isLoadingOrders,
    } = useGetOrders();

    //call UPDATE hook
    const { mutateAsync: updateOrder, isPending: isUpdatingOrder } =
        useUpdateOrder();
    //call DELETE hook
    const { mutateAsync: deleteOrder, isPending: isDeletingOrder } =
        useDeleteOrder();

    //CREATE action
    const handleCreateOrder = async ({ values, table }) => {
        const newValidationErrors = values;
        // if (Object.values(newValidationErrors).some((error) => error)) {
        //     setValidationErrors(newValidationErrors);
        //     return;
        // }
        setValidationErrors({});
        await createOrder(values);
        table.setCreatingRow(null); //exit creating mode
    };

    //UPDATE action
    const handleSaveOrder = async ({ values, table }) => {
        const newValidationErrors = values
        // if (Object.values(newValidationErrors).some((error) => error)) {
        //     setValidationErrors(newValidationErrors);
        //     return;
        // }
        setValidationErrors({});
        await updateOrder(values);
        table.setEditingRow(null); //exit editing mode
    };

    //DELETE action
    const openDeleteConfirmModal = (row) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            deleteOrder(row.original._id);
        }
    };

    const table = useMaterialReactTable({
        columns,
        data: fetchedOrders,
        createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
        editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
        enableEditing: true,
        getRowId: (row) => row.id,
        muiToolbarAlertBannerProps: isLoadingOrdersError
            ? {
                color: 'error',
                children: 'Error loading data',
            }
            : undefined,
        muiTableContainerProps: {
            sx: {
                minHeight: '500px',
            },
        },
        onCreatingRowCancel: () => setValidationErrors({}),
        onCreatingRowSave: handleCreateOrder,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleSaveOrder,
        //optionally customize modal content
        renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
            <>
                <DialogTitle variant="h3">Tạo đơn hàng mới</DialogTitle>
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                >
                    {internalEditComponents} {/* or render custom edit components here */}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </DialogActions>
            </>
        ),
        //optionally customize modal content
        renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
            <>
                <DialogTitle variant="h6">Sửa</DialogTitle>
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                >
                    {internalEditComponents} {/* or render custom edit components here */}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </DialogActions>
            </>
        ),
        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip title="Edit">
                    <IconButton onClick={() => table.setEditingRow(row)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
        state: {
            isLoading: isLoadingOrders,
            isSaving: isCreatingOrder || isUpdatingOrder || isDeletingOrder,
            showAlertBanner: isLoadingOrdersError,
            showProgressBars: isFetchingOrders,
        },
    });

    return <MaterialReactTable table={table} />;
};

//CREATE hook (post new order to api)
function useCreateOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data) => {
            delete data._id;
            delete data.slug;
            const token = Cookies.get("token");
            const response = await axios.post(`http://localhost:3030/order/`, data, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              })
            return (response.data);
        },
        //client side optimistic update
        onMutate: (newOrderInfo) => {
            queryClient.setQueryData(['orders'], (prevOrders) => [
                ...prevOrders,
                {
                    ...newOrderInfo,
                    id: (Math.random() + 1).toString(36).substring(7),
                },
            ]);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['orders']);
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['orders'] }), //refetch orders after mutation, disabled for demo
    });
}

//READ hook (get orders from api)
function useGetOrders() {
    return useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const token = Cookies.get("token");
            const response = await axios.get(`http://localhost:3030/order/`, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              })
            console.log(response)
            return (response.data?.data);
        },
        refetchOnWindowFocus: false,
    });
}

//UPDATE hook (put order in api)
function useUpdateOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data) => {
            const id = data._id;
            delete data._id;
            delete data.createdAt
            delete data.updatedAt
            const token = Cookies.get("token");
            const response = await axios.patch(`http://localhost:3030/order/by-admin/${id}`, data, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              })
            console.log(response);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['orders']);
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['orders'] }), //refetch orders after mutation, disabled for demo
    });
}

//DELETE hook (delete order in api)
function useDeleteOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (orderId) => {
            const token = Cookies.get("token");
            const response = await axios.delete(`http://localhost:3030/order/${orderId}`, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              })
            console.log(response)
        },
        //client side optimistic update
        onMutate: (orderId) => {
            queryClient.setQueryData(['orders'], (prevOrders) =>
                prevOrders?.filter((order) => order.id !== orderId),
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['orders']);
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['orders'] }), //refetch orders after mutation, disabled for demo
    });
}

const queryClient = new QueryClient();

const Order = () => (
    //Put this with your other react-query providers near root of your app
    <QueryClientProvider client={queryClient}>
        <Example />
    </QueryClientProvider>
);

export default Order;

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
    !!email.length &&
    email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );

function validateOrder(order) {
    return {
        firstName: !validateRequired(order.firstName)
            ? 'First Name is Required'
            : '',
        lastName: !validateRequired(order.lastName) ? 'Last Name is Required' : '',
        email: !validateEmail(order.email) ? 'Incorrect Email Format' : '',
    };
}
