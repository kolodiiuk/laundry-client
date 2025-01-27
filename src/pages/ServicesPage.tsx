import { AgGridReact } from 'ag-grid-react'; 
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useState, useEffect } from 'react';
import { useColorScheme } from "@mui/material/styles";
import { AddToBasketCellRenderer } from "../components/AddToBasketCellRenderer.tsx";
import { useAppDispatch, useAppSelector } from '../app/store/configureStore';
import { fetchAllAvailableServices } from '../app/store/slices/ServiceSlice';
import { Button } from '@mui/material';
import agent from '../app/api/agent.ts';
import { UnitType } from '../app/models/Service.ts';
import { calculateBasketTotal, getBasket } from '../app/store/slices/BasketSlice.ts';

export default function ServicesPage() {
    const dispatch = useAppDispatch();
    const { filteredServices, loading, error } = useAppSelector(state => state.services);
    const {user, isAuthenticated} = useAppSelector(state => state.auth);
    useEffect(() => {
        void dispatch(fetchAllAvailableServices());
        if (isAuthenticated) {
            dispatch(getBasket(user?.id))
            dispatch(calculateBasketTotal())
        }
    }, [dispatch]);

    const [columnDefs] = useState([
        { 
            field: 'name', 
            headerName: 'Name',            
            filter: 'agTextColumnFilter',
            floatingFilter: true,
        },
        { 
            field: 'pricePerUnit', 
            headerName: 'Price', 
            filter: 'agNumberColumnFilter',
            floatingFilter: true
        },
        { 
            field: 'unitType', 
            headerName: 'Unit', 
            filter: 'agTextColumnFilter',
            floatingFilter: true,
            valueGetter: (params: any) => {
                return UnitType[params.data.unitType];
            }
        },
        { 
            field: 'addToBasket', 
            headerName: 'Add to Basket',
            cellRenderer: AddToBasketCellRenderer 
        },
    ]);

    const handlePriceList = () => {
        agent.Reports.priceList()
          .then(response => {
            const blob = new Blob([response.data], { type: 'application/pdf' });
      
            const url = window.URL.createObjectURL(blob);
      
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'price_list.pdf');
            document.body.appendChild(link);
      
            link.click();
      
            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);
          })
          .catch(error => {
            console.error('Error fetching price list:', error);
          });
      };

    const { mode } = useColorScheme();
    const themeName = (mode === 'light') 
        ? "ag-theme-alpine" 
        : "ag-theme-alpine-dark";

    if (loading) 
        return <div>Loading...</div>;
    if (error) 
        return <div>Error: {error}</div>;

    return (
        <div>
            <Button
                onClick={handlePriceList}
            >
                Get Price List in pdf
                </Button>

            <div
                className={themeName}
                style={{ height: '80vh', width: '98vw' }}
            >
                <AgGridReact
                    rowData={filteredServices}
                    columnDefs={columnDefs}
                />
            </div>
        </div>
    );
};