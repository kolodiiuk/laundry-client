import type {CustomCellRendererProps} from "@ag-grid-community/react";
import {type FunctionComponent, useState} from "react";
import Button from "@mui/material/Button";

export const AddToBasketCellRenderer: FunctionComponent<CustomCellRendererProps> = ({ data }) => {
    
    const [itemNumber, setItemNumber] = useState(1);
    return (
        <Button sx={{width: '100%',
            height: '100%',
            padding: 0,
            margin: 0,
            border: 'none'}}>click me</Button>
    );
};
