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
  const [budgetCategoriesByWeek, setBudgetCategoriesByWeek] = useState(false);
  const [ageCategoriesByWeek, setAgeCategoriesByWeek] = useState(false);
  const handleBudgetCategoriesByWeekOpen = () => setBudgetCategoriesByWeek(true);
  const handleBudgetCategoriesByWeekClose = () => setBudgetCategoriesByWeek(false);
  const handleAgeCategoriesByWeek = () => setAgeCategoriesByWeek(true);
  const handleAgeCategoriesByWeekClose = () => setAgeCategoriesByWeek(false);

  useEffect(() => {
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
        label: "Budget",
        data: daysOfWeek.map(() => faker.number.int({ min: 0, max: 1000 })),
        borderColor: "rgb(0, 149, 255)",
        backgroundColor: "rgba(0, 149, 255, 1)",
      },
      {
        label: "Premium",
        data: daysOfWeek.map(() => faker.number.int({ min: 0, max: 1000 })),
        borderColor: "rgb(0, 224, 150)",
        backgroundColor: "rgba(0, 224, 150, 1)",
        fill: "origin",
      },
      {
        label: "Luxury",
        data: daysOfWeek.map(() => faker.number.int({ min: 0, max: 1000 })),
        borderColor: "rgb(255, 168, 0)",
        backgroundColor: "rgba(255, 168, 0, 1)",
        fill: "origin",
      },
    ],
  };

  const weeklyAgeOccupancyOptions = {
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

  const weeklyAgeOccupancyData = {
    labels: daysOfWeek,
    datasets: [
      {
        label: "0-5 years",
        data: daysOfWeek.map(() => faker.number.int({ min: 0, max: 1000 })),
        borderColor: "rgb(255, 207, 0)",
        backgroundColor: "rgba(255, 207, 0, 1)",
      },
      {
        label: "5-10 years",
        data: daysOfWeek.map(() => faker.number.int({ min: 0, max: 1000 })),
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 1)",
        fill: "origin",
      },
      {
        label: "10+ years",
        data: daysOfWeek.map(() => faker.number.int({ min: 0, max: 1000 })),
        borderColor: "rgb(167, 0, 255)",
        backgroundColor: "rgba(167, 0, 255, 1)",
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
              Owner Segmentation
            </div>
          </div>
          <div className="w-full flex flex-row items-stretch justify-start mt-8 gap-x-16">

            <div className="w-full flex flex-col items-center justify-start bg-white rounded-lg p-8 gap-y-8 border border-black">
              <div className="flex justify-between w-full">
                <div className="font-bold text-2xl text-[#05004E]">
                  Budget Categories By Week
                </div>
                <Button onClick={handleBudgetCategoriesByWeekOpen}>Expand</Button>
              </div>
              <Modal
                open={budgetCategoriesByWeek}
                onClose={handleBudgetCategoriesByWeekClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={modalStyle}>
                  <div className="w-full font-bold text-3xl text-[#05004E]">
                    Budget Categories By Week 
                  </div>
                  <Bar options={weeklyOccupancyOptions} data={weeklyOccupancyData} />
                </Box>
              </Modal>
              <Bar options={weeklyOccupancyOptions} data={weeklyOccupancyData} />
            </div>

            <div className="w-full flex flex-col items-center justify-start bg-white rounded-lg p-8 gap-y-8 border border-black">
              <div className="flex justify-between w-full">
                <div className="font-bold text-2xl text-[#05004E]">
                  Age Categories By Week 
                </div>
                <Button onClick={handleAgeCategoriesByWeek}>Expand</Button>
              </div>
              <Modal
                open={ageCategoriesByWeek}
                onClose={handleAgeCategoriesByWeekClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={modalStyle}>
                  <div className="w-full font-bold text-3xl text-[#05004E]">
                    Age Categories By Week  
                  </div>
                  <Bar options={weeklyAgeOccupancyOptions} data={weeklyAgeOccupancyData} />
                </Box>
              </Modal>
              <Bar options={weeklyAgeOccupancyOptions} data={weeklyAgeOccupancyData} />
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ParkingAnalytics;
