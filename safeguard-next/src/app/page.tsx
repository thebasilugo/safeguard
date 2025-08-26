"use client";
import React, { useState } from "react";
import LandingPage from "./pages/landing/page";
import LoginPage from "./auth/login/page";
import SignupPage from "./auth/signup/page";
import Dashboard from "./pages/dashboard/page";
import CybersecurityTips from "@/components/CyberTips";
import PasswordStrengthChecker from "@/components/PasswordStrengthChecker";
import EnhancedPasswordGenerator from "@/components/PasswordGenerator";
import BruteForceVisualTool from "@/components/BruteForceVisualTool";

const MainPage = () => {
	const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);

	const handleClosePasswordGenerator = () => {
		setShowPasswordGenerator(false);
	};

	return (
		<div>
			<LandingPage />
			{/* <LoginPage /> */}
			{/* <SignupPage /> */}
			{/* <Dashboard /> */}
			{/* <CybersecurityTips /> */}
			{/* <PasswordStrengthChecker /> */}
			{/* <BruteForceVisualTool /> */}

			{/* Conditionally render the password generator modal */}
			{showPasswordGenerator && (
				<EnhancedPasswordGenerator onClose={handleClosePasswordGenerator} />
			)}

			<button
				onClick={() => setShowPasswordGenerator(true)}
				className="bg-gray-900 hover:border-gray-900 border text-white px-4 py-2 rounded-md fixed top-8 right-8"
			>
				{/* className="bg-gray-900 hover:border-white hover:text-gray-900 hover:bg-white text-white px-4 py-2 rounded-md fixed top-8 right-8" */}
				Open Password Generator
			</button>
		</div>
	);
};

export default page;
