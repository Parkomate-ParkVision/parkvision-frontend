import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import { parkings } from "../../data/parkings";
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import BasicModal from "../../components/Modal/Modal";



const Retrainer = () => {
  const navigate = useNavigate();

  const [modal, showModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "parking_lot", headerName: "Parking Lot", flex: 1 },
    { field: "parking_space", headerName: "Parking Space", flex: 1 },
    { field: "vehicle_type", headerName: "Vehicle Type", flex: 1 },
    { field: "predicted_license_plate", headerName: "Predicted License Plate", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "accept",
      headerName: "Accept",
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
            //   navigate(`/parkings/${params.row.id}`);
                // setOpen(true);
            }}
          >
            Accept
          </Button>
        </Typography>
      ),
    },
    {
        field: "deny",
        headerName: "Deny",
        width: 150,
        renderCell: (params) => (
          <Typography>
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: "red",
                borderColor: "#8DBF41",
                color: "black",
                ":hover": {
                  backgroundColor: "black",
                  color: "#8DBF41",
                },
              }}
              onClick={() => {
                // navigate(`/parkings/${params.row.id}`);
                setOpen(true)
              }}
            >
              Deny
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
      {open && (<div>
        <BasicModal open={open} handleClose={handleClose} handleOpen={handleOpen} />
      </div>)}
    </div>
  );
};

export default Retrainer;
