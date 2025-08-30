"use client";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Importing eye icons

const PasswordStrengthChecker = () => {
	const [password, setPassword] = useState("");
	const [strengthMessage, setStrengthMessage] = useState(
		"Password field is empty!"
	);
	const [progressWidth, setProgressWidth] = useState(0);
	const [progressColor, setProgressColor] = useState("bg-transparent");
	const [showPassword, setShowPassword] = useState(false); // To toggle password visibility
	const [nickname, setNickname] = useState(""); // To store password nickname
	const [website, setWebsite] = useState(""); // To store website name
	const [savedPasswords, setSavedPasswords] = useState([]); // To hold saved passwords
	const [showSaveModal, setShowSaveModal] = useState(false); // Modal for saving password
	const [showCopyModal, setShowCopyModal] = useState(false); // Modal for copying password

	const evaluatePasswordStrength = (password: string) => {
		if (password.trim() === "") {
			return "Password field is empty!";
		}
		if (password.length < 8) {
			return "Password is too short!";
		}

		const hasUpperCase = /[A-Z]/.test(password);
		const hasLowerCase = /[a-z]/.test(password);
		const hasNumbers = /\d/.test(password);
		const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

		const checks = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar];
		const strengthLevel = checks.filter(Boolean).length;

		switch (strengthLevel) {
			case 0:
			case 1:
				return "Very Weak";
			case 2:
				return "Weak";
			case 3:
				return "Moderate";
			case 4:
				return "Strong";
			default:
				return "Invalid";
		}
	};

	const getProgressBarDetails = (strength: string) => {
		switch (strength) {
			case "Very Weak":
				return { width: 25, color: "red-600" };
			case "Weak":
				return { width: 50, color: "orange-600" };
			case "Moderate":
				return { width: 75, color: "yellow-600" };
			case "Strong":
				return { width: 100, color: "green-600" };
			default:
				return { width: 0, color: "transparent" };
		}
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newPassword = e.target.value;
		setPassword(newPassword);

		const strength = evaluatePasswordStrength(newPassword);
		setStrengthMessage(strength);

		const { width, color } = getProgressBarDetails(strength);
		setProgressWidth(width);
		setProgressColor(color);
	};

	const copyPasswordToClipboard = () => {
		navigator.clipboard.writeText(password);
		setShowCopyModal(true); // Show copy modal after copying
	};

	const savePassword = () => {
		if (password && nickname && website) {
			// setSavedPasswords([
			// 	...savedPasswords,
			// 	{ password, nickname, website }
			// ]);
			alert("Password saved successfully!");
			setNickname("");
			setWebsite("");
			setShowSaveModal(false); // Close save modal
		} else {
			alert("Please fill in all fields!");
		}
	};

	const closeModal = (modalType: "save" | "copy") => {
		if (modalType === "save") {
			setShowSaveModal(false);
		} else {
			setShowCopyModal(false);
		}
	};

	return (
		<div className="bg-white p-8 rounded-lg shadow-lg w-96 mx-auto mt-[8rem]">
			<h1 className="text-2xl font-bold mb-6">Password Strength Checker</h1>
			<div className="relative mb-4">
				<input
					type={showPassword ? "text" : "password"}
					value={password}
					onChange={handlePasswordChange}
					placeholder="Enter your password"
					className="border border-gray-300 p-2 w-full rounded"
				/>
				<button
					onClick={() => setShowPassword(!showPassword)}
					className="absolute right-2 top-2 bg-blue-500 text-white px-2 py-1 rounded"
				>
					{showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
				</button>
			</div>

			<p
				className={`mt-1 mb-4 py-1 text-bold text-lg text-${progressColor} border border-${progressColor} text-center rounded-md`}
			>
				{strengthMessage}
			</p>

			<div className="w-full bg-gray-300 rounded h-2 mt-2">
				<div
					className={`h-full rounded transition-all duration-300 bg-${progressColor}`}
					style={{ width: `${progressWidth}%` }}
				></div>
			</div>

			{/* Copy Password Button */}
			<button
				onClick={copyPasswordToClipboard}
				className="mt-4 bg-green-500 text-white py-2 px-4 rounded w-full disabled:bg-opacity-40 disabled:cursor-not-allowed"
				disabled={!password}
			>
				Copy Password
			</button>

			{/* Modal for Copy Password Confirmation */}
			{showCopyModal && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
					onClick={() => closeModal("copy")} // Close modal on backdrop click
				>
					<div
						className="bg-white p-6 rounded-lg shadow-lg"
						onClick={(e) => e.stopPropagation()} // Prevent click from closing modal when clicking inside
					>
						<button
							className="absolute top-2 right-2 text-gray-600"
							onClick={() => closeModal("copy")}
						>
							&times; {/* X icon */}
						</button>
						<p>Your password '{password}' has been copied!</p>
						<button
							onClick={() => closeModal("copy")}
							className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
						>
							okay
						</button>
					</div>
				</div>
			)}

			{/* Save Password Button */}
			<button
				onClick={() => setShowSaveModal(true)}
				className="mt-4 bg-blue-500 text-white py-2 px-4 rounded w-full"
			>
				Save Password
			</button>

			{/* Modal for Save Password */}
			{showSaveModal && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
					onClick={() => closeModal("save")} // Close modal on backdrop click
				>
					<div
						className="bg-white p-6 rounded-lg shadow-lg w-80"
						onClick={(e) => e.stopPropagation()} // Prevent click from closing modal when clicking inside
					>
						<button
							className="absolute top-2 right-2 text-gray-600"
							onClick={() => closeModal("save")}
						>
							&times; {/* X icon */}
						</button>
						<h3 className="font-bold text-lg mb-2">Save Your Password</h3>
						<input
							type="text"
							value={nickname}
							onChange={(e) => setNickname(e.target.value)}
							placeholder="Nickname (e.g. Personal Gmail)"
							className="border border-gray-300 p-2 w-full rounded mb-2"
						/>
						<input
							type="text"
							value={website}
							onChange={(e) => setWebsite(e.target.value)}
							placeholder="Website (e.g. gmail.com)"
							className="border border-gray-300 p-2 w-full rounded mb-2"
						/>
						<button
							onClick={savePassword}
							className="bg-blue-500 text-white py-2 px-4 rounded w-full"
						>
							Save Password
						</button>
						<button
							onClick={() => closeModal("save")}
							className="mt-2 text-gray-500 underline"
						>
							Close
						</button>
					</div>
				</div>
			)}

			{/* Optional: Display saved passwords */}
			{savedPasswords.length > 0 && (
				<div className="mt-6">
					<h3 className="font-bold text-lg mb-2">Saved Passwords</h3>
					<ul className="list-disc pl-4">
						{/* {savedPasswords.map((entry, index) => (
							<li key={index}>
								{entry.nickname} - {entry.website}
							</li>
						)
            )} */}
					</ul>
				</div>
			)}
		</div>
	);
};

