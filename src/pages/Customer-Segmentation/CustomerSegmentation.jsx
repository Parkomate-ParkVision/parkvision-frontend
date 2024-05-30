import {
	Box,
	Card,
	CardHeader,
	Container,
	Unstable_Grid2 as Grid,
} from "@mui/material";
import Slide from "@mui/material/Slide";

import { OverviewEntries } from "../../components/Overview/overview-entries";
import { OverviewExits } from "../../components/Overview/overview-exits";
import { OverviewOccupancy } from "../../components/Overview/overview-occupancy";
import FrequencyHero from "../../components/FrequencyHero/FrequencyHero";
import { useState, useEffect } from "react";
import Fetch from "../../utils/Fetch";
import { ApiConfig } from "../../utils/config";
import axios from "axios";
import { OverviewCarsParked } from "../../components/Overview/overview-cars-parked";
import { BarChart } from "@mui/x-charts/BarChart";
import { OverviewTraffic } from "../../components/Overview/overview-traffic";
import { OverviewAverageOccupancy } from "../../components/Overview/overview-average-occupancy";
import GeneralStatistics from "../../components/Analytics/GeneralStats/GeneralStatistics";
import VehicleSegmentation from "../../components/Segmentation/VehicleSegmentation";
import OwnerSegmentation from "../../components/Segmentation/OwnerSegmentation";
import DemographicSegmentation from "../../components/Segmentation/DemographicSegmentation";


const now = new Date();

const DashboardCopy = () => {
	const options = [
		{ value: "Daily", label: "Daily" },
		{ value: "Weekly", label: "Weekly" },
		{ value: "Monthly", label: "Monthly" },
	];

	const [state, setState] = useState({ value: "Daily", label: "Daily" });
	const [selectedOrganization, setSelectedOrganization] = useState(null);
	const [organizations, setOrganizations] = useState({ results: [] });
	const [vehicleData, setVehicleData] = useState([]);
	const [dashBoardData, setDashBoardData] = useState({});

	const [isloading, setisLoading] = useState(true);

	// const fetchVehicleData = async (orgData) => {
	// 	try {
	// 		const response = await Fetch.get(
	// 			ApiConfig.getVehiclesByOrganization + "/" + orgData.id + "/"
	// 		);
	// 		if (response.status === 200) {
	// 			const data = await response.json();
	// 			console.log(data);
	// 			setVehicleData(data);
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	// const fetchDashBoardData = async (orgData) => {
	// 	try {
	// 		const response = await Fetch.get(
	// 			ApiConfig.dashboard + "/" + orgData.id + "/"
	// 		);
	// 		if (response.status === 200) {
	// 			const data = await response.json();
	// 			console.log(data);
	// 			setDashBoardData(data);

	// 			setisLoading(false);
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	// const fetchOrganizations = () => {
	// 	axios
	// 		.get(ApiConfig.organizationNoPagination, {
	// 			headers: {
	// 				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
	// 			},
	// 		})
	// 		.then((response) => {
	// 			setOrganizations(response.data);
	// 			setSelectedOrganization(response.data[0]);
	// 			fetchVehicleData(response.data[0]);
	// 			fetchDashBoardData(response.data[0]);
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// };

	useEffect(() => {
		setisLoading(true);
		// fetchOrganizations();
		setOrganizations([
			{
				id: 1,
				name: "Organization 1",
			},
			{
				id: 2,
				name: "Organization 2",
			},
		]);
		setSelectedOrganization({
			id: 1,
			name: "Organization 1",
		});
		setVehicleData([
			{
				id: 1,
				vehicle_number: "1234",
				owner_name: "Owner 1",
				owner_phone: "1234567890",
				owner_email: "",
				owner_address: "",
			}
		]);
		setDashBoardData({
			TotalEarning: 1000,
			TotalEntries: 100,
			TotalExits: 50,
			FirstTimeEntries: 10,
		});
		setisLoading(false);
	}, []);

	const handleStateChange = (option) => {
		setState(option);
	};

	if (isloading) {
		return <div>Loading...</div>;
	}
	return (
		<>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
				}}
				className="w-full h-full bg-white flex flex-col items-center justify-center gap-y-8"
			>
				<div className="flex flex-row items-evenly justify-center w-full h-20 bg-[#f4f2ed] max-md:flex-col border border-gray">
					<div className="w-[33%] flex flex-row items-center justify-center gap-x-8">
						<h1>Organization: </h1>
						<select
							name="Organization"
							id="organization"
							className="p-4"
							value={selectedOrganization && selectedOrganization.id}
							onChange={(e) => {
								const selectedOrg = organizations.find(
									(organization) => organization.id == e.target.value
								);
								setSelectedOrganization(selectedOrg);
								fetchVehicleData(selectedOrg);
								fetchDashBoardData(selectedOrg);
							}}
						>
							{organizations.map((organization) => (
								<option value={organization.id} key={organization.id}>
									{organization.name}
								</option>
							))}
						</select>
					</div>
					<div className="w-[66%] flex flex-row items-center justify-evenly">
						<h1>Frequency: </h1>
						<div className="flex flex-row items-evenly justify-between align-middle p-2 w-full h-full">
							<FrequencyHero
								options={options}
								selectedOption={state}
								handleChange={handleStateChange}
							/>
						</div>
					</div>
				</div>
				<Container className="flex flex-row items-evenly justify-center w-full">
					<div className="w-full flex flex-col items-center justify-center gap-y-8 my-8">
						<VehicleSegmentation />
						<OwnerSegmentation />
						<DemographicSegmentation />
					</div>
				</Container>
			</Box>
		</>
	);
};

export default DashboardCopy;
