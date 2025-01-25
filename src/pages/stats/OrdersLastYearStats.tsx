import {AgGridReact} from "ag-grid-react";
import {useState, useEffect} from "react";
import agent from "../../app/api/agent";
import Box from "@mui/material/Box";

export default function OrdersLastYearStats() {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await agent.Statistics.lastYearStats();
        setRowData(data);
      } catch (error) {
        console.error("Failed to fetch last year orders stats:", error);
      }
    };

    fetchData();
  }, []);

  const columnDefs = [
    {headerName: "Місяць", field: "month", sortable: true, filter: true},
    {headerName: "Кількість замовлень", field: "orderCountPerMonth", sortable: true, filter: true},
    {headerName: "Усього за місяць", field: "totalPerMonth", sortable: true, filter: true},
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