export default PasswordStrengthChecker;

// 
// 
// 
// 
// 
// UPDATES
// 
// "use client";

// import { useState, useEffect } from "react";
// import {
// 	Eye,
// 	EyeOff,
// 	Copy,
// 	Save,
// 	X,
// 	AlertTriangle,
// 	CheckCircle,
// 	RefreshCw,
// 	Trash2,
// 	Download,
// 	Upload,
// } from "lucide-react";

// const PasswordStrengthChecker = () => {
// 	const [password, setPassword] = useState("");
// 	const [strengthMessage, setStrengthMessage] = useState(
// 		"Password field is empty!"
// 	);
// 	const [progressWidth, setProgressWidth] = useState(0);
// 	const [progressColor, setProgressColor] = useState("bg-transparent");
// 	const [showPassword, setShowPassword] = useState(false);
// 	const [nickname, setNickname] = useState("");
// 	const [website, setWebsite] = useState("");
// 	const [savedPasswords, setSavedPasswords] = useState([]);
// 	const [showSaveModal, setShowSaveModal] = useState(false);
// 	const [showCopyModal, setShowCopyModal] = useState(false);
// 	const [passwordSuggestion, setPasswordSuggestion] = useState("");
// 	const [showPasswordHistory, setShowPasswordHistory] = useState(false);
// 	const [passwordHistory, setPasswordHistory] = useState([]);

// 	useEffect(() => {
// 		// Load saved passwords from local storage
// 		const storedPasswords = localStorage.getItem("savedPasswords");
// 		if (storedPasswords) {
// 			setSavedPasswords(JSON.parse(storedPasswords));
// 		}
// 	}, []);

