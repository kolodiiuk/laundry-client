import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { Box, useColorScheme } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { OrderStatus, PaymentMethod, PaymentStatus } from "../../app/models/Order";

export default function AdminOrders() {
    const gridRef = useRef<any>();
    const dispatch = useAppDispatch();
    const { orders, loading, error } = useAppSelector(state => state.orders);
    console.log(orders);
    useEffect(() => {
        void dispatch();
    }, [dispatch]);

    // mappers
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

    const [columnDefs] = useState([
        { field: 'orderId' },
        { field: 'name', headerName: 'Name', editable: true },
        //done(?)
        { 
            field: 'orderStatus', 
            headerName: 'Order Status',
            editable: true,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: getOrderStatusDisplayValues().map(v => v.label)
            },
            valueGetter: (params: any) => {
                return OrderStatus[params.data.orderStatus];
            },
            valueSetter: (params: any) => {
                const value = OrderStatus[params.newValue as keyof typeof OrderStatus];
                params.data.orderStatus = value;
                return true;
            }
        },
        { field: 'description', headerName: 'Description' },
        { field: 'pricePerUnit', headerName: 'Price', filter: 'agNumberColumnFilter', editable: true },
        { 
            field: 'unitType', 
            headerName: 'Unit', 
            editable: true,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: getUnitTypeDisplayValues().map(v => v.label)
            },
            valueGetter: (params: any) => {
                return UnitType[params.data.unitType];
            },
            valueSetter: (params: any) => {
                const value = UnitType[params.newValue as keyof typeof UnitType];
                params.data.unitType = value;
                return true;
            }
        },
        { 
            field: 'isAvailable', 
            headerName: 'Available',
            editable: true,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: [true, false]
            }
        },
    ]);

    const defaultColDef = useMemo(() => ({
        filter: 'agTextColumnFilter',
        floatingFilter: true,
        sortable: true,
        flex: 1,
    }), []);

    const onRowEditingStopped = useCallback((event: any) => {
        const data = event.data;
        console.log(data);
        dispatch(updateOrderStatus(data));
    }, [dispatch]);

    const { mode } = useColorScheme();
    const themeName = (mode === 'light') ? "ag-theme-alpine" : "ag-theme-alpine-dark";

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            p: 2,
            gap: 2
        }}>
            <Box sx={{ width: 'calc(100vw - 24vw)', height: 'calc(100vh - 150px)' }}>
                <div
                    className={themeName}
                    style={{ 
                        width: '100%',
                        height: '100%'
                    }}
                >
                    <AgGridReact
                        ref={gridRef}
                        rowData={orders}
                        immutableData={true}
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
        </Box>
    );
}