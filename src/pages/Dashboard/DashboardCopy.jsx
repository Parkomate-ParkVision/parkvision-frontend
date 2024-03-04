import {
  Box,
  Card,
  CardHeader,
  Container,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import Slide from "@mui/material/Slide";

import { OverviewEntries } from "../../components/Overview/overview-entries";
import { OverviewExits } from "../../components/Overview/overview-exits";
import { OverviewOccupancy } from "../../components/Overview/overview-occupancy";
import FrequencyHero from "../../components/FrequencyHero/FrequencyHero";
import { useState, useEffect } from "react";
import Fetch from "../../utils/Fetch";
import { ApiConfig } from "../../utils/config";
import axios from "axios";
import { OverviewCarsParked } from "../../components/Overview/overview-cars-parked";
import { BarChart } from "@mui/x-charts/BarChart";
import { OverviewTraffic } from "../../components/Overview/overview-traffic";
import { OverviewAverageOccupancy } from "../../components/Overview/overview-average-occupancy";

const now = new Date();

const DashboardCopy = () => {
  const options = [
    { value: "Daily", label: "Daily" },
    { value: "Weekly", label: "Weekly" },
    { value: "Monthly", label: "Monthly" },
  ];

  const [state, setState] = useState({ value: "Daily", label: "Daily" });
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [organizations, setOrganizations] = useState({ results: [] });
  const [vehicleData, setVehicleData] = useState([]);
  const [dashBoardData, setDashBoardData] = useState({});

  const [isloading, setisLoading] = useState(true);

  const fetchVehicleData = async (orgData) => {
    try {
      const response = await Fetch.get(
        ApiConfig.getVehiclesByOrganization + "/" + orgData.id + "/"
      );
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setVehicleData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDashBoardData = async (orgData) => {
    try {
      const response = await Fetch.get(
        ApiConfig.dashboard + "/" + orgData.id + "/"
      );
      if (response.status === 200) {
        const data = await response.json();
        setDashBoardData(data);
        console.log(data);
        setisLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrganizations = () => {
    axios
      .get(ApiConfig.organizations, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setOrganizations(response.data);
        setSelectedOrganization(response.data.results[0]);
        fetchVehicleData(response.data.results[0]);
        fetchDashBoardData(response.data.results[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setisLoading(true);
    fetchOrganizations();
  }, []);

  const handleStateChange = (option) => {
    setState(option);
  };

  if (isloading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
        className="w-full h-full bg-[#f4f2ed] flex flex-col items-center justify-center"
      >
        <div className="flex flex-row items-center justify-center mb-8 w-full h-20 bg-[#f4f2ed]">
          <h1 className="mr-4">Organization: </h1>
          <select
            name="Organization"
            id="organization"
            className="p-2"
            value={selectedOrganization && selectedOrganization.id}
            onChange={(e) => {
              const selectedOrg = organizations.results.find(
                (organization) => organization.id == e.target.value
              );
              setSelectedOrganization(selectedOrg);
              fetchVehicleData(selectedOrg);
              fetchDashBoardData(selectedOrg);
            }}
          >
            {organizations.results.map((organization) => (
              <option value={organization.id} key={organization.id}>
                {organization.name}
              </option>
            ))}
          </select>
        </div>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80px",
              marginTop: "-50px",
              marginBottom: "30px",
            }}
          >
            <div className="flex flex-row items-center justify-between align-middle p-2 w-[50%] h-full">
              <FrequencyHero
                options={options}
                selectedOption={state}
                handleChange={handleStateChange}
              />
            </div>
          </Box>

          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={3}>
              <Slide direction="right" in={true} mountOnEnter unmountOnExit>
                <div>
                  <OverviewEntries
                    difference={16}
                    state={state}
                    positive
                    sx={{ height: "100%", borderRadius: "15px" }}
                    value={
                      state.value === "Daily"
                        ? dashBoardData.daily_entries
                        : state.value === "Weekly"
                        ? dashBoardData.weekly_entries
                        : dashBoardData.monthly_entries
                    }
                  />
                </div>
              </Slide>
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <Slide direction="down" in={true} mountOnEnter unmountOnExit>
                <div>
                  <OverviewExits
                    difference={16}
                    state={state}
                    positive={false}
                    sx={{ height: "100%", borderRadius: "15px" }}
                    value={
                      state.value === "Daily"
                        ? dashBoardData.daily_exits
                        : state.value === "Weekly"
                        ? dashBoardData.weekly_exits
                        : dashBoardData.monthly_exits
                    }
                  />
                </div>
              </Slide>
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <Slide direction="down" in={true} mountOnEnter unmountOnExit>
                <div>
                  <OverviewOccupancy
                    sx={{ height: "100%", borderRadius: "15px" }}
                    value={dashBoardData.percentage_occupied.toFixed(2)}
                  />
                </div>
              </Slide>
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                <div>
                  <OverviewAverageOccupancy
                    difference={11}
                    positive
                    sx={{ height: "100%", borderRadius: "15px" }}
                    value={dashBoardData.average_occupancy.toFixed(2)}
                  />
                </div>
              </Slide>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid xs={12} md={6} lg={4}>
              <Card sx={{ height: "100%", borderRadius: "15px" }}>
                <CardHeader title="Cars Parked" />
                <BarChart
                  xAxis={[
                    {
                      scaleType: "band",
                      data: [
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                      ],
                    },
                  ]}
                  series={[
                    {
                      data: Object.values(dashBoardData.daily_distribution),
                    },
                  ]}
                  height={300}
                />
              </Card>
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTraffic
                chartSeries={[
                  dashBoardData.vehicle_types.economy,
                  dashBoardData.vehicle_types.premium,
                ]}
                labels={["Economy", "Premium"]}
                sx={{ height: "100%", borderRadius: "15px" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default DashboardCopy;
