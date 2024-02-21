import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import Fetch from "../../utils/Fetch";
import { ApiConfig } from "../../utils/config";
import Swal from "sweetalert2";
import X from "../../assets/x.png";
import { toast } from "react-toastify";

const GatePage = () => {
  const [gates, setGates] = useState({ results: [] });
  const [newGate, setNewGates] = useState({});
  const [updateGate, setUpdateGate] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [organizations, setOrganizations] = useState({ results: [] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(newGate);
    const response = await Fetch.post(ApiConfig.gates + "/", newGate);
    if (response.status === 201) {
      Swal.fire("Success", "Gate Added Successfully", "success");
      fetchGates({ next: null });
      setNewGates({});
    } else {
      Swal.fire("Error", "Error Adding Gate", "error");
    }
    setShowModal(false);
  };

  const handleUpdate = async (id) => {
    // console.log(updateGate);
    const response = await Fetch.put(
      ApiConfig.gates + "/" + id + "/",
      updateGate
    );
    if (response.status === 201) {
      Swal.fire("Success", "Gate Updated Successfully", "success");
      fetchGates({ next: null });
      setShowUpdateModal(false);
    } else {
      Swal.fire("Error", "Error Updating Gate", "error");
    }
  };

  const fetchGates = async ({ next = null }) => {
    if (next) {
      setIsLoading(true);
      try {
        const response = await Fetch.get(next);
        if (response.status === 201) {
          const data = await response.json();
          setGates(data);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    } else {
      setIsLoading(true);
      try {
        const response = await Fetch.get(ApiConfig.gates + "/");
        if (response.status === 200) {
          const data = await response.json();
          // console.log(data);
          setGates(data);
        }
      } catch (error) {
        // console.log(error);
      }
      setIsLoading(false);
    }
  };

  const fetchOrganization = async () => {
    try {
      const response = await Fetch.get(ApiConfig.organizations + "/");
      if (response.status === 200) {
        const data = await response.json();
        setOrganizations(data);
        // console.log(data);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    fetchGates({ next: null });
    fetchOrganization();
  }, []);

  const columns = [
    {
      field: "Sr. No.",
      headerName: "Sr. No.",
      flex: 0.5,
      renderCell: (params) => (
        <Typography>{gates.results.indexOf(params.row) + 1}</Typography>
      ),
    },
    // { field: "organization", headerName: "Organization Id", flex: 1 },
    { field: "organizationName", headerName: "Organization Name", flex: 1 },
    {
      field: "organizationAddress",
      headerName: "Organization Address",
      flex: 1,
    },
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
              // console.log(params.row.id);
              setUpdateGate({
                id: params.row.id,
                organization: params.row.organization,
              });
              // console.log({
              //   id: params.row.id,
              //   organization: params.row.organization,
              // });
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
              // console.log(params.row.id);
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
                    ApiConfig.gates + "/" + params.row.id + "/"
                  );
                  if (response.status === 200) {
                    toast.success("Gate Deleted Successfully");
                    fetchGates({ next: null });
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
        <div className="font-bold text-2xl">Gate</div>
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
          rows={gates.results}
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
                  <h3 className="text-2xl font=semibold">Add Gate</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => {
                      setShowModal(false);
                      setNewGates({});
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
                      <label htmlFor="Organization" className="text-sm">
                        Organization
                      </label>
                      {organizations.results && (
                        <select
                          name="Organization"
                          id="Organization"
                          className="border-2 border-gray-300 rounded-md p-2"
                          value={newGate.organization}
                          onChange={(e) => {
                            setNewGates({
                              ...newGate,
                              organization: e.target.value,
                            });
                          }}
                        >
                          <option value="">Select Organization</option>
                          {organizations.results.map((organization) => (
                            <option
                              value={organization.id}
                              key={organization.id}
                            >
                              {organization.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="w-[5rem] h-[3rem] uppercase text-sm font-bold rounded hover:bg-gray hover:text-[#8DBF41] transition duration-300 ease-in-out"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setNewGates({ ...newGate });
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
                  <h3 className="text-2xl font=semibold">Update Gate</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => {
                      setShowUpdateModal(false);
                      setUpdateGate({});
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
                      <label htmlFor="Organization" className="text-sm">
                        Organization
                      </label>
                      {organizations.results && (
                        <select
                          name="Organization"
                          id="Organization"
                          className="border-2 border-gray-300 rounded-md p-2"
                          value={updateGate.organization}
                          onChange={(e) => {
                            setUpdateGate({
                              ...updateGate,
                              organization: e.target.value,
                            });
                          }}
                        >
                          <option value="">Select Organization</option>
                          {organizations.results.map((organization) => (
                            <option
                              value={organization.id}
                              key={organization.id}
                            >
                              {organization.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="w-[5rem] h-[3rem] uppercase text-sm font-bold rounded hover:bg-gray hover:text-[#8DBF41] transition duration-300 ease-in-out"
                    type="button"
                    onClick={() => {
                      setShowUpdateModal(false);
                      setUpdateGate({ ...updateGate });
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-[#8DBF41] w-[5rem] h-[3rem] uppercase text-sm font-bold rounded hover:bg-black hover:text-[#8DBF41] transition duration-300 ease-in-out"
                    type="button"
                    onClick={(e) => handleUpdate(updateGate.id)}
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

export default GatePage;
