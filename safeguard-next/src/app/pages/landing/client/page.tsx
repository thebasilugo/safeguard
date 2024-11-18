"use client";

import React, { useState } from "react";
import {
	Eye,
	EyeOff,
	RefreshCw,
	CheckCircle,
	Copy,
	Trash,
	Plus,
} from "lucide-react";

export default function ClientComponent() {
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(true);
	const [passwordStrength, setPasswordStrength] = useState(0);
	const [activeTab, setActiveTab] = useState("generate");
	const [savedPasswords, setSavedPasswords] = useState([
		{
			id: 1,
			website: "thebasilugo.com",
			username: "ugo@admin.com",
			password: "ex@mplePassword123",
		},
	]);
	const [newPassword, setNewPassword] = useState({
		website: "",
		username: "",
		password: "",
	});
	const [showAddPasswordModal, setShowAddPasswordModal] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const checkPasswordStrength = (pwd: string) => {
		let strength = 0;
		if (pwd.length >= 8) strength += 25;
		if (pwd.match(/[A-Z]/)) strength += 25;
		if (pwd.match(/[0-9]/)) strength += 25;
		if (pwd.match(/[^A-Za-z0-9]/)) strength += 25;
		setPasswordStrength(strength);
	};

	const generatePassword = () => {
		const chars =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
		let newPassword = "";
		for (let i = 0; i < 16; i++) {
			newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
		}
		setPassword(newPassword);
		checkPasswordStrength(newPassword);
	};

	const copyPassword = () => {
		navigator.clipboard.writeText(password);
		alert("Password copied to clipboard!");
	};

	const addNewPassword = () => {
		if (newPassword.website && newPassword.username && newPassword.password) {
			setSavedPasswords([
				...savedPasswords,
				{ ...newPassword, id: Date.now() },
			]);
			setNewPassword({ website: "", username: "", password: "" });
			setShowAddPasswordModal(false);
		}
	};

	const deletePassword = (id: number) => {
		setSavedPasswords(savedPasswords.filter((pw) => pw.id !== id));
	};

	return (
		<div>
			<section id="demo" className="mb-16 lg:mx-40">
				<h3 className="text-3xl font-semibold text-center mb-8">
					Experience Safeguard in Action
				</h3>
				<div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
					<div className="p-6">
						<h4 className="text-xl font-semibold text-green-500 mb-2">
							Password Tools Demo
						</h4>
						<p className="text-gray-400 mb-4">
							Generate, check, and manage your passwords securely.
						</p>
					</div>
					<div className="border-t border-gray-700">
						<div className="flex mt-1">
							<button
								className={`flex-1 py-2 px-4 text-center btn ${
									activeTab === "generate"
										? "bg-green-500 text-white ml-6 rounded-md"
										: "bg-gray-700 text-gray-300 ml-6 rounded-md"
								}`}
								onClick={() => setActiveTab("generate")}
							>
								Generate
							</button>
							<button
								className={`flex-1 py-2 px-4 text-center btn ${
									activeTab === "check"
										? "bg-green-500 text-white mx-1 rounded-md"
										: "bg-gray-700 text-gray-300 mx-1 rounded-md"
								}`}
								onClick={() => setActiveTab("check")}
							>
								Check
							</button>
							<button
								className={`flex-1 py-2 px-4 text-center btn ${
									activeTab === "manage"
										? "bg-green-500 text-white mr-6 rounded-md"
										: "bg-gray-700 text-gray-300 mr-6 rounded-md"
								}`}
								onClick={() => setActiveTab("manage")}
							>
								Manage
							</button>
						</div>
						<div className="p-6 h-64 overflow-y-auto">
							{activeTab === "generate" && (
								<div className="space-y-4">
									<div className="flex space-x-2">
										<input
											type="text"
											value={password}
											onChange={(e) => {
												setPassword(e.target.value);
												checkPasswordStrength(e.target.value);
											}}
											placeholder="Generated password"
											className="flex-1 bg-gray-700 border border-gray-600 text-white rounded px-3 py-2"
										/>
										<button
											onClick={generatePassword}
											className="bg-green-500 hover:bg-green-600 text-white rounded p-2 btn"
										>
											<RefreshCw className="h-5 w-5" />
										</button>

										<button
											onClick={copyPassword}
											className="bg-blue-500 hover:bg-blue-600 text-white rounded p-2 btn"
										>
											<Copy className="h-5 w-5" />
										</button>
									</div>
									<div>
										<div className="text-sm text-gray-400 mb-1">
											Password Strength
										</div>
										<div className="w-full bg-gray-700 rounded-full h-2.5">
											<div
												className="bg-green-500 h-2.5 rounded-full"
												style={{ width: `${passwordStrength}%` }}
											></div>
										</div>
									</div>
								</div>
							)}
							{activeTab === "check" && (
								<div className="space-y-4">
									<div className="flex space-x-2">
										<input
											type={showPassword ? "text" : "password"}
											placeholder="Enter a password to check"
											className="w-full bg-gray-700 border border-gray-600 text-white rounded px-3 py-2"
											onChange={(e) => checkPasswordStrength(e.target.value)}
											value={password}
										/>
										<button
											onClick={() => setShowPassword(!showPassword)}
											className="bg-gray-700 border border-gray-600 rounded p-2 btn"
										>
											{showPassword ? (
												<EyeOff className="h-5 w-5" />
											) : (
												<Eye className="h-5 w-5" />
											)}
										</button>
									</div>
									<div>
										<div className="text-sm text-gray-400 mb-1">
											Password Strength
										</div>
										<div className="w-full bg-gray-700 rounded-full h-2.5">
											<div
												className="bg-green-500 h-2.5 rounded-full"
												style={{ width: `${passwordStrength}%` }}
											></div>
										</div>
									</div>
									<p className="text-gray-400">
										{passwordStrength < 50 &&
											"Weak: Consider using a stronger password."}
										{passwordStrength >= 50 &&
											passwordStrength < 75 &&
											"Moderate: Your password is okay, but could be stronger."}
										{passwordStrength >= 75 &&
											"Strong: Your password is secure."}
									</p>
								</div>
							)}
							{activeTab === "manage" && (
								<div className="space-y-4">
									<div className="space-y-2">
										{savedPasswords.map((savedPassword) => (
											<div
												key={savedPassword.id}
												className="flex justify-between items-center bg-gray-700 p-2 rounded"
											>
												<div className="ml-1">
													<p className="font-semibold">
														{savedPassword.website}
													</p>
													<p className="text-sm text-gray-400">
														{savedPassword.username}
													</p>
													<p className="text-sm text-gray-400">
														{isLoggedIn ? savedPassword.password : "••••••••"}
													</p>
												</div>
												<button
													onClick={() => deletePassword(savedPassword.id)}
													className="btn text-red-500 hover:text-red-400 hover:bg-gray-600 p-4 rounded-full"
												>
													<Trash className="h-5 w-5 mx-auto" />
												</button>
											</div>
										))}
									</div>
									{/* <button
										onClick={() => setShowAddPasswordModal(true)}
										className="btn w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center cursor-not-allowed disabled:opacity-75"
										disabled
									>
										<Plus className="h-5 w-5 mr-2" />
										Add New Password
									</button> */}
									<span className="flex justify-center">
										{/* <em className="text-red-400 text-[12px]">
											Login to add passwords
										</em> */}
										<em className="text-blue-400 text-[12px]">coming soon </em>
									</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</section>

			{/* <section id="pricing" className="mb-16">
				<h3 className="text-3xl font-semibold text-center mb-8">
					Choose Your Security Level
				</h3>
				<div className="grid md:grid-cols-3 gap-8">
					<PricingCard
						title="Basic"
						price="$4.99"
						features={[
							"Password Manager",
							"Password Generator",
							"Basic Security Tips",
						]}
					/>
					<PricingCard
						title="Pro"
						price="$9.99"
						features={[
							"All Basic features",
							"Advanced Password Checker",
							"Brute Force Visualizer",
							"Priority Support",
						]}
						highlighted={true}
					/>
					<PricingCard
						title="Enterprise"
						price="Custom"
						features={[
							"All Pro features",
							"Team Management",
							"Advanced Analytics",
							"Dedicated Support",
						]}
					/>
				</div>
			</section> */}

			{showAddPasswordModal && (
				<div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
						<h2 className="text-xl font-bold mb-4">Add New Password</h2>
						<div className="space-y-4">
							<input
								type="text"
								placeholder="Website"
								value={newPassword.website}
								onChange={(e) =>
									setNewPassword({ ...newPassword, website: e.target.value })
								}
								className="w-full bg-gray-700 border border-gray-600 text-white rounded px-3 py-2"
							/>
							<input
								type="text"
								placeholder="Username"
								value={newPassword.username}
								onChange={(e) =>
									setNewPassword({ ...newPassword, username: e.target.value })
								}
								className="w-full bg-gray-700 border border-gray-600 text-white rounded px-3 py-2"
							/>
							<div className="flex space-x-2">
								<input
									type={showPassword ? "text" : "password"}
									placeholder="Password"
									value={newPassword.password}
									onChange={(e) =>
										setNewPassword({ ...newPassword, password: e.target.value })
									}
									className="w-full bg-gray-700 border border-gray-600 text-white rounded px-3 py-2"
								/>
								<button
									onClick={() => setShowPassword(!showPassword)}
									className="btn bg-gray-700 border border-gray-600 rounded p-2"
								>
									{showPassword ? (
										<EyeOff className="h-5 w-5" />
									) : (
										<Eye className="h-5 w-5" />
									)}
								</button>
							</div>
						</div>
						<div className="flex justify-end mt-6 space-x-4">
							<button
								onClick={() => setShowAddPasswordModal(false)}
								className="btn bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
							>
								Cancel
							</button>
							<button
								onClick={addNewPassword}
								className="btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
							>
								Add Password
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

function PricingCard({ title, price, features, highlighted = false }: any) {
	const [showModal, setShowModal] = useState(false);

	return (
		<div
			className={`bg-gray-800 border ${
				highlighted ? "border-green-500 border-2" : "border-gray-700"
			} rounded-lg p-6`}
		>
			<h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
			<div className="text-gray-400 mb-4">
				<span className="text-2xl font-bold text-green-500">{price}</span>
				{price !== "Custom" && <span className="text-sm">/month</span>}
			</div>
			<ul className="space-y-2 mb-6">
				{features.map((feature: string, index: number) => (
					<li key={index} className="flex items-center text-gray-400">
						<CheckCircle className="h-5 w-5 text-green-500 mr-2" />
						{feature}
					</li>
				))}
			</ul>
			<button
				onClick={() => setShowModal(true)}
				className="btn w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
			>
				Choose Plan
			</button>
			{showModal && (
				<div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
						<h2 className="text-xl font-bold mb-4">Confirm {title} Plan</h2>
						<p>
							Are you sure you want to choose the {title} plan for {price}?
						</p>
						<div className="flex justify-end mt-6 space-x-4">
							<button
								onClick={() => setShowModal(false)}
								className="btn bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
							>
								Cancel
							</button>
							<button
								onClick={() => {
									// Add logic for confirming plan selection here
									setShowModal(false);
								}}
								className="btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
							>
								Confirm
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
