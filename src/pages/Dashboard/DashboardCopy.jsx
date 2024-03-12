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
import GeneralStatistics from "../../components/Analytics/GeneralStats/GeneralStatistics";
import VisitorAnalyticsPage from "../../components/Analytics/VisitorAnalytics/VisitorAnalyticsPage";
import ParkingStatistics from "../../components/Analytics/ParkingStats/ParkingStatistics";
import { DashBoardContext } from "../../contexts/DashboardContext";

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
  const [generalStats, setGeneralStats] = useState(null);

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
        console.log(data);
        setDashBoardData(data);

        setisLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrganizations = () => {
    axios
      .get(ApiConfig.organizationNoPagination, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setOrganizations(response.data);
        setSelectedOrganization(response.data[0]);
        fetchVehicleData(response.data[0]);
        fetchDashBoardData(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const fetchGeneralStats = async () => {
    //     try {
    //     const response = await fetch("http://localhost:8000/api/generalstats");
    //     const data = await response.json();
    //     setGeneralStats(data);
    //     setLoading(false);
    //     } catch (error) {
    //     console.log(error);
    //     }
    // };
    // fetchGeneralStats();

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
        }}
        className="w-full h-full bg-white flex flex-col items-center justify-center gap-y-8 font-poppins"
      >
        <div className="flex flex-row items-evenly justify-center w-full h-20 bg-[#f4f2ed] max-md:flex-col border border-gray">
          <div className="w-[33%] flex flex-row items-center justify-center gap-x-8">
            <h1>Organization: </h1>
            <select
              name="Organization"
              id="organization"
              className="p-4"
              value={selectedOrganization && selectedOrganization.id}
              onChange={(e) => {
                const selectedOrg = organizations.find(
                  (organization) => organization.id == e.target.value
                );
                setSelectedOrganization(selectedOrg);
                fetchVehicleData(selectedOrg);
                fetchDashBoardData(selectedOrg);
              }}
            >
              {organizations.map((organization) => (
                <option value={organization.id} key={organization.id}>
                  {organization.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-[66%] flex flex-row items-center justify-evenly">
            <h1>Frequency: </h1>
            <div className="flex flex-row items-evenly justify-between align-middle p-2 w-full h-full">
              <FrequencyHero
                options={options}
                selectedOption={state}
                handleChange={handleStateChange}
              />
            </div>
          </div>
        </div>
        <Container className="flex flex-row items-evenly justify-center w-full">
          <DashBoardContext.Provider value={{state, selectedOrganization, vehicleData, dashBoardData, setGeneralStats}}>
            <div className="w-full flex flex-col items-center justify-center gap-y-8 my-8">
              <GeneralStatistics />
              <VisitorAnalyticsPage />
              <ParkingStatistics />
            </div>
          </DashBoardContext.Provider>
        </Container>
      </Box>
    </>
  );
};

export default DashboardCopy;
