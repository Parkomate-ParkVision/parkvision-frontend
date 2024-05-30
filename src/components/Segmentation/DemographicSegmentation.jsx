import React, { useState, useEffect } from 'react';
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
import { Map, Marker, ZoomControl } from "pigeon-maps";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const DemographicSegmentation = () => {
  const [loading, setLoading] = useState(true);
  const [demographicModal, setDemographicModal] = useState(false);
  const handleDemographicModalOpen = () => setDemographicModal(true);
  const handleDemographicModalClose = () => setDemographicModal(false);
  const [topVisitingStates, setTopVisitingStates] = useState(false);
  const handleTopVisitingStatesOpen = () => setTopVisitingStates(true);
  const handleTopVisitingStatesClose = () => setTopVisitingStates(false);
  const [center, setCenter] = useState([21.1466, 79.0882]);
  const [zoom, setZoom] = useState(4);

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
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const pieModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    height: 650,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleMarkerClick = ({ event, anchor, payload }) => {
    console.log("Marker clicked", anchor);
  }

  const topVisitingStatesOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    cutout: "60%",
    radius: "85%",
  };

  const topVisitingStatesLabels = ["Maharashtra", "Delhi", "Karnataka", "Gujarat"];
  const topVisitingStatesData = {
    labels: topVisitingStatesLabels,
    datasets: [
      {
        label: "Top Visiting States",
        data: topVisitingStatesLabels.map((capacity) => faker.number.int({ min: 1, max: 100 })),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6344"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6344"],
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
              Demographic Segmentation
            </div>
          </div>
          <div className="w-full flex flex-row items-stretch justify-start mt-8 gap-x-16">

            <div className="w-full flex flex-col items-center justify-start bg-white rounded-lg p-8 gap-y-8 border border-black">
              <div className="flex justify-between w-full">
                <div className="font-bold text-2xl text-[#05004E]">
                  Location Wise Distribution
                </div>
                <Button onClick={handleDemographicModalOpen}>Expand</Button>
              </div>
              <Modal
                open={demographicModal}
                onClose={handleDemographicModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={modalStyle}>
                  <div className="w-full font-bold text-3xl text-[#05004E]">
                    Location Wise Distribution
                  </div>
                  <Map
                    height={550}
                    center={center}
                    zoom={zoom}
                    onBoundsChanged={({ center, zoom }) => {
                      setCenter(center)
                      setZoom(zoom)
                    }}
                  >
                    <ZoomControl />
                    <Marker width={50} anchor={[28.7041, 77.1025]} onClick={handleMarkerClick} /> {/* Delhi */}
                    <Marker width={50} anchor={[18.5204, 73.8567]} onClick={handleMarkerClick} /> {/* Mumbai */}
                    <Marker width={50} anchor={[12.9716, 77.5946]} onClick={handleMarkerClick} /> {/* Bangalore */}
                    <Marker width={50} anchor={[22.5726, 88.3639]} onClick={handleMarkerClick} /> {/* Kolkata */}
                    <Marker width={50} anchor={[13.0827, 80.2707]} onClick={handleMarkerClick} /> {/* Chennai */}
                    <Marker width={50} anchor={[26.9124, 75.7873]} onClick={handleMarkerClick} /> {/* Jaipur */}
                    <Marker width={50} anchor={[19.0760, 72.8777]} onClick={handleMarkerClick} /> {/* Thane */}
                    <Marker width={50} anchor={[28.6139, 77.2090]} onClick={handleMarkerClick} /> {/* New Delhi */}
                    <Marker width={50} anchor={[11.0168, 76.9558]} onClick={handleMarkerClick} /> {/* Coimbatore */}
                    <Marker width={50} anchor={[19.9975, 73.7898]} onClick={handleMarkerClick} /> {/* Nashik */}
                  </Map>
                </Box>
              </Modal>
              <Map
                height={400}
                center={center}
                zoom={zoom}
                onBoundsChanged={({ center, zoom }) => {
                  setCenter(center)
                  setZoom(zoom)
                }}
              >
                <ZoomControl />
                <Marker
                  width={50}
                  anchor={[28.7041, 77.1025]}
                  onClick={() => {
                    console.log("Delhi");
                  }}
                /> {/* Delhi */}
                <Marker width={50} anchor={[18.5204, 73.8567]} onClick={handleMarkerClick} /> {/* Mumbai */}
                <Marker width={50} anchor={[12.9716, 77.5946]} onClick={handleMarkerClick} /> {/* Bangalore */}
                <Marker width={50} anchor={[22.5726, 88.3639]} onClick={handleMarkerClick} /> {/* Kolkata */}
                <Marker width={50} anchor={[13.0827, 80.2707]} onClick={handleMarkerClick} /> {/* Chennai */}
                <Marker width={50} anchor={[26.9124, 75.7873]} onClick={handleMarkerClick} /> {/* Jaipur */}
                <Marker width={50} anchor={[19.0760, 72.8777]} onClick={handleMarkerClick} /> {/* Thane */}
                <Marker width={50} anchor={[28.6139, 77.2090]} onClick={handleMarkerClick} /> {/* New Delhi */}
                <Marker width={50} anchor={[11.0168, 76.9558]} onClick={handleMarkerClick} /> {/* Coimbatore */}
                <Marker width={50} anchor={[19.9975, 73.7898]} onClick={handleMarkerClick} /> {/* Nashik */}
              </Map>
            </div>

            <div className="w-full flex flex-col items-center justify-start bg-white rounded-lg p-8 gap-y-8 border border-black">
              <div className="flex justify-between w-full">
                <div className="font-bold text-2xl text-[#05004E]">
                  Top Visiting States
                </div>
                <Button onClick={handleTopVisitingStatesOpen}>Expand</Button>
              </div>
              <Modal
                open={topVisitingStates}
                onClose={handleTopVisitingStatesClose}
                aria-labelledby="vehicle-capacity"
                aria-describedby="vehicle-capacity-description"
              >
                <Box sx={pieModalStyle}>
                  <div className="w-full font-bold text-3xl text-[#05004E]">
                    Top Visiting States 
                  </div>
                  <div className="w-full h-full"> {/* Adjust width and height as needed */}
                    <Doughnut options={topVisitingStatesOptions} data={topVisitingStatesData} />
                  </div>
                </Box>
              </Modal>
              <Box width={450} height={450}>
                <Doughnut options={topVisitingStatesOptions} data={topVisitingStatesData}/>
              </Box>
            </div>

          </div>
        </div>
      )
      }
    </div >
  )
}

export default DemographicSegmentation;