// 	const evaluatePasswordStrength = (password: string) => {
// 		if (password.trim() === "") {
// 			return "Password field is empty!";
// 		}
// 		if (password.length < 8) {
// 			return "Password is too short!";
// 		}

// 		const hasUpperCase = /[A-Z]/.test(password);
// 		const hasLowerCase = /[a-z]/.test(password);
// 		const hasNumbers = /\d/.test(password);
// 		const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

// 		const checks = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar];
// 		const strengthLevel = checks.filter(Boolean).length;

// 		switch (strengthLevel) {
// 			case 0:
// 			case 1:
// 				return "Very Weak";
// 			case 2:
// 				return "Weak";
// 			case 3:
// 				return "Moderate";
// 			case 4:
// 				return "Strong";
// 			default:
// 				return "Invalid";
// 		}
// 	};

// 	const getProgressBarDetails = (strength: string) => {
// 		switch (strength) {
// 			case "Very Weak":
// 				return { width: 25, color: "red-600" };
// 			case "Weak":
// 				return { width: 50, color: "orange-600" };
// 			case "Moderate":
// 				return { width: 75, color: "yellow-600" };
// 			case "Strong":
// 				return { width: 100, color: "green-600" };
// 			default:
// 				return { width: 0, color: "transparent" };
// 		}
// 	};

// 	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const newPassword = e.target.value;
// 		setPassword(newPassword);

// 		const strength = evaluatePasswordStrength(newPassword);
// 		setStrengthMessage(strength);

// 		const { width, color } = getProgressBarDetails(strength);
// 		setProgressWidth(width);
// 		setProgressColor(color);

// 		// Generate password suggestion
// 		if (strength !== "Strong") {
// 			setPasswordSuggestion(generatePasswordSuggestion(newPassword));
// 		} else {
// 			setPasswordSuggestion("");
// 		}

// 		// Add to password history
// 		// setPasswordHistory(prevHistory => [...prevHistory, newPassword].slice(-5))
// 	};

// 	const generatePasswordSuggestion = (currentPassword: string) => {
// 		let suggestion = currentPassword;

// 		if (!/[A-Z]/.test(suggestion)) {
// 			suggestion += "A";
// 		}
// 		if (!/[a-z]/.test(suggestion)) {
// 			suggestion += "a";
// 		}
// 		if (!/\d/.test(suggestion)) {
// 			suggestion += "1";
// 		}
// 		if (!/[!@#$%^&*(),.?":{}|<>]/.test(suggestion)) {
// 			suggestion += "!";
// 		}

// 		while (suggestion.length < 12) {
// 			suggestion += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
// 		}

// 		return suggestion;
// 	};

// 	const copyPasswordToClipboard = () => {
// 		navigator.clipboard.writeText(password);
// 		setShowCopyModal(true);
// 	};

// 	const savePassword = () => {
// 		if (password && nickname && website) {
// 			const newSavedPasswords = [
// 				...savedPasswords,
// 				{ password, nickname, website },
// 			];
// 			// setSavedPasswords(newSavedPasswords)
// 			localStorage.setItem("savedPasswords", JSON.stringify(newSavedPasswords));
// 			alert("Password saved successfully!");
// 			setNickname("");
// 			setWebsite("");
// 			setShowSaveModal(false);
// 		} else {
// 			alert("Please fill in all fields!");
// 		}
// 	};

// 	const closeModal = (modalType: "save" | "copy") => {
// 		if (modalType === "save") {
// 			setShowSaveModal(false);
// 		} else {
// 			setShowCopyModal(false);
// 		}
// 	};

// 	const generateRandomPassword = () => {
// 		const chars =
// 			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(),.?":{}|<>';
// 		let newPassword = "";
// 		for (let i = 0; i < 16; i++) {
// 			newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
// 		}
// 		setPassword(newPassword);
// 		handlePasswordChange({
// 			target: { value: newPassword },
// 		} as React.ChangeEvent<HTMLInputElement>);
// 	};

// 	const exportPasswords = () => {
// 		const dataStr =
// 			"data:text/json;charset=utf-8," +
// 			encodeURIComponent(JSON.stringify(savedPasswords));
// 		const downloadAnchorNode = document.createElement("a");
// 		downloadAnchorNode.setAttribute("href", dataStr);
// 		downloadAnchorNode.setAttribute("download", "saved_passwords.json");
// 		document.body.appendChild(downloadAnchorNode);
// 		downloadAnchorNode.click();
// 		downloadAnchorNode.remove();
// 	};

