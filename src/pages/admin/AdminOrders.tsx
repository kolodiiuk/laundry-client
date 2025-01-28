import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { Box, Button, CircularProgress, useColorScheme } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { Order, OrderStatus, PaymentMethod, PaymentStatus } from "../../app/models/Order";
import { format } from 'date-fns';
import { fetchAllOrders, fetchOrderItems, updateOrder } from "../../app/store/slices/OrdersSlice";
import { fetchAllAddresses, fetchAllUsers } from "../../app/store/slices/AuthSlice";
import AddressCellRenderer from "../../components/common/cell-renderers/AddressCellRenderer.tsx";
import UserCellRenderer from "../../components/common/cell-renderers/UserCellRenderer.tsx";
import OrderDetailsDialog from "../../components/orders/OrderDetailsDialog";
import { fetchAllServices } from "../../app/store/slices/ServiceSlice";

export default function AdminOrders() {
    const gridRef = useRef<any>();
    const dispatch = useAppDispatch();
    const { allOrders, loading: ordersLoading, error } = useAppSelector(state => state.orders);
    const { allAddresses, loading: authLoading} = useAppSelector(state => state.auth);
    useEffect(() => {
        Promise.all([
            dispatch(fetchAllOrders()),
            dispatch(fetchAllUsers()), 
            dispatch(fetchAllAddresses())
        ]);
    }, [dispatch]);

    const getOrderStatusDisplayValues = () => {
        return Object.keys(OrderStatus)
            .filter(k => isNaN(Number(k)))
            .map(k => ({ 
                label: k, 
                value: OrderStatus[k as keyof typeof OrderStatus]
            }));
    };
    const getPaymentStatusDisplayValues = () => {
        return Object.keys(PaymentStatus)
            .filter(k => isNaN(Number(k)))
            .map(k => ({ 
                label: k, 
                value: PaymentStatus[k as keyof typeof PaymentStatus]
            }));
    };
    const getPaymentMethodDisplayValues = () => {
        return Object.keys(PaymentMethod)
            .filter(k => isNaN(Number(k)))
            .map(k => ({ 
                label: k, 
                value: PaymentMethod[k as keyof typeof PaymentMethod]
            }));
    };

    const dateFormatter = (params: any) => {
        return params.value ? format(new Date(params.value), 'dd/MM/yyyy HH:mm') : '';
    };

    const handleOrderDetailsRequest = (orderId: number): void => {
        if (orderId < 1) {
            console.error(`Invalid orderId: ${orderId}`);
            return;
        }
        dispatch(fetchOrderItems(orderId));
        dispatch(fetchAllServices());
        const selectedOrder = allOrders.find(order => order.id === orderId) || null;
        setSelectedOrder(selectedOrder);
    }

    const [columnDefs] = useState([
        { 
            field: 'id',
            headerName: 'Order ID',
            editable: false,
            filter: 'agNumberColumnFilter',
            filterParams: {
                buttons: ['reset', 'apply'],
                closeOnApply: true
            }
        },
        { 
            field: 'status',
            headerName: 'Order Status',
            editable: true,
            filter: 'agSetColumnFilter',
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: getOrderStatusDisplayValues().map(v => v.label)
            },
            valueGetter: (params: any) => OrderStatus[params.data.status],
            valueSetter: (params: any) => {
                const value = OrderStatus[params.newValue as keyof typeof OrderStatus];
                const updatedData = {
                    ...params.data,
                    status: value
                };
                params.node.setData(updatedData);
                return true;
            }
        },
        {
            field: 'subtotal',
            headerName: 'Subtotal',
            editable: false,
            filter: 'agNumberColumnFilter',
            valueFormatter: (params: any) => `${params.value} грн`,
            filterParams: {
                buttons: ['reset', 'apply'],
                closeOnApply: true
            }
        },
        { 
            field: 'description', 
            headerName: 'Description', 
            editable: false 
        },
        { 
            field: 'paymentMethod',
            headerName: 'Payment Method',
            editable: false,
            filter: 'agSetColumnFilter',
            valueGetter: (params: any) => PaymentMethod[params.data.paymentMethod],
            filterParams: {
                values: getPaymentMethodDisplayValues().map(v => v.label)
            }
        },
        { 
            field: 'paymentStatus',
            headerName: 'Payment Status',
            editable: true,
            filter: 'agSetColumnFilter',
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: getPaymentStatusDisplayValues().map(v => v.label)
            },
            valueGetter: (params: any) => PaymentStatus[params.data.paymentStatus],
            valueSetter: (params: any) => {
                const value = PaymentStatus[params.newValue as keyof typeof PaymentStatus];
                const updatedData = {
                    ...params.data,
                    paymentStatus: value
                };
                params.node.setData(updatedData);
                return true;
            }
        },
        { 
            field: 'hasCoupon',
            headerName: 'Has Coupon',
            editable: false,
            filter: 'agSetColumnFilter',
            valueFormatter: (params: any) => params.value ? 'Yes' : 'No'
        },
        { 
            field: 'discount',
            headerName: 'Discount',
            editable: false,
            filter: 'agNumberColumnFilter',
            valueFormatter: (params: any) => `${params.value} грн`
        },
        { 
            field: 'deliveryFee',
            headerName: 'Delivery Fee',
            editable: false,
            filter: 'agNumberColumnFilter',
            valueFormatter: (params: any) => `${params.value} грн`
        },
        { 
            field: 'couponId', 
            headerName: 'Coupon', 
            filter: 'agNumberColumnFilter', 
            editable: false
        },
        {
            field: 'collectedDate',
            headerName: 'Collected Date',
            editable: true,
            filter: 'agDateColumnFilter',
            valueFormatter: dateFormatter,
            filterParams: {
                buttons: ['reset', 'apply'],
                closeOnApply: true,
                comparator: (filterValue: Date, cellValue: string) => {
                    const cellDate = new Date(cellValue);
                    if (cellDate < filterValue) return -1;
                    if (cellDate > filterValue) return 1;
                    return 0;
                }
            },
            valueSetter: (params: any) => {
                const updatedData = {
                    ...params.data,
                    collectedDate: params.newValue
                };
                params.node.setData(updatedData);
                return true;
            }
        },
        {
            field: 'deliveredDate',
            headerName: 'Delivered Date',
            editable: true,
            filter: 'agDateColumnFilter',
            valueFormatter: dateFormatter,
            filterParams: {
                buttons: ['reset', 'apply'],
                closeOnApply: true,
                comparator: (filterValue: Date, cellValue: string) => {
                    const cellDate = new Date(cellValue);
                    if (cellDate < filterValue) return -1;
                    if (cellDate > filterValue) return 1;
                    return 0;
                }
            },
            valueSetter: (params: any) => {
                const updatedData = {
                    ...params.data,
                    deliveredDate: params.newValue
                };
                params.node.setData(updatedData);
                return true;
            }
        },
        {
            field: 'userId',
            headerName: 'Customer',
            editable: false,
            filter: 'agTextColumnFilter',
            cellRenderer: UserCellRenderer,
        },
        {
            field: 'addressId',
            headerName: 'Delivery Address',
            editable: false,
            filter: 'agTextColumnFilter',
            cellRenderer: AddressCellRenderer,
            cellRendererParams: {
                allAddresses: allAddresses
            }
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            editable: false,
            filter: 'agDateColumnFilter',
            valueFormatter: dateFormatter,
            filterParams: {
                buttons: ['reset', 'apply'],
                closeOnApply: true,
                comparator: (filterValue: Date, cellValue: string) => {
                    const cellDate = new Date(cellValue);
                    if (cellDate < filterValue) return -1;
                    if (cellDate > filterValue) return 1;
                    return 0;
                }
            }
        },
        {
            headerName: 'Details',
            cellRenderer: (params: any) => {
                return (
                    <Button
                        sx={{
                            width: '100%',
                            height: '100%',
                            padding: 0,
                            margin: 0,
                            border: 'none'
                        }}
                        onClick={() => handleOrderDetailsRequest(params.data.id)}
                    >
                        Details
                    </Button>
                )
            },
        }
    ]);

    const defaultColDef = useMemo(() => ({
        filter: 'agTextColumnFilter',
        floatingFilter: true,
        sortable: true,
        flex: 1,
    }), []);

    const onRowEditingStopped = useCallback((event: any) => {
        const data = event.data;
        dispatch(updateOrder(data));
    }, [dispatch]);

    const { mode } = useColorScheme();
    const themeName = (mode === 'light') ? "ag-theme-alpine" : "ag-theme-alpine-dark";
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const isLoading = ordersLoading || authLoading || !allAddresses.length;
    if (isLoading) return <CircularProgress/>;
    if (error) return <div>Error: {error}</div>;


    return (
        <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            p: 2,
            gap: 2
        }}>
            <Box sx={{ width: 'calc(150vw)', height: 'calc(100vh - 150px)' }}>
                <div
                    className={themeName}
                    style={{ 
                        width: '100%',
                        height: '100%'
                    }}
                >
                    <AgGridReact
                        ref={gridRef}
                        rowData={allOrders}
                        domLayout="normal"
                        getRowId={p => p.data.id}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        editType="fullRow"
                        onRowEditingStopped={onRowEditingStopped}
                        stopEditingWhenCellsLoseFocus={true}
                        stopEditingWhenGridLosesFocus={false}
                        suppressRowTransform={true}
                    />
                </div>
            </Box>
                <OrderDetailsDialog 
                    order={selectedOrder}
                    open={!!selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                />
        </Box>
    );
}