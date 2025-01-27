import {useColorScheme, Box} from "@mui/material";
import {AgGridReact} from "ag-grid-react";
import {useRef, useEffect, useState, useMemo} from "react";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore";
import {fetchUserAddresses} from "../../app/store/slices/AuthSlice";
import { format } from "date-fns";
import { OrderStatus, PaymentStatus, PaymentMethod } from "../../app/models/Order";
import { fetchUserOrders } from "../../app/store/slices/OrdersSlice";
import UserCellRenderer from "../../components/common/UserCellRenderer";
import UserAddressCellRenderer from "../../components/common/UserAddressCellRenderer";

export default function CustomerOrders() {
  const gridRef = useRef<any>();
  const dispatch = useAppDispatch();
  const { userOrders, loading: ordersLoading, error } = useAppSelector(state => state.orders);
  const { addresses, user, loading: authLoading} = useAppSelector(state => state.auth);
  useEffect(() => {
      Promise.all([
          dispatch(fetchUserOrders(user ? user.id : -1)),
          dispatch(fetchUserAddresses())
      ]);
      console.log("loaded" );
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

  const [columnDefs] = useState([
      { 
          field: 'id',
          headerName: 'Order ID',
          filter: 'agNumberColumnFilter',
          filterParams: {
              buttons: ['reset', 'apply'],
              closeOnApply: true
          }
      },
      { 
          field: 'status',
          headerName: 'Order Status',
          filter: 'agSetColumnFilter',
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
              values: getOrderStatusDisplayValues().map(v => v.label)
          },
          valueGetter: (params: any) => OrderStatus[params.data.status],
      },
      {
          field: 'subtotal',
          headerName: 'Subtotal',
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
      },
      { 
          field: 'paymentMethod',
          headerName: 'Payment Method',
          filter: 'agSetColumnFilter',
          valueGetter: (params: any) => PaymentMethod[params.data.paymentMethod],
          filterParams: {
              values: getPaymentMethodDisplayValues().map(v => v.label)
          }
      },
      { 
          field: 'paymentStatus',
          headerName: 'Payment Status',
          filter: 'agSetColumnFilter',
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
              values: getPaymentStatusDisplayValues().map(v => v.label)
          },
          valueGetter: (params: any) => PaymentStatus[params.data.paymentStatus],
      },
      { 
          field: 'hasCoupon',
          headerName: 'Has Coupon',
          filter: 'agSetColumnFilter',
          valueFormatter: (params: any) => params.value ? 'Yes' : 'No'
      },
      { 
          field: 'discount',
          headerName: 'Discount',
          filter: 'agNumberColumnFilter',
          valueFormatter: (params: any) => `${params.value} грн`
      },
      { 
          field: 'deliveryFee',
          headerName: 'Delivery Fee',
          filter: 'agNumberColumnFilter',
          valueFormatter: (params: any) => `${params.value} грн`
      },
      { 
          field: 'couponId', 
          headerName: 'Coupon', 
          filter: 'agNumberColumnFilter', 
      },
      {
          field: 'collectedDate',
          headerName: 'Collected Date',
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
      },
      {
          field: 'deliveredDate',
          headerName: 'Delivered Date',
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
      },
      {
          field: 'userId',
          hide: true,
          headerName: 'Customer',
          filter: 'agTextColumnFilter',
          cellRenderer: UserCellRenderer,
      },
      {
          field: 'addressId',
          headerName: 'Delivery Address',
          filter: 'agTextColumnFilter',
          cellRenderer: UserAddressCellRenderer,
      },
      {
          field: 'createdAt',
          headerName: 'Created At',
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
      }
  ]);

  const defaultColDef = useMemo(() => ({
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      editable: false,
      flex: 1,
  }), []);

  const { mode } = useColorScheme();
  const themeName = (mode === 'light') ? "ag-theme-alpine" : "ag-theme-alpine-dark";

  const isLoading = ordersLoading || authLoading || !addresses.length;
  if (isLoading) return <div>Loading...</div>;
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
                      rowData={userOrders}
                      domLayout="normal"
                      getRowId={p => p.data.id}
                      columnDefs={columnDefs}
                      defaultColDef={defaultColDef}
                      suppressRowTransform={true}
                  />
              </div>
          </Box>
      </Box>
  );
}