// 	const importPasswords = (event: React.ChangeEvent<HTMLInputElement>) => {
// 		const file = event.target.files?.[0];
// 		if (file) {
// 			const reader = new FileReader();
// 			reader.onload = (e) => {
// 				try {
// 					const importedPasswords = JSON.parse(e.target?.result as string);
// 					setSavedPasswords(importedPasswords);
// 					localStorage.setItem(
// 						"savedPasswords",
// 						JSON.stringify(importedPasswords)
// 					);
// 					alert("Passwords imported successfully!");
// 				} catch (error) {
// 					alert("Error importing passwords. Please check the file format.");
// 				}
// 			};
// 			reader.readAsText(file);
// 		}
// 	};

// 	return (
// 		<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto mt-8">
// 			<h1 className="text-2xl font-bold mb-6">Password Strength Checker</h1>
// 			<div className="relative mb-4">
// 				<input
// 					type={showPassword ? "text" : "password"}
// 					value={password}
// 					onChange={handlePasswordChange}
// 					placeholder="Enter your password"
// 					className="border border-gray-300 p-2 w-full rounded pr-10"
// 				/>
// 				<button
// 					onClick={() => setShowPassword(!showPassword)}
// 					className="absolute right-2 top-2 text-blue-500"
// 				>
// 					{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
// 				</button>
// 			</div>

// 			<p
// 				className={`mt-1 mb-4 py-1 text-bold text-lg text-${progressColor} border border-${progressColor} text-center rounded-md`}
// 			>
// 				{strengthMessage}
// 			</p>

// 			<div className="w-full bg-gray-300 rounded h-2 mt-2">
// 				<div
// 					className={`h-full rounded transition-all duration-300 bg-${progressColor}`}
// 					style={{ width: `${progressWidth}%` }}
// 				></div>
// 			</div>

// 			{passwordSuggestion && (
// 				<div className="mt-4 p-2 bg-blue-100 rounded">
// 					<p className="text-sm">Suggestion: {passwordSuggestion}</p>
// 					<button
// 						onClick={() => setPassword(passwordSuggestion)}
// 						className="mt-2 text-blue-500 underline text-sm"
// 					>
// 						Use this suggestion
// 					</button>
// 				</div>
// 			)}

// 			<div className="flex space-x-2 mt-4">
// 				<button
// 					onClick={copyPasswordToClipboard}
// 					className="flex-1 bg-green-500 text-white py-2 px-4 rounded disabled:bg-opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
// 					disabled={!password}
// 				>
// 					<Copy size={16} className="mr-2" />
// 					Copy
// 				</button>
// 				{/* <button
// 					onClick={() => setShowSaveModal(true)}
// 					className="flex-1 bg-blue-500 text-white py-2 px-4 rounded flex items-center justify-center"
// 				>
// 					<Save size={16} className="mr-2" />
// 					Save
// 				</button> */}
// 				<button
// 					onClick={generateRandomPassword}
// 					className="flex-1 bg-purple-500 text-white py-2 px-4 rounded flex items-center justify-center"
// 				>
// 					<RefreshCw size={16} className="mr-2" />
// 					Generate
// 				</button>
// 			</div>

// 			{/* <div className="mt-4 flex justify-between">
// 				<button
// 					onClick={() => setShowPasswordHistory(!showPasswordHistory)}
// 					className="text-blue-500 underline"
// 				>
// 					{showPasswordHistory ? "Hide" : "Show"} Password History
// 				</button>
// 				<div className="mt-8 space-y-6">
// 					<div className="flex justify-between items-center">
// 						<h3 className="text-lg font-semibold text-gray-700">
// 							Password Management
// 						</h3>
// 						<div className="flex space-x-4">
// 							<button
// 								onClick={exportPasswords}
// 								className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-full hover:bg-green-600 transition-colors duration-300"
// 							>
// 								<Download size={16} className="mr-2" />
// 								Export
// 							</button>
// 							<label className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors duration-300 cursor-pointer">
// 								<Upload size={16} className="mr-2" />
// 								Import
// 								<input
// 									type="file"
// 									className="hidden"
// 									onChange={importPasswords}
// 									accept=".json"
// 								/>
// 							</label>
// 						</div>
// 					</div>

