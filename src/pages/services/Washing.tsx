import { AgGridReact } from 'ag-grid-react'; 
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useMemo, useState } from 'react';
import {useColorScheme} from "@mui/material/styles";
import {AddToBasketCellRenderer} from "../../components/AddToBasketCellRenderer.tsx";

const data = [
    { name: "washing", price: 150, unit: 'pcs' },
    { name: "washing", price: 150, unit: 'pcs' },
    { name: "washing", price: 150, unit: 'pcs' },
    { name: "washing", price: 150, unit: 'pcs' },
    { name: "washing", price: 150, unit: 'pcs' },
    { name: "washing", price: 150, unit: 'pcs' },
    { name: "washing", price: 150, unit: 'pcs' },
    { name: "washing", price: 150, unit: 'pcs' },
    { name: "washing", price: 150, unit: 'pcs' },
    { name: "washing", price: 150, unit: 'pcs' },
    { name: "washing", price: 150, unit: 'pcs' },
    { name: "washing", price: 150, unit: 'pcs' },
    { name: "washing", price: 150, unit: 'pcs' },
];

export default function Washing() {

    const [rowData, setRowData] = useState(data);
    const [columnDefs, setColumnDefs] = useState([
        
        { field: 'name'},
        { field: 'price', filter: 'agNumberColumnFilter' },
        { field: 'unit', filter: 'agNumberColumnFilter' },
        { field: 'addToBasket', cellRenderer: AddToBasketCellRenderer},
    ]);

    const defaultColDef = useMemo(() => {
        return {
            filter: 'agTextColumnFilter',
            floatingFilter: true,
        };
    }, []);
    
    const {mode, setMode} = useColorScheme();
    const themeName = (mode == 'light') 
        ? "ag-theme-alpine" 
        : "ag-theme-alpine-dark";

    return (
        <div
            className={ themeName }
            style={{ height: '80vh', width: '98vw' }}
        >
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                onRowClicked = {(e) => console.log(e)}

            />
        </div>
    )
};
      