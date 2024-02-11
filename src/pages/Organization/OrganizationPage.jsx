import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import Fetch from "../../utils/Fetch";
import { ApiConfig } from "../../utils/config";
import Swal from "sweetalert2";

const OrganizationPage = () => {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState({ results: [] });
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrganizations = async ({ next = null }) => {
    if (next) {
      setIsLoading(true);
      try {
        const response = await Fetch.get(next);
        if (response.status === 200) {
          const data = await response.json();
          setOrganizations(data);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    } else {
      setIsLoading(true);
      try {
        const response = await Fetch.get(ApiConfig.organizations + "/");
        console.log(response);
        if (response.status === 200) {
          const data = await response.json();
          setOrganizations(data);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations({ next: null });
  }, []);

  const columns = [
    {
      field: "Sr. No.",
      headerName: "Sr. No.",
      flex: 0.5,
      renderCell: (params) => (
        <Typography>{organizations.results.indexOf(params.row) + 1}</Typography>
      ),
    },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "ownerName", headerName: "Owner", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    {
      field: "view",
      headerName: "View",
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
              navigate(`/organizations/${params.row.id}/`);
            }}
          >
            View
          </Button>
        </Typography>
      ),
    },
    {
      field: "update",
      headerName: "Update",
      width: 150,
      renderCell: (params) => (
        <Typography>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "yellow",
              borderColor: "yellow",
              color: "black",
              ":hover": {
                backgroundColor: "black",
                color: "yellow",
              },
            }}
            onClick={() => {
              Swal.fire({
                title: "Update Organization",
                html: `
                  <input id="name" class="swal2-input" placeholder="Name" value="${params.row.name}">
                  <input id="address" class="swal2-input" placeholder="Address" value="${params.row.address}">
                  <input id="total_slots" class="swal2-input" placeholder="Total Slots" value="${params.row.total_slots}">
                `,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: "Update",
                showLoaderOnConfirm: true,
                preConfirm: () => {
                  return [
                    document.getElementById("name").value,
                    document.getElementById("address").value,
                    document.getElementById("total_slots").value,
                  ];
                },
                allowOutsideClick: () => !Swal.isLoading(),
              }).then(async (result) => {
                if (result.isConfirmed) {
                  const name = result.value[0];
                  const address = result.value[1];
                  const total_slots = result.value[2];
                  const response = await Fetch.put(
                    ApiConfig.organizations + `/${params.row.id}/`,
                    { name, address, total_slots }
                  );
                  console.log(response);
                  fetchOrganizations({ next: null });
                  Swal.fire({
                    title: "Updated",
                    icon: "success",
                  });
                }
              });
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
                  const response = await Fetch.delete(
                    ApiConfig.organizations + `/${params.row.id}/`
                  );
                  fetchOrganizations({ next: null });
                  Swal.fire({
                    title: "Updated",
                    icon: "success",
                  });
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
        <div className="font-bold text-4xl">Organizations</div>
        <button
          className="bg-[#8DBF41] text-black px-4 py-2 rounded-lg"
          onClick={() => {
            Swal.fire({
              title: "Add Organization",
              html: `
                <input id="name" class="swal2-input" placeholder="Name">
                <input id="address" class="swal2-input" placeholder="Address">
                <input id="total_slots" class="swal2-input" placeholder="Total Slots">
              `,
              focusConfirm: false,
              showCancelButton: true,
              confirmButtonText: "Add",
              showLoaderOnConfirm: true,
              preConfirm: () => {
                return [
                  document.getElementById("name").value,
                  document.getElementById("address").value,
                  document.getElementById("total_slots").value,
                ];
              },
              allowOutsideClick: () => !Swal.isLoading(),
            }).then(async (result) => {
              if (result.isConfirmed) {
                const name = result.value[0];
                const address = result.value[1];
                const total_slots = result.value[2];
                console.log(name, address, total_slots);
                const formData = new FormData();
                formData.append("name", name);
                formData.append("address", address);
                formData.append("total_slots", total_slots);
                const response = await Fetch.post(
                  ApiConfig.organizations + "/",
                  { name, address, total_slots }
                );
                console.log(response.data);
                fetchOrganizations({ next: null });
                Swal.fire({
                  title: "Addded",
                  icon: "success",
                });
              }
            });
          }}
        >
          Add
        </button>
      </div>
      <div style={{ height: "80vh", width: "100%" }}>
        <DataGrid
          rows={organizations.results}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[1]}
        />
      </div>
    </div>
  );
};

export default OrganizationPage;
