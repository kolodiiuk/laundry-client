import { Box, Button, useColorScheme, CircularProgress } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { createCoupon, deleteCoupon, fetchCoupons, updateCoupon } from "../../app/store/slices/CouponsSlice";
import { Coupon } from "../../app/models/Coupon";
import { fetchAllServices } from "../../app/store/slices/ServiceSlice";
import ServiceSelectionDialog from '../../components/coupons/ServiceSelectionDialog';

export default function AdminCoupons() {
    const gridRef = useRef<any>();
    const dispatch = useAppDispatch();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentEditingRow, setCurrentEditingRow] = useState<any>(null);
    
    useEffect(() => {
        Promise.all([
            dispatch(fetchCoupons()),
            dispatch(fetchAllServices())
        ]);
    }, [dispatch]);
    const {coupons, loading: couponsLoading, error} = useAppSelector(state => state.coupons);
    const { services, loading: servicesLoading } = useAppSelector(state => state.services);      
  
    const [columnDefs] = useState([
      { field: 'id', hide: true },
      { field: 'code', headerName: 'Code' },
      { field: 'percentage', headerName: 'Percentage' },
      { 
        field: 'startDate', 
        headerName: 'Start Date',
        valueFormatter: (params: any) => {
            return params.value ? new Date(params.value).toLocaleDateString() : '';
        },
        valueSetter: (params: any) => {
            const updatedData = {
                ...params.data,
                startDate: new Date(params.newValue).toISOString()
            };
            params.node.setData(updatedData);
            return true;
        }
      },
      { 
        field: 'endDate', 
        headerName: 'End Date',
        valueFormatter: (params: any) => {
            return params.value ? new Date(params.value).toLocaleDateString() : '';
        },
        valueSetter: (params: any) => {
            const updatedData = {
                ...params.data,
                endDate: new Date(params.newValue).toISOString()
            };
            params.node.setData(updatedData);
            return true;
        }
      },
      { field: 'usedCount', headerName: 'Used Count' },
      {
        headerName: 'Actions',
        field: 'actions',
        editable: false,
        cellRenderer: (params: any) => (
          <Button
            color="error"
            size="small"
            onClick={() => handleDelete(params.data.id)}
          >
            Delete
          </Button>
        ),
      },
      { 
        field: 'serviceIds',
        headerName: 'Applicable Services',
        editable: false,
        cellRenderer: (params: any) => {
            const serviceCount = params.value?.length || 0;
            return (
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                        setCurrentEditingRow(params.data);
                        setDialogOpen(true);
                    }}
                >
                    {serviceCount} services selected
                </Button>
            );
        },
        valueFormatter: (params: any) => {
            if (!params.value?.length) return '0 services';
            return `${params.value.length} services`;
        }
      }
    ]);
  
    const defaultColDef = useMemo(() => ({
      editable: true,
      flex: 1,
      valueSetter: (params: any) => {
        const newValue = params.newValue;
        const field = params.colDef.field;
  
        const updatedData = {
          ...params.data,
          [field]: newValue
        };
  
        params.node.setData(updatedData);
        return true;
      }
    }), []);
  
    const createNewCoupon = (): Omit<Coupon, 'id'> & { id: number } => ({
      id: -Math.floor(Math.random() * 1000),
      code: '',
      percentage: 0,
      startDate: new Date(),
      endDate: new Date(),
      usedCount: 0,
      serviceIds: []
    });
  
    const handleAdd = () => {
      const newCoupon = createNewCoupon();
      if (gridRef.current) {
        gridRef.current.api.applyTransaction({
          add: [newCoupon],
          addIndex: 0
        });
  
        gridRef.current.api.startEditingCell({
          rowIndex: 0,
          colKey: 'id'
        });
      }
    };
  
    const handleDelete = (id: number) => {
      void dispatch(deleteCoupon(id));
    };
  
    const onRowEditingStopped = useCallback((event: any) => {
      const data = event.data;
  
      if (data.id < 0) {
        const {id, ...couponToCreate} = data;
        dispatch(createCoupon(couponToCreate));
      } else {
        dispatch(updateCoupon(data));
      }
    }, [dispatch]);
  
    const {mode} = useColorScheme();
    const themeName = (mode === 'light') ? "ag-theme-alpine" : "ag-theme-alpine-dark";
  
    const isLoading = servicesLoading || couponsLoading || !services.length;
    if (isLoading) return <CircularProgress />;
    if (error) return <div>Error: {error}</div>;

    const handleServiceSelection = (serviceIds: number[]) => {
        if (currentEditingRow && gridRef.current) {
            const updatedData = { ...currentEditingRow, serviceIds };
            const node = gridRef.current.api.getRowNode(currentEditingRow.id);
            if (node) {
                node.setData(updatedData);
                dispatch(updateCoupon(updatedData));
            }
        }
    };

    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        p: 2,
        gap: 2
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          flexWrap: 'wrap',
        }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAdd}
            size="medium"
            sx={{
              minWidth: '150px',
              mb: {xs: 2, sm: 0},
            }}
          >
            Add New Coupon
          </Button>
        </Box>
        <Box sx={{width: 'calc(100vw - 24vw)', height: 'calc(100vh - 150px)'}}>
          <div
            className={themeName}
            style={{
              width: '100%',
              height: '100%'
            }}
          >
            <AgGridReact
              ref={gridRef}
              rowData={coupons}
              domLayout="normal"
              getRowId={p => p.data.id}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              editType="fullRow"
              onRowEditingStopped={onRowEditingStopped}
              stopEditingWhenCellsLoseFocus={true}
              stopEditingWhenGridLosesFocus={false}
              suppressRowTransform={true}
              singleClickEdit={true}
            />
          </div>
        </Box>
        <ServiceSelectionDialog
            open={dialogOpen}
            onClose={() => {
                setDialogOpen(false);
                setCurrentEditingRow(null);
            }}
            selectedServices={currentEditingRow?.serviceIds || []}
            onSave={handleServiceSelection}
        />
      </Box>
    );
}