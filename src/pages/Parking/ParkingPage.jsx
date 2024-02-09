import React from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import { parkings } from "../../data/parkings";

const ParkingPage = () => {
  const navigate = useNavigate();
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "parking_lot", headerName: "Parking Lot", flex: 1 },
    { field: "parking_space", headerName: "Parking Space", flex: 1 },
    { field: "vehicle_type", headerName: "Vehicle Type", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <Typography>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#8DBF41",
              borderColor: "#8DBF41",
              color: "black",
              ":hover": {
                backgroundColor: "black",
                color: "#8DBF41",
              },
            }}
            onClick={() => {
              navigate(`/parkings/${params.row.id}`);
            }}
          >
            View
          </Button>
        </Typography>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-y-8 h-full w-[80%]">
      <div className="font-bold">Parking</div>
      <div style={{ height: "80vh", width: "100%" }}>
        <DataGrid
          rows={parkings}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[1]}
        />
      </div>
    </div>
  );
};

export default ParkingPage;
