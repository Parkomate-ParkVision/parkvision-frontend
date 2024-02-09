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
import { useState } from "react";

const now = new Date();
const [state, setState] = useState("Daily");

const handleStateChange = ({ newState }) => {
  setState(newState);
};

const Dashboard = () => (
  <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <FrequencyHero
          options={[
            {
              Daily: "Daily",
            },
            {
              Weekly: "Weekly",
            },
            {
              Monthly: "Monthly",
            },
          ]}
          selectedOption={state}
          handleChange={handleStateChange}
        />
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
          <h1>ParkVision Admin Dashboard</h1>
        </Box>

        <Grid container spacing={3}>
          <Grid xs={12} sm={6} lg={3}>
            <Slide direction="right" in={true} mountOnEnter unmountOnExit>
              <div>
                <OverviewEntries
                  difference={12}
                  positive
                  sx={{ height: "100%", borderRadius: "15px" }}
                  value="400"
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
                  difference={16}
                  positive={false}
                  sx={{ height: "100%", borderRadius: "15px" }}
                  value="360"
                />
              </div>
            </Slide>
          </Grid>
          <Grid xs={12} sm={6} lg={3}>
            <Slide direction="down" in={true} mountOnEnter unmountOnExit>
              <div>
                <OverviewOccupancy
                  sx={{ height: "100%", borderRadius: "15px" }}
                  value={75.5}
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
                  value="3.34 hrs"
                />
              </div>
            </Slide>
          </Grid>
          <Grid xs={12} lg={8}>
            <OverviewCarsParked
              chartSeries={[
                {
                  name: "This week",
                  data: [180, 160, 50, 80, 30, 140, 140],
                },
                {
                  name: "Last week",
                  data: [120, 110, 40, 60, 20, 90, 90],
                },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <OverviewTraffic
              chartSeries={[63, 15]}
              labels={["Cars", "Two-wheelers"]}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid xs={12} md={9} lg={6}>
            <OverviewLatestArrivals
              products={[
                {
                  id: "5ece2c077e39da27658aa8a9",
                  name: "MH 12 GK 1234",
                  wheels: 2,
                  updatedAt: subHours(now, 1).getTime(),
                },
                {
                  id: "5ece2c0d16f70bff2cf86cd8",
                  name: "MH 14 GR 1274",
                  wheels: 4,
                  updatedAt: subHours(now, 3).getTime(),
                },
                {
                  id: "b393ce1b09c1254c3a92c827",
                  name: "MH 12 JK 1232",
                  wheels: 2,
                  updatedAt: subHours(now, 4).getTime(),
                },
                {
                  id: "a6ede15670da63f49f752c89",
                  name: "MH 12 SK 1534",
                  wheels: 4,
                  updatedAt: subHours(now, 5).getTime(),
                },
                {
                  id: "bcad5524fe3a2f8f8620ceda",
                  name: "MH 12 KK 0234",
                  wheels: 4,
                  updatedAt: subHours(now, 6).getTime(),
                },
                {
                  id: "bcad5524fe3a2f8f8620ceda",
                  name: "MH 12 UY 0204",
                  wheels: 4,
                  updatedAt: subHours(now, 8).getTime(),
                },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid xs={12} md={9} lg={6}>
            <Card sx={{ height: "100%", padding: "1rem" }}>
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
              data={[
                { value: 50, label: "Economy Vehicles" },
                { value: 23, label: "Mid-range vehicles" },
                { value: 7, label: "Premium Vehicles" },
              ]}
            />
          </Grid>
          <Grid xs={12} md={9} lg={5}>
            <ParkingTimes seriesData={[{ data: [2, 3, 5] }]} />
          </Grid>
          <Grid xs={12} md={9} lg={5.5}>
            <OverviewPeakHours
              seriesData={[
                {
                  data: [
                    5, 8, 10, 12, 15, 18, 20, 18, 15, 12, 10, 8, 7, 6, 5, 4,
                  ],
                },
              ]}
            />
          </Grid>
          <Grid xs={12} md={9} lg={6}>
            <OverviewOverstayed
              products={[
                {
                  id: "5ece2c077e39da27658aa8a9",
                  name: "MH 12 GK 1234",
                  wheels: 2,
                  updatedAt: subHours(now, 25).getTime(),
                },
                {
                  id: "5ece2c0d16f70bff2cf86cd8",
                  name: "MH 14 GR 1274",
                  wheels: 4,
                  updatedAt: subHours(now, 30).getTime(),
                },
                {
                  id: "b393ce1b09c1254c3a92c827",
                  name: "MH 12 JK 1232",
                  wheels: 2,
                  updatedAt: subHours(now, 75).getTime(),
                },
              ]}
              sx={{ height: "auto" }}
            />

            <OverviewWaitingTime
              difference={7}
              positive
              sx={{ height: "auto" }}
              value="34 Minutes"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Dashboard;
