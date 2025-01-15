import React, { useCallback, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const GridExample = () => {
  const gridRef = useRef(); // Reference to the grid
  const [rowData, setRowData] = useState([
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Smith', age: 30 },
  ]);

  // Column definitions
  const columnDefs = useMemo(
    () => [
      { field: 'id', editable: false }, // Non-editable column
      { field: 'name', editable: true }, // Editable column
      { field: 'age', editable: true }, // Editable column
      {
        field: 'actions',
        cellRenderer: (params) => (
          <button onClick={() => deleteRow(params.data)}>Delete</button>
        ),
      },
    ],
    []
  );

  // Default column definitions
  const defaultColDef = useMemo(
    () => ({
      editable: true, // Make all columns editable by default
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  );

  // Add a new row
  const addRow = () => {
    const newRow = { id: rowData.length + 1, name: '', age: 0 }; // Default values for a new row
    setRowData([...rowData, newRow]);
    gridRef.current.api.applyTransaction({ add: [newRow] });
    console.log("add")
  };

  // Delete a row
  const deleteRow = (row) => {
    gridRef.current.api.applyTransaction({ remove: [row] });
    console.log(`delete ${row}`);
  };

  // Handle cell value changes
  const onCellValueChanged = useCallback((event) => {
    console.log('Cell value changed:', event.data);
    // Send the updated row to the backend (e.g., via API call)
  }, []);

  // Handle row editing stopped
  const onRowEditingStopped = useCallback((event) => {
    console.log('Row editing stopped:', event.data);
    // Handle the update (e.g., send to backend)
  }, []);

  return (
    <div>
      <div
        className="ag-theme-alpine"
        style={{ height: 400, width: 600, margin: '20px auto' }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          editType="fullRow"
          onCellValueChanged={onCellValueChanged}
          onRowEditingStopped={onRowEditingStopped}
        />
      </div>
      <button onClick={addRow} style={{ margin: '10px' }}>
        Add Row
      </button>
    </div>
  );
};

export default GridExample;