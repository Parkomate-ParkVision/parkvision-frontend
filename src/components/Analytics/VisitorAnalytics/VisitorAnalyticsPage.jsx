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

const VisitorAnalyticsPage = () => {
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
    Filler
  );

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const chartOptions = {
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

  const chartData = {
    labels,
    datasets: [
      {
        label: "This Year",
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        fill: "origin",
      },
      {
        label: "Last Year",
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="w-[90vw] h-full flex flex-col items-center justify-center font-poppins border border-gray rounded-lg p-8">
          <div className="w-full flex flex-row items-stretch justify-start gap-x-16">
            <div className="w-full flex flex-col items-center justify-start bg-white rounded-lg p-8 gap-y-8">
              <div className="w-full font-bold text-2xl text-[#05004E]">
                Visitor Insights
              </div>
              <Line options={chartOptions} data={chartData} />
            </div>
            <div className="w-full flex flex-col items-center justify-start bg-white rounded-lg p-8 gap-y-8">
              <div className="w-full font-bold text-2xl text-[#05004E]">
                Visitors By Hours
              </div>
              <Line options={chartOptions} data={chartData} />
            </div>
            <div className="w-full flex flex-col items-center justify-center gap-y-8">
              <div className="w-[100%] flex flex-col items-center justify-center border border-gray bg-white rounded-lg p-8 gap-y-4">
                <div className="font-bold text-2xl text-[#05004E]">
                  Total Current Visitors
                </div>
                <div className="font-bold text-4xl text-black">145</div>
              </div>
              <div className="w-[100%] flex flex-col items-center justify-center border border-gray bg-white rounded-lg p-8 gap-y-4">
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
