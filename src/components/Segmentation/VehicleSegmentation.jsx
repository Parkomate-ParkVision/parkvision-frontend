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
  ArcElement
} from "chart.js";
import { faker } from "@faker-js/faker";

import { Doughnut } from "react-chartjs-2";

const VehicleSegmentation = () => {
  const [loading, setLoading] = useState(true);

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
    ArcElement
  );

  const vehicleCategoryOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    cutout: "60%",
    radius: "85%",
  };

  const vehicleCategories = ["Budget", "Premium", "Luxury"];
  const vehicleCategoryData = {
    labels: ["Budget", "Premium", "Luxury"],
    datasets: [
      {
        label: "Vehicle Category",
        data: vehicleCategories.map(() => faker.number.int({min: 100, max: 500})),
        backgroundColor: ["#FF6F61", "#FFD166", "#06D6A0"],
        hoverBackgroundColor: ["#FF6F61", "#FFD166", "#06D6A0"],
      },
    ],
  };

  const vehicleAgeOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    cutout: "60%",
    radius: "85%",
  };

  const vehicleAges = ["0-5 years", "5-10 years", "10+ years"];
  const vehicleAgeData = {
    labels: vehicleAges,
    datasets: [
      {
        label: "Vehicle Age",
        data: vehicleAges.map(() => faker.number.int({ min: 100, max: 500 })),
        backgroundColor: ["#FF8C00", "#FFD700", "#32CD32"],
        hoverBackgroundColor: ["#FF8C00", "#FFD700", "#32CD32"],
      },
    ],
  };

  const seatingCapacityOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    cutout: "60%",
    radius: "85%",
  };
  
  const seatingCapacityLabels = ["4-seater", "7-seater", "Others"];
  const seatingCapacityData = {
    labels: seatingCapacityLabels,
    datasets: [
      {
        label: "Seating Capacity",
        data: seatingCapacityLabels.map((capacity) => faker.number.int({min: 100, max: 500})),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
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
              Vehicle Segmentation 
            </div>
          </div>
          <div className="w-full flex flex-row items-stretch justify-start mt-8 gap-x-16">
            <div className="w-full flex flex-col items-center justify-start bg-white rounded-lg p-8 gap-y-8 border border-black">
              <div className="w-full font-bold text-2xl text-[#05004E]">
                Vehicle Category  
              </div>
              <Doughnut options={vehicleCategoryOptions} data={vehicleCategoryData} />
            </div>
            <div className="w-full flex flex-col items-center justify-start bg-white rounded-lg p-8 gap-y-8 border border-black">
              <div className="w-full font-bold text-2xl text-[#05004E]">
                Vehicle Ages 
              </div>
              <Doughnut options={vehicleAgeOptions} data={vehicleAgeData} />
            </div>
            <div className="w-full flex flex-col items-center justify-start bg-white rounded-lg p-8 gap-y-8 border border-black">
              <div className="w-full font-bold text-2xl text-[#05004E]">
                Vehicle Seating Capacity
              </div>
              <Doughnut options={seatingCapacityOptions} data={seatingCapacityData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleSegmentation;
