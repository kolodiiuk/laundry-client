import { CircularProgress, useColorScheme } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { createService, deleteService, fetchAllServices, updateService } from "../../app/store/slices/ServiceSlice";
import { Button, Box } from "@mui/material";
import { Service, ServiceCategory, UnitType } from "../../app/models/Service";

export default function AdminServices() {
    const gridRef = useRef<any>();
    const dispatch = useAppDispatch();
    const { services, loading, error } = useAppSelector(state => state.services);
    useEffect(() => {
        void dispatch(fetchAllServices());
    }, [dispatch]);

    const getCategoryDisplayValues = () => {
        return Object.keys(ServiceCategory)
            .filter(k => isNaN(Number(k)))
            .map(k => ({ 
                label: k, 
                value: ServiceCategory[k as keyof typeof ServiceCategory]
            }));
    };

    const getUnitTypeDisplayValues = () => {
        return Object.keys(UnitType)
            .filter(k => isNaN(Number(k)))
            .map(k => ({ 
                label: k, 
                value: UnitType[k as keyof typeof UnitType]
            }));
    };

    const [columnDefs] = useState([
        { field: 'id', hide: true, editable: false },
        { field: 'name', headerName: 'Name' },
        { 
            field: 'category', 
            headerName: 'Category',
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: getCategoryDisplayValues().map(v => v.label)
            },
            valueGetter: (params: any) => {
                return params.data?.category !== undefined 
                    ? ServiceCategory[params.data.category] 
                    : '';
            },
            valueSetter: (params: any) => {
                const value = ServiceCategory[params.newValue as keyof typeof ServiceCategory];
                const updatedData = { ...params.data, category: value };
                params.node.setData(updatedData);
                return true;
            }
        },
        { field: 'description', headerName: 'Description', editable: true },
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
                return params.data?.unitType !== undefined 
                    ? UnitType[params.data.unitType] 
                    : '';
            },
            valueSetter: (params: any) => {
                const value = UnitType[params.newValue as keyof typeof UnitType];
                const updatedData = { ...params.data, unitType: value };
                params.node.setData(updatedData);
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
        }
    ]);

    const defaultColDef = useMemo(() => ({
        filter: 'agTextColumnFilter',
        floatingFilter: true,
        sortable: true,
        flex: 1,
        editable: true,
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

    const createNewService = (): Service => ({  
        id: -10,
        name: '',
        category: ServiceCategory.Washing,
        description: '',
        pricePerUnit: 0,
        unitType: UnitType.Piece,
        isAvailable: true
    });

    const handleAdd = () => {
        const newService = createNewService();
        if (gridRef.current) {
            gridRef.current.api.applyTransaction({
                add: [newService],
                addIndex: 0
            });
            
            gridRef.current.api.startEditingCell({
                rowIndex: 0,
                colKey: 'name'
            });
        }
    };

    const handleDelete = (serviceId: number) => {
        void dispatch(deleteService(serviceId));
    };

    const onRowEditingStopped = useCallback((event: any) => {
        const data = event.data;
        
        if (data.id < 0) {
            const { id, ...serviceToCreate } = data;
            dispatch(createService(serviceToCreate));
        } else {
            dispatch(updateService(data));
        }
    }, [dispatch]);

    const { mode } = useColorScheme();
    const themeName = (mode === 'light') ? "ag-theme-alpine" : "ag-theme-alpine-dark";

    if (loading) {
        return <CircularProgress/>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

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
                        mb: { xs: 2, sm: 0 },
                    }}
                >
                    Add New Service
                </Button>
            </Box>
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
                        rowData={services}
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
        </Box>
    );
}
