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
} from "chart.js";
import { faker } from "@faker-js/faker";
import { Line } from "react-chartjs-2";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';


const VisitorAnalyticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [visitorInsights, setVisitorInsights] = useState(false);
  const [visitorsByHours, setVisitorsByHours] = useState(false);
  const handleVisitorInsightsOpen = () => setVisitorInsights(true);
  const handleVisitorInsightsClose = () => setVisitorInsights(false);
  const handleVisitorsByHoursOpen = () => setVisitorsByHours(true);
  const handleVisitorsByHoursClose = () => setVisitorsByHours(false);

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
    Filler
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

  const hoursOfDay = [
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
    "7 PM",
    "8 PM",
    "9 PM",
  ];

  const visitorInsightsOptions = {
    responsive: true,
    elements: {
      line: {
        tension: 0.3,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const visitorsByHoursOptions = {
    responsive: true,
    elements: {
      line: {
        tension: 0.3,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const visitorInsightchartData = {
    labels: months,
    datasets: [
      {
        label: "New Visitors",
        data: months.map(() => faker.number.int({ min: 0, max: 1000 })),
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.5)",
      },
      {
        label: "Returning Visitors",
        data: months.map(() => faker.number.int({ min: 0, max: 1000 })),
        borderColor: "rgb(167, 0, 255)",
        backgroundColor: "rgba(167, 0, 255, 1)",
      },
    ],
  };

  const sampleData = hoursOfDay.map(() => faker.number.int({ min: 0, max: 1000 }));
  const visitorsByHoursData = {
    labels: hoursOfDay,
    datasets: [
      {
        label: "Total Occupied",
        data: sampleData,
        borderColor: "rgb(5, 194, 131)",
        backgroundColor: "rgba(5, 194, 131, 0.5)",
        pointBackgroundColor: sampleData.map((value) =>
          value > 700 ? "rgba(178, 34, 52, 1)" : "rgb(5, 194, 131)"
        ),
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
              Visitor Statistics
            </div>
          </div>
          <div className="w-full flex flex-row items-stretch justify-start mt-8 gap-x-16">

            <div className="w-full flex flex-col items-center justify-start bg-white rounded-lg p-8 gap-y-8 border border-black">
              <div className="flex justify-between w-full">
                <div className="font-bold text-2xl text-[#05004E]">
                  Visitor Insights
                </div>
                <Button onClick={handleVisitorInsightsOpen}>Expand</Button>
              </div>
              <Modal
                open={visitorInsights}
                onClose={handleVisitorInsightsClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={modalStyle}>
                  <div className="w-full font-bold text-3xl text-[#05004E]">
                    Visitor Insights
                  </div>
                  <Line options={visitorInsightsOptions} data={visitorInsightchartData} />
                </Box>
              </Modal>
              <Line options={visitorInsightsOptions} data={visitorInsightchartData} />
            </div>

            <div className="w-full flex flex-col items-center justify-start bg-white rounded-lg p-8 gap-y-8 border border-black">
              <div className="flex justify-between w-full">
                <div className="font-bold text-2xl text-[#05004E]">
                  Visitors By Hours (RH)
                </div>
                <Button onClick={handleVisitorsByHoursOpen}>Expand</Button>
              </div>
              <Modal
                open={visitorsByHours}
                onClose={handleVisitorsByHoursClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={modalStyle}>
                  <div className="w-full font-bold text-3xl text-[#05004E]">
                    Visitor By Hours (RH)
                  </div>
                  <Line options={visitorsByHoursOptions} data={visitorsByHoursData} />
                </Box>
              </Modal>
              <Line options={visitorsByHoursOptions} data={visitorsByHoursData} />
            </div>

            <div className="w-full flex flex-col items-center justify-center gap-y-8 border border-black rounded-lg">
              <div className="w-[100%] flex flex-col items-center justify-center bg-white rounded-lg p-8 gap-y-4">
                <div className="font-bold text-2xl text-[#05004E]">
                  Total Current Visitors
                </div>
                <div className="font-bold text-4xl text-black">145</div>
              </div>
              <div className="w-[100%] flex flex-col items-center justify-center bg-white rounded-lg p-8 gap-y-4">
                <div className="font-bold text-2xl text-[#05004E]">
                  Slots Available
                </div>
                <div className="font-bold text-4xl text-black">135</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitorAnalyticsPage;
