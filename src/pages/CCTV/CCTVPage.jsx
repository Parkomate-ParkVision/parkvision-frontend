import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import Fetch from "../../utils/Fetch";
import { ApiConfig } from "../../utils/config";
import Swal from "sweetalert2";
import X from "../../assets/x.png";
import { toast } from "react-toastify";

const CCTVPage = () => {
  const [cctvs, setCctvs] = useState({ results: [] });
  const [newCctv, setNewCctv] = useState({});
  const [updateCctv, setUpdateCctv] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [parking, setParking] = useState({ results: [] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newCctv);
    const response = await Fetch.post(ApiConfig.cctvs + "/", newCctv);
    if (response.status === 200) {
      Swal.fire("Success", "Parking Added Successfully", "success");
      fetchCctvs({ next: null });
      setNewCctv({});
    } else {
      Swal.fire("Error", "Error Adding Parking", "error");
    }
    setShowModal(false);
  };

  const handleUpdate = async (id) => {
    console.log(updateCctv);
    const response = await Fetch.put(
      ApiConfig.cctvs + "/" + id + "/",
      updateCctv
    );
    if (response.status === 200) {
      Swal.fire("Success", "Parking Updated Successfully", "success");
      fetchCctvs({ next: null });
      setShowUpdateModal(false);
    } else {
      Swal.fire("Error", "Error Updating Parking", "error");
    }
  };

  const fetchCctvs = async ({ next = null }) => {
    if (next) {
      setIsLoading(true);
      try {
        const response = await Fetch.get(next);
        if (response.status === 200) {
          const data = await response.json();
          setCctvs(data);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    } else {
      setIsLoading(true);
      try {
        const response = await Fetch.get(ApiConfig.cctvs + "/");
        if (response.status === 200) {
          const data = await response.json();
          console.log(data);
          setCctvs(data);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  const fetchParking = async () => {
    try {
      const response = await Fetch.get(ApiConfig.parkings + "/");
      if (response.status === 200) {
        const data = await response.json();
        setParking(data);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCctvs({ next: null });
    fetchParking();
  }, []);

  const columns = [
    {
      field: "Sr. No.",
      headerName: "Sr. No.",
      flex: 0.5,
      renderCell: (params) => (
        <Typography>{cctvs.results.indexOf(params.row) + 1}</Typography>
      ),
    },
    ,
    { field: "parkingName", headerName: "Parking", flex: 1 },
    { field: "name", headerName: "name", flex: 1 },
    { field: "url", headerName: "url", flex: 1 },
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
            onClick={(e) => {
              console.log(params.row.id);
              setUpdateCctv({
                id: params.row.id,
                name: params.row.name,
                parking: params.row.parking,
                url: params.row.url,
              });
              setShowUpdateModal(true);
            }}
          >
            Update
          </Button>
        </Typography>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 150,
      renderCell: (params) => (
        <Typography>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "red",
              borderColor: "red",
              color: "black",
              ":hover": {
                backgroundColor: "black",
                color: "white",
              },
            }}
            onClick={(e) => {
              console.log(params.row.id);
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
              }).then(async (result) => {
                if (result.isConfirmed) {
                  const response = await Fetch.delete(
                    ApiConfig.cctvs + "/" + params.row.id + "/"
                  );
                  if (response.status === 200) {
                    toast.success("Parking Deleted Successfully");
                    fetchCctvs({ next: null });
                  }
                }
              });
            }}
          >
            Delete
          </Button>
        </Typography>
      ),
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-y-4 h-full w-[80%] mt-4">
      <div className="flex flex-row justify-between items-center">
        <div className="font-bold text-2xl">CCTV</div>
        <button
          className="bg-[#8DBF41] text-black px-4 py-2 rounded-lg"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Add
        </button>
      </div>
      <div style={{ height: "80vh", width: "100%" }}>
        <DataGrid
          rows={cctvs.results}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[1]}
        />
      </div>
      {showModal ? (
        <>
          <div
            className="fixed inset-0 bg-black opacity-60 z-40"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative mx-auto w-1/2 fkex flex-column justify-center items-center">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-2xl font=semibold">Add CCTV</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => {
                      setShowModal(false);
                      setNewCctv({});
                    }}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block py-0 rounded-full">
                      <img src={X} alt="close" />
                    </span>
                  </button>
                </div>
                <div className="">
                  <form className="rounded w-full" onSubmit={handleSubmit}>
                    <div className="flex flex-col justify-between pt-4 px-4">
                      <label htmlFor="Name" className="text-sm">
                        Name
                      </label>
                      <input
                        type="text"
                        name="Name"
                        id="Name"
                        className="border-2 border-gray-300 rounded-md p-2"
                        value={newCctv.name}
                        onChange={(e) => {
                          setNewCctv({
                            ...newCctv,
                            name: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="flex flex-col justify-between pt-4 px-4">
                      <label htmlFor="Parking" className="text-sm">
                        Parking
                      </label>
                      {parking.results && (
                        <select
                          name="Parking"
                          id="Parking"
                          className="border-2 border-gray-300 rounded-md p-2"
                          value={newCctv.parking}
                          onChange={(e) => {
                            setNewCctv({
                              ...newCctv,
                              parking: e.target.value,
                            });
                          }}
                        >
                          <option value="">Select Parking</option>
                          {parking.results.map((parking) => (
                            <option value={parking.id} key={parking.idc}>
                              {parking.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                    <div className="flex flex-col justify-between pt-4 px-4">
                      <label htmlFor="URL" className="text-sm">
                        URL
                      </label>
                      <input
                        type="url"
                        name="URL"
                        id="URL"
                        className="border-2 border-gray-300 rounded-md p-2"
                        value={newCctv.url}
                        onChange={(e) => {
                          setNewCctv({
                            ...newCctv,
                            url: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="w-[5rem] h-[3rem] uppercase text-sm font-bold rounded hover:bg-gray hover:text-[#8DBF41] transition duration-300 ease-in-out"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setNewCctv({ ...newCctv });
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-[#8DBF41] w-[5rem] h-[3rem] uppercase text-sm font-bold rounded hover:bg-black hover:text-[#8DBF41] transition duration-300 ease-in-out"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {showUpdateModal ? (
        <>
          <div
            className="fixed inset-0 bg-black opacity-60 z-40"
            onClick={() => setShowUpdateModal(false)}
          ></div>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative mx-auto w-1/2 fkex flex-column justify-center items-center">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-2xl font=semibold">Update Parking</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => {
                      setShowUpdateModal(false);
                      setUpdateCctv({});
                    }}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block py-0 rounded-full">
                      <img src={X} alt="close" />
                    </span>
                  </button>
                </div>
                <div className="">
                  <form className="rounded w-full" onSubmit={handleUpdate}>
                    <div className="flex flex-col justify-between pt-4 px-4">
                      <label htmlFor="Name" className="text-sm">
                        Name
                      </label>
                      <input
                        type="text"
                        name="Name"
                        id="Name"
                        className="border-2 border-gray-300 rounded-md p-2"
                        value={updateCctv.name}
                        onChange={(e) => {
                          setUpdateCctv({
                            ...updateCctv,
                            name: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="flex flex-col justify-between pt-4 px-4">
                      <label htmlFor="Parking" className="text-sm">
                        Parking
                      </label>
                      {parking.results && (
                        <select
                          name="Parking"
                          id="Parking"
                          className="border-2 border-gray-300 rounded-md p-2"
                          value={updateCctv.organization}
                          onChange={(e) => {
                            setUpdateCctv({
                              ...updateCctv,
                              organization: e.target.value,
                            });
                          }}
                        >
                          <option value="">Select Parking</option>
                          {parking.results.map((organization) => (
                            <option
                              value={organization.id}
                              key={organization.idc}
                            >
                              {organization.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                    <div className="flex flex-col justify-between pt-4 px-4">
                      <label htmlFor="URL" className="text-sm">
                        URL
                      </label>
                      <input
                        type="text"
                        name="URL"
                        id="URL"
                        className="border-2 border-gray-300 rounded-md p-2"
                        value={updateCctv.url}
                        onChange={(e) => {
                          setUpdateCctv({
                            ...updateCctv,
                            url: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="w-[5rem] h-[3rem] uppercase text-sm font-bold rounded hover:bg-gray hover:text-[#8DBF41] transition duration-300 ease-in-out"
                    type="button"
                    onClick={() => {
                      setShowUpdateModal(false);
                      setUpdateCctv({ ...updateCctv });
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-[#8DBF41] w-[5rem] h-[3rem] uppercase text-sm font-bold rounded hover:bg-black hover:text-[#8DBF41] transition duration-300 ease-in-out"
                    type="button"
                    onClick={(e) => handleUpdate(updateCctv.id)}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default CCTVPage;
