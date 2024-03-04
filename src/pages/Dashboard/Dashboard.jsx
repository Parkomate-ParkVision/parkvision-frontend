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
import { OverviewAverageOccupancy } from "../../components/Overview/overview-average-occupancy";
import { OverviewCarsParked } from "../../components/Overview/overview-cars-parked";
import { OverviewTraffic } from "../../components/Overview/overview-traffic";
import { OverviewLatestArrivals } from "../../components/Overview/overview-latest-arrivals";
import { subDays, subHours } from "date-fns";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import OverviewVehicleClassification from "../../components/Overview/overview-vehicle-classification";
import ParkingTimes from "../../components/Overview/overview-parking-times";
import OverviewPeakHours from "../../components/Overview/overview-peak-hours";
import { OverviewOverstayed } from "../../components/Overview/overview-overstayed";
import { OverviewWaitingTime } from "../../components/Overview/overview.waiting-time";
import FrequencyHero from "../../components/FrequencyHero/FrequencyHero";
import { useState, useEffect } from "react";
import Fetch from "../../utils/Fetch";
import { ApiConfig } from "../../utils/config";
import data from '../../../vehicles.json'

const now = new Date();

const Dashboard = () => {
  const options = [
    { value: "Daily", label: "Daily" },
    { value: "Weekly", label: "Weekly" },
    { value: "Monthly", label: "Monthly" },
  ];

  const vehicleSegments = {
    "TATA ALTROZ XZ 1.2 RTN BS6": "A",
    "FORD FIGO 1.4 TDCI ZXI": "B",
    "Volvo FH16 750": "C",
    "Mercedes-Benz Actros 2646LS/33": "D",
    "Honda Civic": "A",
    "Honda City": "B",
    "Hero Splendor Plus":"A", 
    "Bajaj Pulsar 150" : "A"
};

const segmentCount = {
  "A":0,
  "B":0, 
  "C":0,
  "D":0
}
const vehiclesArray = data.vehicles;
console.log(vehiclesArray)
  for(const vehicle in vehicleSegments){
    // console.log(vehicleSegments[vehicle])
    vehiclesArray.forEach(ele =>{
      if (vehicle.toLowerCase().includes(ele.result.extraction_output.manufacturer_model.toLowerCase())){
        segmentCount[vehicleSegments[vehicle]]++
        
      }
    })
  }

  for(const segment in segmentCount){
    // console.log(segmentCount[segment])
    console.log(segment, "", segmentCount[segment])
  }
 

  // console.log(data)
  // data[1].forEach((vehicle) =>{
  //   console.log(vehicle.result.manufacturer_model)
  // })


let arr = []
vehiclesArray.forEach(vehicle => {
    arr.push(vehicle.result.extraction_output.manufacturer_model);
});
console.log(arr)
  // for(const vehicle in vehicles){
  //   console.log(vehicle.result.manufacturer_model);
  // }
  const [state, setState] = useState({ value: "Daily", label: "Daily" });
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const [vehicleData, setVehicleData] = useState(null);

  function dayDifference(date1, date2) {
    // Convert both dates to UTC to ensure consistent calculations
    const utc1 = Date.UTC(
      date1.getFullYear(),
      date1.getMonth(),
      date1.getDate()
    );
    const utc2 = Date.UTC(
      date2.getFullYear(),
      date2.getMonth(),
      date2.getDate()
    );

    // Calculate the difference in milliseconds
    const diffInMs = Math.abs(utc2 - utc1);

    // Convert the difference from milliseconds to days
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  }

  function differenceInMinutes(date1, date2) {
    const diffInMs = Math.abs(date2 - date1); // Calculate the absolute difference in milliseconds
    return Math.floor(diffInMs / (1000 * 60)); // Convert milliseconds to minutes
  }

  const calcAvgParking = (vehicles) => {
    let totalDuration = 0;
    vehicles.forEach((vehicle) => {
      const entry = new Date(vehicle.entry_time);
      const exit = new Date(vehicle.exit_time);
      totalDuration = totalDuration + differenceInMinutes(entry, exit);
      return totalDuration;
    });
    const ParkingMinutes = totalDuration / vehicles.length;
    return isNaN(ParkingMinutes) ? '0' : `${Math.floor(ParkingMinutes / 60)} Hours ${Math.floor(ParkingMinutes % 60)} Minutes`;

  };

  const weeklyVehicleCount = (vehicles) => {
    let count = [0, 0, 0, 0, 0, 0, 0];
    vehicles.forEach((vehicle) => {
      const entry = new Date(vehicle.entry_time);
      const day = entry.getDay();
      count[day]++;
    });
    return count;
  };

  const [isloading, setisLoading] = useState(true);

  const fetchVehicleData = async (orgData) => {
    try {
      const response = await Fetch.get(
        ApiConfig.getVehiclesByOrganization + "/" + orgData.id + "/"
      );
      if (response.status === 200) {
        const data = await response.json();
        setVehicleData(data);
        
        setisLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrganizations = async () => {
    try {
      const response = await Fetch.get(ApiConfig.organizations);
      if (response.status === 200) {
        const data = await response.json();
        setOrganizations(data);
        setSelectedOrganization(data.results[0]);
        await fetchVehicleData(data.results[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      await fetchOrganizations();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setisLoading(true);
    fetchData();
  }, []);

  // console.log(vehicleData)
  const handleStateChange = (option) => {
    // console.log(option);
    setState(option);
  };

  const dayBefore = new Date().getTime() - (1 * 24 * 60 * 60 * 1000)
  
const today = new Date();

// Subtract one day from the given date
today.setDate(today.getDate() - 7);

// Get yesterday's date in the local date format
const lastWeekDate = today.toLocaleDateString();

// console.log("Last week's date:", lastWeekDate);

const lastWeekVehicles = vehicleData.filter(vehicle =>{
  const entry = new Date(vehicle.entry_time)
  return entry.toLocaleDateString() == lastWeekDate
})
console.log(lastWeekVehicles)

const calcPeakHours = (vehicles) => {
  let peakHours = new Array(24).fill(0);

  vehicles.forEach(vehicle => {
      const entry = new Date(vehicle.entry_time);
      const exit = new Date(vehicle.exit_time);
      
      for (let i = entry.getUTCHours(); i <= exit.getUTCHours(); i++) {
          peakHours[i]++;
      }
  });

  console.log(peakHours)
  return peakHours;
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
            value={selectedOrganization.id}
            onChange={(e) => {
              const selectedOrg = organizations.results.find(
                (organization) => organization.id == e.target.value
              );
              setSelectedOrganization(selectedOrg);
              fetchVehicleData(selectedOrg);
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
              height: "80px", // You can adjust the height as needed
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
                    difference={
                      // state.value == 'Daily' ?
                      // (vehicleData.filter((vehicle) => {
                      //   const entry  = new Date(vehicle.entry_time)
                      //   return entry.toDateString() == now.toDateString()
                      // }).length - vehicleData.filter((vehicle) => {
                      //   const entry  = new Date(vehicle.entry_time)
                      //   const yesterday = now;
                      //   yesterday.setDate(now.getDate() - 1);
                      //   return entry.toDateString() == yesterday.toDateString()
                      // }).length)/100 :
                      // state.value == 'Weekly' ?
                      // (vehicleData.filter((vehicle) => {
                      //   const entry  = new Date(vehicle.entry_time)
                      //   return dayDifference(now, entry) <= 7
                      // }).length - vehicleData.filter((vehicle) => {
                      //   const entry  = new Date(vehicle.entry_time)
                      //   return dayDifference(now, entry) > 7 && dayDifference(now, entry) <=14
                      // }).length)/100:
                      // (vehicleData.filter((vehicle) => {
                      //   const entry  = new Date(vehicle.entry_time)
                      //   return entry.getFullYear() == now.getFullYear() && entry.getMonth() == now.getMonth()
                      // }).length - vehicleData.filter((vehicle) => {
                      //   const entry  = new Date(vehicle.entry_time)
                      //   return entry.getFullYear() == now.getFullYear() && entry.getMonth() == now.getMonth()-1
                      // }).length)/100
                      // 0
                      ' '
                    }
                    state={state}
                    positive
                    sx={{ height: "100%", borderRadius: "15px" }}
                    value={
                      state.value == "Daily"
                        ? vehicleData.filter((vehicle) => {
                            const entry = new Date(vehicle.entry_time);
                            return entry.toDateString() == now.toDateString();
                          }).length
                        : state.value == "Weekly"
                        ? vehicleData.filter((vehicle) => {
                            const entry = new Date(vehicle.entry_time);
                            return dayDifference(now, entry) <= 7;
                          }).length
                        : vehicleData.filter((vehicle) => {
                            const entry = new Date(vehicle.entry_time);
                            return (
                              entry.getFullYear() == now.getFullYear() &&
                              entry.getMonth() == now.getMonth()
                            );
                          }).length
                    }
                  />
                </div>
              </Slide>
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
              // ref={containerRef}
            >
              <Slide direction="down" in={true} mountOnEnter unmountOnExit>
                <div>
                  <OverviewExits
                    difference={' '}
                    state={state}
                    positive={false}
                    sx={{ height: "100%", borderRadius: "15px" }}
                    value={
                      state.value == "Daily"
                        ? vehicleData.filter((vehicle) => {
                            const exit = new Date(vehicle.exit_time);
                            return exit.toDateString() == now.toDateString();
                          }).length
                        : state.value == "Weekly"
                        ? vehicleData.filter((vehicle) => {
                            const exit = new Date(vehicle.exit_time);
                            return dayDifference(now, exit) <= 7;
                          }).length
                        : vehicleData.filter((vehicle) => {
                            const exit = new Date(vehicle.exit_time);
                            return (
                              exit.getFullYear() == now.getFullYear() &&
                              exit.getMonth() == now.getMonth()
                            );
                          }).length
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
                    value={Math.floor(selectedOrganization.filled_slots/selectedOrganization.total_slots*100)}
                  />
                </div>
              </Slide>
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                <div>
                  <OverviewAverageOccupancy
                    difference={' '}
                    positive
                    sx={{ height: "100%", borderRadius: "15px" }}
                    value={
                      state.value == "Daily"
                        ? calcAvgParking(
                            vehicleData.filter((vehicle) => {
                              const exit = new Date(vehicle.exit_time);
                              return exit.toDateString() == now.toDateString();
                            })
                          )
                        : state.value == "Weekly"
                        ? calcAvgParking(
                            vehicleData.filter((vehicle) => {
                              const exit = new Date(vehicle.exit_time);
                              return dayDifference(now, exit) <= 7;
                            })
                          )
                        : calcAvgParking(
                            vehicleData.filter((vehicle) => {
                              const exit = new Date(vehicle.exit_time);
                              return (
                                exit.getFullYear() == now.getFullYear() &&
                                exit.getMonth() == now.getMonth()
                              );
                            })
                          )
                    }
                  />
                </div>
              </Slide>
            </Grid>
            <Grid xs={12} lg={8}>
              <OverviewCarsParked
                chartSeries={[
                  {
                    name: "This week",
                    data: weeklyVehicleCount(
                      vehicleData.filter((vehicle) => {
                        const entry = new Date(vehicle.entry_time);
                        return dayDifference(now, entry) <= 7;
                      })
                    ),
                  },
                  {
                    name: "Last week",
                    data: weeklyVehicleCount(
                      vehicleData.filter((vehicle) => {
                        const entry = new Date(vehicle.entry_time);
                        return (
                          dayDifference(now, entry) > 7 &&
                          dayDifference(now, entry) <= 14
                        );
                      })
                    ),
                  },
                ]}
                sx={{ height: "100%", borderRadius: "15px" }}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <OverviewTraffic
                chartSeries={[vehiclesArray.filter(vehicle =>{
                  return vehicle.result.extraction_output.vehicle_class.includes('MCWG')
                }).length, vehiclesArray.filter(vehicle =>{
                  return !vehicle.result.extraction_output.vehicle_class.includes('MCWG')
                }).length]}
                labels={["Cars", "Two-wheelers"]}
                sx={{ height: "100%", borderRadius: "15px" }}
              />
            </Grid>
            <Grid xs={12} md={9} lg={6}>
              <OverviewLatestArrivals
                vehicles={vehicleData}
                sx={{ height: "100%", borderRadius: "15px", padding: "1rem" }}
              />
            </Grid>
            <Grid xs={12} md={9} lg={6}>
              <Card
                sx={{ height: "100%", padding: "1rem", borderRadius: "15px" }}
              >
                <CardHeader title="Parking Tracker" />
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  {Array.from(Array(15)).map((_, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                      {index % 4 === 0 && (
                        <Card
                          sx={{
                            height: "100%",
                            p: 2,
                            backgroundColor: "primary.main",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "primary.dark";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "primary.main";
                          }}
                        >
                          <AirportShuttleIcon
                            sx={{
                              fontSize: 40,
                            }}
                          />
                        </Card>
                      )}
                      {index % 4 != 0 && (
                        <Card
                          sx={{
                            height: "100%",
                            p: 2,
                            backgroundColor: "red",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "primary.dark";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "primary.main";
                          }}
                        >
                          <AirportShuttleIcon
                            sx={{
                              fontSize: 40,
                              color: "white",
                            }}
                          />
                        </Card>
                      )}
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </Grid>
            <Grid xs={12} md={9} lg={7}>    
              <OverviewVehicleClassification
                sx={{ borderRadius: "15px", paddingLeft: "1rem" }}
                
                data={[
                  { value: segmentCount["A"], label: "Economy Vehicles" },
                  { value: segmentCount["B"]+segmentCount["C"], label: "Mid-range vehicles" },
                  { value: segmentCount["D"], label: "Premium Vehicles" },
                ]}
              />
            </Grid>
            <Grid xs={12} md={9} lg={5}>
              <ParkingTimes
                seriesData={[{ data: [2, 3, 5] }]}
                sx={{ paddingLeft: "1rem", borderRadius: "15px" }}
              />
            </Grid>
            <Grid xs={12} md={9} lg={5.5}>
              <OverviewPeakHours
                seriesData={[
                  {
                    data: calcPeakHours(lastWeekVehicles),
                    // data:[2,3,34,34]
                  },
                ]}
                sx={{
                  paddingLeft: "1rem",
                  maxWidth: 700,
                  marginRight: 2,
                  borderRadius: "15px",
                }}
              />
            </Grid>
            
            <Grid xs={12} md={9} lg={6}>
              <OverviewOverstayed
                vehicles={
                  vehicleData.filter(vehicle =>{
                    const entry = new Date(vehicle.entry_time)
                    const exit = new Date(vehicle.exit_time)
                    return !exit && entry < dayBefore
                  })
                }
                //   {
                //     id: "5ece2c077e39da27658aa8a9",
                //     name: "MH 12 GK 1234",
                //     wheels: 2,
                //     updatedAt: subHours(now, 25).getTime(),
                //   },
                //   {
                //     id: "5ece2c0d16f70bff2cf86cd8",
                //     name: "MH 14 GR 1274",
                //     wheels: 4,
                //     updatedAt: subHours(now, 30).getTime(),
                //   },
                //   {
                //     id: "b393ce1b09c1254c3a92c827",
                //     name: "MH 12 JK 1232",
                //     wheels: 2,
                //     updatedAt: subHours(now, 75).getTime(),
                //   },
                // ]}
                sx={{
                  paddingLeft: "1rem",
                  height: "auto",
                  borderRadius: "15px",
                }}
              />

              <OverviewWaitingTime
                difference={7}
                positive
                sx={{
                  paddingLeft: "1rem",
                  height: "auto",
                  marginTop: "0.8rem",
                  borderRadius: "15px",
                  paddingRight: "1rem",
                }}
                value="34 Minutes"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
