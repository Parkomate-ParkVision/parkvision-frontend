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
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';


const VehicleSegmentation = () => {
  const [loading, setLoading] = useState(true);
  const [categoryModal, setCategoryModal] = useState(false);
  const [ageModal, setAgeModal] = useState(false);
  const [capacityModal, setCapacityModal] = useState(false);
  const handleCategoryOpen = () => setCategoryModal(true);
  const handleCategoryClose = () => setCategoryModal(false);
  const handleAgeOpen = () => setAgeModal(true);
  const handleAgeClose = () => setAgeModal(false);
  const handleCapacityOpen = () => setCapacityModal(true);
  const handleCapacityClose = () => setCapacityModal(false);

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

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

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
        data: vehicleCategories.map(() => faker.number.int({ min: 100, max: 500 })),
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
        data: seatingCapacityLabels.map((capacity) => faker.number.int({ min: 100, max: 500 })),
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
              <div className="flex justify-between w-full">
                <div className="font-bold text-2xl text-[#05004E]">
                  Vehicle Category
                </div>
                <Button onClick={handleCategoryOpen}>Expand</Button>
              </div>
              <Modal
                open={categoryModal}
                onClose={handleCategoryClose}
                aria-labelledby="vehicle-category"
                aria-describedby="vehicle-category-description"
              >
                <Box sx={modalStyle}>
                  <div className="w-full font-bold text-3xl text-[#05004E]">
                    Vehicle Category
                  </div>
                  <Doughnut options={vehicleCategoryOptions} data={vehicleCategoryData} />
                </Box>
              </Modal>
              <Doughnut options={vehicleCategoryOptions} data={vehicleCategoryData} />
            </div>

            <div className="w-full flex flex-col items-center justify-start bg-white rounded-lg p-8 gap-y-8 border border-black">
              <div className="flex justify-between w-full">
                <div className="font-bold text-2xl text-[#05004E]">
                  Vehicle Ages
                </div>
                <Button onClick={handleAgeOpen}>Expand</Button>
              </div>
              <Modal
                open={ageModal}
                onClose={handleAgeClose}
                aria-labelledby="vehicle-ages"
                aria-describedby="vehicle-ages-description"
              >
                <Box sx={modalStyle}>
                  <div className="w-full font-bold text-3xl text-[#05004E]">
                    Vehicle Ages 
                  </div>
                  <Doughnut options={vehicleAgeOptions} data={vehicleAgeData} />
                </Box>
              </Modal>
              <Doughnut options={vehicleAgeOptions} data={vehicleAgeData} />
            </div>

            <div className="w-full flex flex-col items-center justify-start bg-white rounded-lg p-8 gap-y-8 border border-black">
              <div className="flex justify-between w-full">
                <div className="font-bold text-2xl text-[#05004E]">
                  Vehicle Capacity
                </div>
                <Button onClick={handleCapacityOpen}>Expand</Button>
              </div>
              <Modal
                open={capacityModal}
                onClose={handleCapacityClose}
                aria-labelledby="vehicle-capacity"
                aria-describedby="vehicle-capacity-description"
              >
                <Box sx={modalStyle}>
                  <div className="w-full font-bold text-3xl text-[#05004E]">
                    Vehicle Capacity 
                  </div>
                  <Doughnut options={seatingCapacityOptions} data={seatingCapacityData} />
                </Box>
              </Modal>
              <Doughnut options={seatingCapacityOptions} data={seatingCapacityData} />
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleSegmentation;