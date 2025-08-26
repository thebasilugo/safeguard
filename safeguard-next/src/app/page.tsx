"use client";
import React, { useState } from "react";
import LandingPage from "./pages/landing/page";
import LoginPage from "./auth/login/page";
import SignupPage from "./auth/signup/page";
import Dashboard from "./pages/dashboard/page";
import CybersecurityTips from "@/components/CyberTips";
import PasswordStrengthChecker from "@/components/PasswordStrengthChecker";
import PasswordGenerator from "@/components/PasswordGenerator";
import BruteForceVisualTool from "@/components/BruteForceVisualTool";

const page = () => {
	return (
		<div>
			<LandingPage />
			{/* <LoginPage /> */}
			{/* <SignupPage /> */}
			{/* <Dashboard /> */}
			{/* <CybersecurityTips /> */}
			{/* <PasswordStrengthChecker /> */}
			{/* <PasswordGenerator /> */}
			{/* <BruteForceVisualTool /> */}
		</div>
	);
};

export default page;
