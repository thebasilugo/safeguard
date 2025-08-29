// "use client";
// import { useState } from "react";

// export default function Home() {
// 	const [password, setPassword] = useState("");
// 	const [guessesPerSecond, setGuessesPerSecond] = useState(1000);
// 	const [combinations, setCombinations] = useState(0);
// 	const [timeToCrack, setTimeToCrack] = useState("N/A");

// 	// Handle password input and update the estimated time and strength bar
// 	const handlePasswordChange = (e: any) => {
// 		const newPassword = e.target.value;
// 		setPassword(newPassword);
// 		const newCombinations = calculateCombinations(newPassword);
// 		setCombinations(newCombinations);
// 		const timeInSeconds = newCombinations / guessesPerSecond;
// 		setTimeToCrack(formatTime(timeInSeconds));
// 	};

// 	// Calculate the number of possible combinations for the password
// 	const calculateCombinations = (password: any) => {
// 		let combinations = 1;
// 		const hasLower = /[a-z]/.test(password);
// 		const hasUpper = /[A-Z]/.test(password);
// 		const hasNumbers = /\d/.test(password);
// 		const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);

// 		let possibleChars = 0;
// 		if (hasLower) possibleChars += 26;
// 		if (hasUpper) possibleChars += 26;
// 		if (hasNumbers) possibleChars += 10;
// 		if (hasSymbols) possibleChars += 32;

// 		combinations = Math.pow(possibleChars, password.length);
// 		return combinations;
// 	};

// 	// Convert seconds into human-readable format
// 	const formatTime = (seconds: any) => {
// 		if (seconds < 60) return `${Math.round(seconds)} seconds`;
// 		if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
// 		if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
// 		if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
// 		return `${Math.round(seconds / 31536000)} years`;
// 	};

// 	// Update the attack speed
// 	const handleAttackSpeedChange = (e: any) => {
// 		const newSpeed = parseInt(e.target.value);
// 		setGuessesPerSecond(newSpeed);
// 		const timeInSeconds = combinations / newSpeed;
// 		setTimeToCrack(formatTime(timeInSeconds));
// 	};

// 	return (
// 		<div className="bg-gray-100 font-sans p-6 min-h-screen flex flex-col items-center justify-center">
// 			<div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-md">
// 				<h1 className="text-2xl font-bold mb-4">
// 					Password Brute Force Visualization
// 				</h1>
// 				<p className="mb-6 text-gray-700">
// 					Visualize how easy or difficult your password is to crack using
// 					brute-force methods.
// 				</p>

// 				{/* Password Input */}
// 				<input
// 					type="password"
// 					placeholder="Enter your password"
// 					className="border border-gray-300 p-2 w-full rounded mb-4"
// 					value={password}
// 					onChange={handlePasswordChange}
// 				/>

// 				{/* Attack Type Selector */}
// 				<label className="block text-left text-gray-700 mb-2">
// 					Attack Speed:
// 				</label>
// 				<select
// 					value={guessesPerSecond}
// 					onChange={handleAttackSpeedChange}
// 					className="border border-gray-300 p-2 w-full rounded mb-4"
// 				>
// 					<option value="1000">1,000 guesses/second (slow brute force)</option>
// 					<option value="1000000">1,000,000 guesses/second (average)</option>
// 					<option value="1000000000">
// 						1,000,000,000 guesses/second (fast brute force)
// 					</option>
// 				</select>

// 				{/* Estimated Time */}
// 				<p className="text-lg font-semibold mt-4 mb-4">
// 					Estimated time to crack:{" "}
// 					<span className="text-red-600">{timeToCrack}</span>
// 				</p>

// 				{/* Progress Bar */}
// 				<div className="w-full bg-gray-300 rounded h-2 mb-4">
// 					<div
// 						className={`h-full rounded strength-bar ${
// 							password.length < 6
// 								? "bg-red-600"
// 								: password.length < 10
// 								? "bg-yellow-600"
// 								: "bg-green-600"
// 						}`}
// 						style={{ width: `${(password.length / 16) * 100}%` }}
// 					></div>
// 				</div>

// 				{/* Suggestions */}
// 				<p className="text-sm text-gray-600">
// 					Use at least 12-16 characters with a mix of uppercase, lowercase,
// 					numbers, and symbols.
// 				</p>
// 			</div>
// 		</div>
// 	);
// }

