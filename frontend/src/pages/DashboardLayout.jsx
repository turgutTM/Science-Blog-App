import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const DashboardLayout = () => {
	return (
		<div style={{ display: "flex" }}>
			<SideBar></SideBar>
			<Outlet></Outlet>
		</div>
	);
};

export default DashboardLayout;
