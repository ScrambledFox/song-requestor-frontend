import React, { useState, useEffect, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";

import "../App.css";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

const YoutubeIdToURL = (id) => {
  return "https://www.youtube.com/watch?v=" + id;
};

const LinkRenderer = (params) => {
  console.log(params);
  return (
    <span className="link-renderer">
      <img
        src={params.data.thumbnail_url}
        className="img-thumbnail"
        onClick={() => {
          window.open(
            YoutubeIdToURL(params.data.youtube_id),
            "_blank",
            "noopener,noreferrer"
          );
        }}
      />
    </span>
  );
};

const SongTable = () => {
  const gridRef = useRef();

  const [rowData, setRowData] = useState();

  const [columnDefs, setColumnDefs] = useState([
    { headerName: "Title", field: "title", resizable: true },
    { headerName: "Artist", field: "artist", resizable: true },
    { headerName: "Link", field: "youtube_link", cellRenderer: LinkRenderer },
  ]);

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  // Load data from server
  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL)
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: "80vh", width: "80vw" }}>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        animateRows={true}
        rowSelection="multiple"
        onCellClicked={cellClickedListener}
      />
    </div>
  );
};

export default SongTable;
