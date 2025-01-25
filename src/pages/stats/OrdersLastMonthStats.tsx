import {useEffect, useState} from "react";
import agent from "../../app/api/agent";
import {AgGridReact} from "ag-grid-react";
import Box from "@mui/material/Box";

export default function OrdersLastMonthStats() {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await agent.Statistics.lastMonthStats();
        setRowData(data);
      } catch (error) {
        console.error("Failed to fetch last month orders stats:", error);
      }
    };

    fetchData();
  }, []);

  const columnDefs = [
    {headerName: "День", field: "day", sortable: true, filter: true},
    {headerName: "Кількість замовлень", field: "orderCountPerDay", sortable: true, filter: true},
    {headerName: "Сума", field: "totalPerDay", sortable: true, filter: true},
  ];

  return (
    <Box
      sx={{width: 'calc(100vw - 24vw)', height: 'calc(100vh - 150px)'}}
    >
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