// 					{showPasswordHistory && (
// 						<div className="bg-white rounded-2xl shadow-lg overflow-hidden">
// 							<div className="px-6 py-4 bg-gray-50">
// 								<h3 className="text-lg font-semibold text-gray-700">
// 									Recent Passwords
// 								</h3>
// 							</div>
// 							<ul className="divide-y divide-gray-200">
// 								{passwordHistory.map((pass, index) => (
// 									<li
// 										key={index}
// 										className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200"
// 									>
// 										<div className="flex items-center">
// 											<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
// 												<span className="text-blue-500 font-semibold">
// 													{index + 1}
// 												</span>
// 											</div>
// 											<span className="text-gray-700 font-medium">{pass}</span>
// 										</div>
// 									</li>
// 								))}
// 							</ul>
// 						</div>
// 					)}

// 					{showCopyModal && (
// 						<div
// 							className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
// 							onClick={() => closeModal("copy")}
// 						>
// 							<div
// 								className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 scale-100 opacity-100"
// 								onClick={(e) => e.stopPropagation()}
// 							>
// 								<div className="text-center">
// 									<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
// 										<CheckCircle size={32} className="text-green-500" />
// 									</div>
// 									<h3 className="text-2xl font-semibold text-gray-700 mb-2">
// 										Password Copied
// 									</h3>
// 									<p className="text-gray-500 mb-6">
// 										Your password has been copied to the clipboard.
// 									</p>
// 									<button
// 										onClick={() => closeModal("copy")}
// 										className="px-6 py-3 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 transition-colors duration-300"
// 									>
// 										Got it
// 									</button>
// 								</div>
// 							</div>
// 						</div>
// 					)}
// 				</div>
// 			</div> */}

// 			{showSaveModal && (
// 				<div
// 					className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
// 					onClick={() => closeModal("save")}
// 				>
// 					<div
// 						className="bg-white p-6 rounded-lg shadow-lg w-80"
// 						onClick={(e) => e.stopPropagation()}
// 					>
// 						<button
// 							className="absolute top-2 right-2 text-gray-600"
// 							onClick={() => closeModal("save")}
// 						>
// 							<X size={20} />
// 						</button>
// 						<h3 className="font-bold text-lg mb-2">Save Your Password</h3>
// 						<input
// 							type="text"
// 							value={nickname}
// 							onChange={(e) => setNickname(e.target.value)}
// 							placeholder="Nickname (e.g. Personal Gmail)"
// 							className="border border-gray-300 p-2 w-full rounded mb-2"
// 						/>
// 						<input
// 							type="text"
// 							value={website}
// 							onChange={(e) => setWebsite(e.target.value)}
// 							placeholder="Website (e.g. gmail.com)"
// 							className="border border-gray-300 p-2 w-full rounded mb-2"
// 						/>
// 						<button
// 							onClick={savePassword}
// 							className="bg-blue-500 text-white py-2 px-4 rounded w-full"
// 						>
// 							Save Password
// 						</button>
// 						<button
// 							onClick={() => closeModal("save")}
// 							className="mt-2 text-gray-500 underline"
// 						>
// 							Close
// 						</button>
// 					</div>
// 				</div>
// 			)}

// 			{savedPasswords.length > 0 && (
// 				<div className="mt-6">
// 					<h3 className="font-bold text-lg mb-2">Saved Passwords</h3>
// 					<ul className="list-disc pl-4">
// 						{savedPasswords.map((entry, index) => (
// 							<li key={index} className="mb-2">
// 								{/* <span className="font-semibold">{entry.nickname}</span> - {entry.website} */}
// 								<button
// 									onClick={() => {
// 										const newSavedPasswords = savedPasswords.filter(
// 											(_, i) => i !== index
// 										);
// 										setSavedPasswords(newSavedPasswords);
// 										localStorage.setItem(
// 											"savedPasswords",
// 											JSON.stringify(newSavedPasswords)
// 										);
// 									}}
// 									className="ml-2 text-red-500"
// 								>
// 									<Trash2 size={16} />
// 								</button>
// 							</li>
// 						))}
// 					</ul>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default PasswordStrengthChecker;
