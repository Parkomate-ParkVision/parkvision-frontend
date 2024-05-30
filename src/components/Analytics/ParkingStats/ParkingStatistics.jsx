import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
} from "chart.js";
import { faker } from "@faker-js/faker";
import { Bar } from "react-chartjs-2";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const ParkingAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [weeklyOccupancy, setWeeklyOccupancy] = useState(false);
  const [weeklyVehicleTypes, setWeeklyVehicleTypes] = useState(false);
  const [weeklyParkingProductivity, setWeeklyParkingProductivity] = useState(false);
  const handleWeeklyOccupancyOpen = () => setWeeklyOccupancy(true);
  const handleWeeklyOccupancyClose = () => setWeeklyOccupancy(false);
  const handleWeeklyVehicleTypesOpen = () => setWeeklyVehicleTypes(true);
  const handleWeeklyVehicleTypesClose = () => setWeeklyVehicleTypes(false);
  const handleWeeklyParkingProductivityOpen = () => setWeeklyParkingProductivity(true);
  const handleWeeklyParkingProductivityClose = () => setWeeklyParkingProductivity(false);

  useEffect(() => {
    const data = {
      "Total Visitors": 100,
      "Total Entries": 50,
      "Total Exits": 50,
      "First Time Entries": 100,
    };
    setLoading(false);
  }, []);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    BarElement
  );

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const weeklyOccupancyOptions = {
    responsive: true,
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 3,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const weeklyOccupancyData = {
    labels: daysOfWeek,
    datasets: [
      {
        label: "This Week",
        data: daysOfWeek.map(() => faker.number.int({ min: 0, max: 1000 })),
        borderColor: "rgb(74, 181, 142)",
        backgroundColor: "rgba(74, 181, 142, 1)",
      },
      {
        label: "Last Week",
        data: daysOfWeek.map(() => faker.number.int({ min: 0, max: 1000 })),
        borderColor: "rgb(255, 207, 0)",
        backgroundColor: "rgba(255, 207, 0, 1)",
        fill: "origin",
      },
    ],
  };

  const weeklyVehicleTypesOptions = {
    responsive: true,
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 3,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const weeklyVehicleTypesData = {
    labels: daysOfWeek,
    datasets: [
      {
        label: "4 Wheelers",
        data: daysOfWeek.map(() => faker.number.int({ min: 0, max: 1000 })),
        borderColor: "rgb(0, 224, 150)",
        backgroundColor: "rgba(0, 224, 150, 1)",
      },
      {
        label: "Others",
        data: daysOfWeek.map(() => faker.number.int({ min: 0, max: 1000 })),
        borderColor: "rgb(0, 149, 255)",
        backgroundColor: "rgba(0, 149, 255, 1)",
        fill: "origin",
      },
    ],
  };

  const weeklyParkingProductivityOptions = {
    responsive: true,
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 3,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const weeklyParkingProductivityData = {
    labels: daysOfWeek,
    datasets: [
      {
        label: "Parking 1",
        data: daysOfWeek.map(() => faker.number.int({ min: 0, max: 100 })),
        borderColor: "rgb(0, 224, 150)",
        backgroundColor: "rgba(0, 224, 150, 1)",
      },
      {
        label: "Parking 2",
        data: daysOfWeek.map(() => faker.number.int({ min: 0, max: 100 })),
        borderColor: "rgb(0, 149, 255)",
        backgroundColor: "rgba(0, 149, 255, 1)",
        fill: "origin",
      },
    ],
  };


  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="w-[95vw] h-full flex flex-col items-center justify-center font-poppins border border-gray rounded-lg p-8">
          <div className="flex flex-col items-center justify-center">
            <div className="font-bold text-2xl text-[#05004E]">
              Parking Statistics
            </div>
          </div>
          <div className="w-full flex flex-row items-stretch justify-start mt-8 gap-x-16">

            <div className="w-full flex flex-col items-center justify-start bg-white rounded-lg p-8 gap-y-8 border border-black">
              <div className="flex justify-between w-full">
                <div className="font-bold text-2xl text-[#05004E]">
                  Weekly Occupancy
                </div>
                <Button onClick={handleWeeklyOccupancyOpen}>Expand</Button>
              </div>
              <Modal
                open={weeklyOccupancy}
                onClose={handleWeeklyOccupancyClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={modalStyle}>
                  <div className="w-full font-bold text-3xl text-[#05004E]">
                    Weekly Occupancy
                  </div>
                  <Bar options={weeklyOccupancyOptions} data={weeklyOccupancyData} />
                </Box>
              </Modal>
              <Bar options={weeklyOccupancyOptions} data={weeklyOccupancyData} />
            </div>

            <div className="w-full flex flex-col items-center justify-start bg-white rounded-lg p-8 gap-y-8 border border-black">
              <div className="flex justify-between w-full">
                <div className="font-bold text-2xl text-[#05004E]">
                  Vehicle Types 
                </div>
                <Button onClick={handleWeeklyVehicleTypesOpen}>Expand</Button>
              </div>
              <Modal
                open={weeklyVehicleTypes}
                onClose={handleWeeklyVehicleTypesClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={modalStyle}>
                  <div className="w-full font-bold text-3xl text-[#05004E]">
                    Vehicle Types 
                  </div>
                  <Bar options={weeklyVehicleTypesOptions} data={weeklyVehicleTypesData} />
                </Box>
              </Modal>
              <Bar options={weeklyVehicleTypesOptions} data={weeklyVehicleTypesData} />
            </div>

            <div className="w-full flex flex-col items-center justify-start bg-white rounded-lg p-8 gap-y-8 border border-black">
              <div className="flex justify-between w-full">
                <div className="font-bold text-2xl text-[#05004E]">
                  Parking Productivites 
                </div>
                <Button onClick={handleWeeklyParkingProductivityOpen}>Expand</Button>
              </div>
              <Modal
                open={weeklyParkingProductivity}
                onClose={handleWeeklyParkingProductivityClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={modalStyle}>
                  <div className="w-full font-bold text-3xl text-[#05004E]">
                    Parking Productivites 
                  </div>
                  <Bar options={weeklyParkingProductivityOptions} data={weeklyParkingProductivityData} />
                </Box>
              </Modal>
              <Bar options={weeklyParkingProductivityOptions} data={weeklyParkingProductivityData} />
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ParkingAnalytics;