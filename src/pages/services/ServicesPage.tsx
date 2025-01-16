import { AgGridReact } from 'ag-grid-react'; 
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useMemo, useState, useEffect } from 'react';
import { useColorScheme } from "@mui/material/styles";
import { AddToBasketCellRenderer } from "../../components/AddToBasketCellRenderer.tsx";
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchAllAvailableServices } from '../../app/store/slices/ServiceSlice';

export default function ServicesPage() {
    const dispatch = useAppDispatch();
    const { filteredServices, loading, error } = useAppSelector(state => state.services);

    useEffect(() => {
        void dispatch(fetchAllAvailableServices());
    }, [dispatch]);

    const [columnDefs, setColumnDefs] = useState([
        { field: 'name', headerName: 'Name' },
        { field: 'pricePerUnit', headerName: 'Price', filter: 'agNumberColumnFilter' },
        { field: 'unitType', headerName: 'Unit', filter: 'agNumberColumnFilter' },
        { field: 'addToBasket', headerName: 'Add to Basket', cellRenderer: AddToBasketCellRenderer },
    ]);

    const defaultColDef = useMemo(() => {
        return {
            filter: 'agTextColumnFilter',
            floatingFilter: true,
        };
    }, []);

    const { mode } = useColorScheme();
    const themeName = (mode === 'light') 
        ? "ag-theme-alpine" 
        : "ag-theme-alpine-dark";

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div
            className={themeName}
            style={{ height: '80vh', width: '98vw' }}
        >
            <AgGridReact
                rowData={filteredServices}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                onRowClicked={(e) => console.log(e)}
            />
        </div>
    );
};