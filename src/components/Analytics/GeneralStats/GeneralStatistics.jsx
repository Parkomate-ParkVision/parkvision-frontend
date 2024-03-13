import React, { useState, useEffect, useContext } from "react";
import { DashBoardContext } from "../../../contexts/DashboardContext";
import GeneralStatsCard from "./GeneralStatsCard";
import { EarningsIcon, EntriesIcon, ExitsIcon, FirstTimeEntriesIcon, MaxCustomersIcon } from "./GeneralIcons";
import Slide from "@mui/material/Slide";

const GeneralStatistics = () => {


  const [loading, setLoading] = useState(true);

  const {state, selectedOrganization, vehicleData, dashBoardData, generalStats, setGeneralStats} = useContext(DashBoardContext)

  useEffect(() => {
    
    const data = {
      "Total Earning": 10,
      "Total Entries": 20,
      "Total Exits": 10,
      "First Time Entries": 30,
    };

    setGeneralStats(data);
    setLoading(false);
  }, []);
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="w-[95vw] h-full flex flex-col items-center justify-center border border-gray bg-white rounded-lg p-8 font-poppins">
          <div className="flex flex-col items-center justify-center">
            <div className="font-bold text-2xl text-[#05004E]">
              General Statistics
            </div>
          </div>
          <div className="w-full h-full flex flex-row items-center justify-evenly mt-8 gap-x-8">
            <Slide direction="right" in={true} mountOnEnter unmountOnExit>
              <div>
                <GeneralStatsCard Icon={EarningsIcon} title={`Total Earning`} subtitle={"+8% from yesterday"} value={`Rs ${generalStats["Total Earning"]}`} bgColor="#ffe2e5"/>
              </div>
            </Slide>
            <Slide direction="down" in={true} mountOnEnter unmountOnExit>
              <div>
                <GeneralStatsCard Icon={EntriesIcon} title={`Total Entries`} subtitle={"+5% from yesterday"} value={generalStats["Total Entries"]} bgColor="#fff4de"/>
              </div>
            </Slide>
            <Slide direction="down" in={true} mountOnEnter unmountOnExit>
              <div>
                <GeneralStatsCard Icon={ExitsIcon} title={`Total Exits`} subtitle={"+12% from yesterday"} value={generalStats["Total Exits"]} bgColor="#dcfce7"/>
              </div>
            </Slide>
            <Slide direction="down" in={true} mountOnEnter unmountOnExit>
              <div>
                <GeneralStatsCard Icon={FirstTimeEntriesIcon} title={`First Time Entries`} subtitle={"+1.5% from yesterday"} value={generalStats["First Time Entries"]} bgColor="#f3e8ff"/>
              </div>
            </Slide>
            <Slide direction="left" in={true} mountOnEnter unmountOnExit>
              <div>
                <GeneralStatsCard Icon={MaxCustomersIcon} title={`Maximum Customers`} subtitle={"+1.5% from yesterday"} value={400} bgColor="#ddfbc4"/>
              </div>
            </Slide>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneralStatistics;
