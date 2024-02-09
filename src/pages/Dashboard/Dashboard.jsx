import FrequencyHero from "../../components/FrequencyHero/FrequencyHero";
import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const options = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-white">
      <div className="w-1/4 border border-gray rounded-lg h-full">
        <FrequencyHero
          options={options}
          selectedOption={selectedOption}
          handleChange={handleChange}
        />
      </div>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-full">
          <div className="font-bold text-2xl">Loading...</div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <div className="flex flex-row justify-center items-start gap-x-8">
            <div className="flex flex-col justify-center items-center">
              <div className="w-full h-full text-center text-black text-[25px] font-inter">
                Entries
              </div>
              <div className="w-[367px] h-44 bg-[#f4f2ee] rounded-t-[20px] border-t-2 border-l-2 border-r-2 border-[#8DBF41] flex flex-col"></div>
              <div className="w-full h-full flex flex-col items-center justify-center text-center text-neutral-200 text-[25px] font-medium font-inter border border-black rounded-b-[20px] bg-black text-white cursor-pointer hover:bg-white hover:text-black hover:border-b-[#8DBF41] transition duration-300 ease-in-out">
                View Details
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="w-[151px] h-[38px] text-center text-black text-[25px] font-inter">
                Revenue
              </div>
              <div className="w-[367px] h-44 bg-[#f4f2ee] rounded-t-[20px] border-t-2 border-l-2 border-r-2 border-[#8DBF41] flex flex-col"></div>
              <div className="w-full h-full flex flex-col items-center justify-center text-center text-neutral-200 text-[25px] font-medium font-inter border border-black rounded-b-[20px] bg-black text-white cursor-pointer hover:bg-white hover:text-black hover:border-b-[#8DBF41] transition duration-300 ease-in-out">
                View Details
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="w-[151px] h-[38px] text-center text-black text-[25px] font-inter">
                Occupied
              </div>
              <div className="w-[150px] h-[150px] bg-[#f4f2ee] rounded-full flex flex-col items-center justify-center">
                <div className="w-28 h-[61px] text-center text-black text-[40px] font-inter">
                  82%
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
