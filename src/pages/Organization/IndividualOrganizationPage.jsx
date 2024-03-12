import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Fetch from "../../utils/Fetch";
import { ApiConfig } from "../../utils/config";
import { toast } from "react-toastify";
import X from "../../assets/x.png";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

const IndividualOrganizationPage = () => {
  const { id } = useParams();
  const [organization, setOrganization] = useState({ name: [] });
  const [showModal, setShowModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({});

  const handleSubmit = async () => {
    try {
      console.log(newAdmin);
      const response = await Fetch.post(ApiConfig.admins + "/", newAdmin);
      if (response.status === 201) {
        console.log(await response.json());
        toast.success("Admin added successfully");
        setShowModal(false);
        setNewAdmin({ organization: id });
        fetchOrganization();
      } else {
        toast.error("Error adding admin");
      }
    } catch (error) {
      // console.log(error);
      toast.error("Error adding admin");
    }
  };

  useEffect(() => {
    // console.log(id);
    fetchOrganization();
    setNewAdmin({ ...newAdmin, organization: id });
  }, [id]);

  const fetchOrganization = async () => {
    const response = await Fetch.get(ApiConfig.organizations + `/${id}/`);
    // console.log(response);
    if (response.status === 200) {
      const data = await response.json();
      setOrganization(data);
    } else {
      toast.error("Error fetching organization");
    }
  };

  const columns = [
    {
      field: "Sr. No.",
      headerName: "Sr. No.",
      flex: 0.5,
      renderCell: (params) => (
        <Typography>
          {organization.adminDetails.indexOf(params.row) + 1}
        </Typography>
      ),
    },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
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
                color: "red",
              },
            }}
            onClick={() => {
              Swal.fire({
                title: "Delete Organization",
                text: "Are you sure you want to delete this organization?",
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: "Delete",
                showLoaderOnConfirm: true,
                allowOutsideClick: () => !Swal.isLoading(),
              }).then(async (result) => {
                if (result.isConfirmed) {
                  const data = {
                    email: params.row.email,
                  };
                  console.log(`${ApiConfig.admins}/${id}/`);
                  const response = await Fetch.delete(
                    `${ApiConfig.admins}/${id}/`,
                    data
                  );
                  if (response.status === 200) {
                    toast.success("Admin deleted successfully");
                  } else {
                    toast.error("Error deleting admin");
                  }
                  fetchOrganization();
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

  return (
    <div className="flex flex-col gap-y-4 h-full w-[80%] mt-4 font-poppin s">
      <div className="flex flex-row justify-between items-center">
        <div className="font-bold text-2xl">{organization.name}</div>
        <button
          className="bg-[#8DBF41] text-black px-4 py-2 rounded-lg"
          onClick={() => setShowModal(true)}
        >
          Add Admin
        </button>
      </div>
      <div style={{ height: "80vh", width: "100%" }}>
        <DataGrid
          rows={organization.adminDetails || []}
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
                  <h3 className="text-2xl font=semibold">Add Admin</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => {
                      setShowModal(false);
                      setNewAdmin({});
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
                        value={newAdmin.name}
                        onChange={(e) => {
                          setNewAdmin({
                            ...newAdmin,
                            name: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="flex flex-col justify-between pt-4 px-4">
                      <label htmlFor="Email" className="text-sm">
                        Email
                      </label>
                      <input
                        type="email"
                        name="Email"
                        id="Email"
                        className="border-2 border-gray-300 rounded-md p-2"
                        value={newAdmin.email}
                        onChange={(e) => {
                          setNewAdmin({
                            ...newAdmin,
                            email: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="flex flex-col justify-between pt-4 px-4">
                      <label htmlFor="Phone" className="text-sm">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="Phone"
                        id="Phone"
                        className="border-2 border-gray-300 rounded-md p-2"
                        value={newAdmin.phone}
                        onChange={(e) => {
                          setNewAdmin({
                            ...newAdmin,
                            phone: e.target.value,
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
                      setNewAdmin({ ...newAdmin });
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
    </div>
  );
};

export default IndividualOrganizationPage;
