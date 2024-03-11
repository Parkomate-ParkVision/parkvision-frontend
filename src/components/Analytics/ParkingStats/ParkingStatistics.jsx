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

import { Line, Bar } from "react-chartjs-2";

const ParkingAnalytics = () => {
  const [loading, setLoading] = useState(true);

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
              <div className="w-full font-bold text-2xl text-[#05004E]">
                Weekly Occupancy
              </div>
              <Bar options={weeklyOccupancyOptions} data={weeklyOccupancyData} />
            </div>
            <div className="w-full flex flex-col items-center justify-start bg-white rounded-lg p-8 gap-y-8 border border-black">
              <div className="w-full font-bold text-2xl text-[#05004E]">
                Vehicle Types
              </div>
              <Bar options={weeklyVehicleTypesOptions} data={weeklyVehicleTypesData} />
            </div>
            <div className="w-full flex flex-col items-center justify-start bg-white rounded-lg p-8 gap-y-8 border border-black">
              <div className="w-full font-bold text-2xl text-[#05004E]">
                Parking Productivites
              </div>
              <Bar options={weeklyParkingProductivityOptions} data={weeklyParkingProductivityData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParkingAnalytics;
