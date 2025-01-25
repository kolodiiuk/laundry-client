import { Button, useColorScheme, Box } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { Address } from "../../app/models/Address";

export default function CustomerProfile() {
    const gridRef = useRef<any>();
    const dispatch = useAppDispatch();
    const { addresses, loading, error } = useAppSelector(state => state.auth);
    const { user } = useAppSelector(state => state.auth);
    console.log(addresses);
    useEffect(() => {
        void dispatch(fetchUserAddresses());
    }, [dispatch]);

    const [columnDefs] = useState([
        { field: 'id', hide: true },
        { field: 'city', headerName: 'City', editable: true },
        { field: 'district', headerName: 'District', editable: true },
        { field: 'street', headerName: 'City', editable: true },
        { field: 'house', headerName: 'Building', editable: true },
        { field: 'apartment', headerName: 'Apartments', editable: true },
        {
            headerName: 'Actions',
            field: 'actions',
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
    }), []);

    const createNewAddress = (): Omit<Address, 'id'> & { id: number } => ({
        id: -Math.floor(Math.random() * 1000), // Temporary negative ID
        city: '',
        district: '',
        street: '',
        house: '',
        apartment: '',
        userId: user.id
    });

    const handleAdd = () => {
        const newService = createNewAddress();
        if (gridRef.current) {
            // Add new row and start editing
            gridRef.current.api.applyTransaction({
                add: [newService],
                addIndex: 0
            });
            
            // Start editing the new row
            gridRef.current.api.startEditingCell({
                rowIndex: 0,
                colKey: 'name'
            });
        }
    };

    const handleDelete = (id: number) => {
        console.log(id);
        void dispatch(deleteAddress(id));
    };

    const onRowEditingStopped = useCallback((event: any) => {
        const data = event.data;
        
        // If this is a newly added row (has negative id)
        if (data.id < 0) {
            // Remove temporary id for creation
            const { id, ...addressToCreate } = data;
            console.log(addressToCreate)
            dispatch(createAddress(addressToCreate))
                .unwrap()
                .then(() => {
                    dispatch(fetchUserAddresses());
                })
                .catch((error) => {
                    console.error('Failed to create address:', error);
                    // Remove failed row
                    gridRef.current?.api.applyTransaction({
                        remove: [data]
                    });
                });
        } else {
            // Normal update
            console.log(data);
            dispatch(updateAddress(data));
        }
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