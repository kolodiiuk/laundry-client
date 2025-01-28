import {Button, useColorScheme, Box, CircularProgress} from "@mui/material";
import {AgGridReact} from "ag-grid-react";
import {useRef, useEffect, useState, useMemo, useCallback} from "react";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore";
import {Address} from "../../app/models/Address";
import {createAddress, deleteAddress, fetchUserAddresses, updateAddress} from "../../app/store/slices/AuthSlice";

export default function CustomerProfile() {
  const gridRef = useRef<any>();
  const dispatch = useAppDispatch();
  const {addresses, loading, error} = useAppSelector(state => state.auth);
  const {user} = useAppSelector(state => state.auth);
  useEffect(() => {
    void dispatch(fetchUserAddresses());
  }, [dispatch]);

  const [columnDefs] = useState([
    { field: 'id', hide: true },
    { field: 'city', headerName: 'City' },
    { field: 'district', headerName: 'District' },
    { field: 'street', headerName: 'Street' },
    { field: 'house', headerName: 'Building' },
    { field: 'apartments', headerName: 'Apartments' },
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

  const createNewAddress = (): Omit<Address, 'id'> & { id: number } => ({
    id: -Math.floor(Math.random() * 1000),
    city: '',
    district: '',
    street: '',
    house: '',
    apartments: '',
    userId: user ? user.id : -1
  });

  const handleAdd = () => {
    const newAddress = createNewAddress();
    if (gridRef.current) {
      gridRef.current.api.applyTransaction({
        add: [newAddress],
        addIndex: 0
      });

      gridRef.current.api.startEditingCell({
        rowIndex: 0,
        colKey: 'city'
      });
    }
  };

  const handleDelete = (id: number) => {
    void dispatch(deleteAddress(id));
  };

  const onRowEditingStopped = useCallback((event: any) => {
    const data = event.data;

    if (data.id < 0) {
      const {id, ...addressToCreate} = data;
      dispatch(createAddress(addressToCreate));
    } else {
      dispatch(updateAddress(data));
    }
  }, [dispatch]);

  const {mode} = useColorScheme();
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
            mb: {xs: 2, sm: 0},
          }}
        >
          Add New Address
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
            rowData={addresses}
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