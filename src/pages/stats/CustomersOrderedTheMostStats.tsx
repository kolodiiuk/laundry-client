import {useEffect, useState} from "react";
import agent from "../../app/api/agent";
import {AgGridReact} from "ag-grid-react";
import {Box} from "@mui/material";

export default function CustomersOrderedTheMostStats() {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await agent.Statistics.frequentCustomers();
        setRowData(data);
      } catch (error) {
        console.error("Failed to fetch 10 customers who ordered the most:", error);
      }
    };

    fetchData();
  }, []);

  const columnDefs = [
    {headerName: "Ім'я", field: "firstName", sortable: true, filter: true},
    {headerName: "Прізвище", field: "lastName", sortable: true, filter: true},
    {headerName: "Кількість замовлень", field: "orderCount", sortable: true, filter: true},
    {headerName: "Сума", field: "sumOrders", sortable: true, filter: true},
    {headerName: "Середній рейтинг", field: "avgRating", sortable: true, filter: true},
  ];

  return (
    <Box sx={{width: 'calc(100vw - 24vw)', height: 'calc(100vh - 150px)'}}>
      <div className="ag-theme-alpine"
           style={{height: '100%', width: '100%'}}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
        />
      </div>
    </Box>
  );
}