import {AgGridReact} from "ag-grid-react";
import {useState, useEffect} from "react";
import agent from "../../app/api/agent";
import Box from "@mui/material/Box";
import {UnitType} from "../../app/models/Service.ts";

export default function ServicesOrderedTheMostStats() {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await agent.Statistics.frequentServices();
        setRowData(data);
      } catch (error) {
        console.error("Failed to fetch 10 services ordered the most:", error);
      }
    };

    fetchData();
  }, []);

  const columnDefs = [
    {headerName: "Назва послуги", field: "name", sortable: true, filter: true},
    {headerName: "Категорія послуги", field: "serviceCategory", sortable: true, filter: true},
    {headerName: "Вартість послуги", field: "servicePrice", sortable: true, filter: true},
    {
      headerName: "Одиниця вимірювання",
      field: "unitType",
      sortable: true,
      filter: true,
      valueGetter: (params: any) => {
        return UnitType[params.data.unitType];
      },
    },
    {headerName: "Кількість замовлень", field: "orderCount", sortable: true, filter: true},
    {
      headerName: "Кількість клієнтів, які замовили послугу",
      field: "clientOrderedServiceCount",
      sortable: true,
      filter: true
    },
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