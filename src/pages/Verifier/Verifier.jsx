import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import BasicModal from "../../components/Modal/Modal";
import Fetch from "../../utils/Fetch";
import { ApiConfig } from "../../utils/config";
import formatDate from "../../utils/date";
import Swal from "sweetalert2";
import X from "../../assets/x.png";

const Verifier = () => {
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState({ results: [] });
  const [verificationVehicle, setVerificationVehicle] = useState({});
  const [newNumberPlate, setNewNumberPlate] = useState("");
  const [modal, showModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Fetch.post(
      ApiConfig.verification + `/${verificationVehicle.id}/${newNumberPlate}/`,
      {}
    );
    if (response.status === 200) {
      Swal.fire("Success", "Number Plate Verified Successfully", "success");
      setNewNumberPlate("");
      fetchVehicles({ next: null });
    } else {
      Swal.fire("Error", "Error Adding Parking", "error");
    }
    setOpen(false);
  };

  const fetchVehicles = async ({ next = null }) => {
    if (next) {
      setIsPageLoading(true);
      const response = await Fetch.get(next);
      if (response.status === 200) {
        const data = await response.json();
        setVehicles(data);
        setIsPageLoading(false);
        return;
      }
    }
    setIsPageLoading(true);
    const response = await Fetch.get(ApiConfig.unverifiedVehicles + "/");
    if (response.status === 200) {
      const data = await response.json();
      setVehicles(data);
      setIsPageLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchVehicles({});
    setIsLoading(false);
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      renderCell: (params) => (
        <Typography>
          {paginationModel.page * 10 +
            (vehicles.results.indexOf(params.row) + 1)}
        </Typography>
      ),
    },
    { field: "number_plate", headerName: "Predicted Number Plate", flex: 1 },
    { field: "entry_gate", headerName: "Entry Gate", flex: 1 },
    { field: "parking_name", headerName: "Parking Name", flex: 1 },
    {
      field: "entry_time",
      headerName: "Entry Time",
      flex: 1,
      renderCell: (params) => (
        <Typography>{formatDate(params.row.entry_time)}</Typography>
      ),
    },
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
            onClick={async () => {
              const response = await Fetch.post(
                ApiConfig.verification + `/${params.row.id}/${null}/`,
                {}
              );
              if (response.status === 200) {
                fetchVehicles({});
              }
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
              setVerificationVehicle(params.row);
              setOpen(true);
            }}
          >
            Deny
          </Button>
        </Typography>
      ),
    },
  ];

  const handlePageChange = (newPage) => {
    console.log(newPage);
    setPaginationModel((prevModel) => ({
      ...prevModel,
      page: newPage,
    }));
    fetchVehicles({ next: vehicles.next });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-y-8 h-full w-[80%]">
      <div className="font-bold">Verifier</div>
      <div style={{ height: "80vh", width: "100%" }}>
        <DataGrid
          rows={vehicles.results}
          columns={columns}
          pageSize={paginationModel.pageSize}
          rowsPerPageOptions={[paginationModel.pageSize]}
          pagination
          paginationModel={paginationModel}
          rowCount={vehicles.count}
          paginationMode="server"
          onPaginationModelChange={(newPage) => handlePageChange(newPage.page)}
          loading={isPageLoading}
        />
      </div>
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-60 z-40"
            onClick={() => setOpen(false)}
          ></div>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative mx-auto w-1/2 fkex flex-column justify-center items-center">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-2xl font=semibold">
                    Verify Number Plate
                  </h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => {
                      setOpen(false);
                      setNewNumberPlate("");
                    }}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block py-0 rounded-full">
                      <img src={X} alt="close" />
                    </span>
                  </button>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="p-6">
                    <img
                      src={verificationVehicle.vehicle_image}
                      alt="Cropped Image"
                      height={100}
                      style={{ objectFit: "cover", maxHeight: "100px" }}
                    />
                  </div>
                  <form className="rounded w-full" onSubmit={handleSubmit}>
                    <div className="flex flex-col justify-between pt-4 px-4">
                      <label htmlFor="Number Plate" className="text-sm">
                        Number Plate
                      </label>
                      <input
                        type="text"
                        className="border-b-2 border-black py-2 outline-none"
                        value={newNumberPlate}
                        onChange={(e) =>
                          setNewNumberPlate(String(e.target.value).trim())
                        }
                      />
                    </div>
                    <div className="flex justify-end p-4">
                      <button
                        type="submit"
                        className="bg-black text-white py-2 px-4 rounded hover:bg-[#8DBF41] transition duration-300 ease-in-out"
                      >
                        Verify
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Verifier;