"use client";
"use client";

import { useState, useEffect } from "react";

export default function PasswordStrengthVisualizer() {
	const [password, setPassword] = useState("");
	const [strength, setStrength] = useState(0);
	const [crackTimes, setCrackTimes] = useState({
		bruteForce: "",
		dictionaryAttack: "",
		rainbowTable: "",
	});
	const [suggestions, setSuggestions] = useState("");

	useEffect(() => {
		calculatePasswordStrength(password);
	}, [password]);

	const calculatePasswordStrength = (pass: any) => {
		let score = 0;
		let suggestionText =
			"Use at least 12-16 characters with a mix of uppercase, lowercase, numbers, and symbols.";
		if (pass.length > 6) score += 1;
		if (pass.length > 10) score += 1;
		if (/[A-Z]/.test(pass)) score += 1;
		if (/[a-z]/.test(pass)) score += 1;
		if (/[0-9]/.test(pass)) score += 1;
		if (/[^A-Za-z0-9]/.test(pass)) score += 1;

		setStrength(score);

		if (pass.length < 6) {
			suggestionText =
				"Password is too short. Try using at least 12 characters.";
		} else if (
			!/^[A-Z]*$/.test(pass) ||
			!/^[a-z]*$/.test(pass) ||
			!/^[0-9]*$/.test(pass) ||
			!/^[^A-Za-z0-9]*$/.test(pass)
		) {
			suggestionText =
				"For stronger security, mix uppercase, lowercase, numbers, and symbols.";
		} else {
			suggestionText = "Strong password! You have a good mix of characters.";
		}

		setSuggestions(suggestionText);

		const possibleChars = 94; // printable ASCII characters
		const combinations = Math.pow(possibleChars, pass.length);
		const attemptsPerSecond = {
			bruteForce: 1000000, // 1 million attempts per second
			dictionaryAttack: 1000000000, // 1 billion attempts per second
			rainbowTable: 1000000000000, // 1 trillion lookups per second
		};

		setCrackTimes({
			bruteForce: formatTime(combinations / attemptsPerSecond.bruteForce),
			dictionaryAttack: formatTime(
				combinations / attemptsPerSecond.dictionaryAttack
			),
			rainbowTable: formatTime(combinations / attemptsPerSecond.rainbowTable),
		});
	};

	const formatTime = (seconds: any) => {
		if (seconds < 60) return `${seconds.toFixed(2)} seconds`;
		if (seconds < 3600) return `${(seconds / 60).toFixed(2)} minutes`;
		if (seconds < 86400) return `${(seconds / 3600).toFixed(2)} hours`;
		if (seconds < 31536000) return `${(seconds / 86400).toFixed(2)} days`;
		return `${(seconds / 31536000).toFixed(2)} years`;
	};

	const getStrengthColor = (strength: any) => {
		if (strength <= 2) return "bg-red-500";
		if (strength <= 4) return "bg-yellow-500";
		return "bg-green-500";
	};

	return (
		<div className="w-full max-w-lg mx-auto bg-white p-6 rounded shadow-lg mt-[5rem]">
			<h2 className="text-2xl font-bold mb-2">Password Strength Visualizer</h2>
			<p className="mb-4 text-gray-600">
				Check how secure your password is against various attack methods
			</p>
			<div className="mb-4">
				<label htmlFor="password" className="block text-gray-700 mb-1">
					Enter a password
				</label>
				<input
					id="password"
					type="password"
					placeholder="Enter your password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="border border-gray-300 rounded p-2 w-full"
				/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 mb-1">Password Strength</label>
				<div className="relative">
					<div className="bg-gray-300 h-2 rounded">
						<div
							className={`h-full rounded ${getStrengthColor(strength)}`}
							style={{ width: `${(strength / 6) * 100}%` }}
						/>
					</div>
				</div>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 mb-1">
					Estimated time to crack
				</label>
				<ul className="list-disc pl-5 space-y-1">
					<li>Brute Force: {crackTimes.bruteForce}</li>
					<li>Dictionary Attack: {crackTimes.dictionaryAttack}</li>
					<li>Rainbow Table: {crackTimes.rainbowTable}</li>
				</ul>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 mb-1">Suggestions</label>
				<p className="text-gray-600">{suggestions}</p>
			</div>
		</div>
	);
}
