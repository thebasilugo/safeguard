// perfect

"use client";

import { useState, useEffect } from "react";
import { X, RefreshCw, Copy, Eye, EyeOff } from "lucide-react";

export default function EnhancedPasswordGenerator({
	onClose,
}: {
	onClose: () => void;
}) {
	const [password, setPassword] = useState("");
	const [length, setLength] = useState(12);
	const [useSpecialChars, setUseSpecialChars] = useState(true);
	const [useNumbers, setUseNumbers] = useState(true);
	const [useCapitals, setUseCapitals] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [passwordStrength, setPasswordStrength] = useState(0);

	useEffect(() => {
		generatePassword();
	}, [length, useSpecialChars, useNumbers, useCapitals]);

	const generatePassword = () => {
		const charset = "abcdefghijklmnopqrstuvwxyz";
		const specialChars = "!@#$%^&*()_+{}[]|:;<>,.?";
		const numbers = "0123456789";
		const capitals = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

		let chars = charset;
		if (useSpecialChars) chars += specialChars;
		if (useNumbers) chars += numbers;
		if (useCapitals) chars += capitals;

		let newPassword = "";
		for (let i = 0; i < length; i++) {
			newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
		}

		setPassword(newPassword);
		checkPasswordStrength(newPassword);
	};

	const checkPasswordStrength = (pwd: string) => {
		let strength = 0;
		if (pwd.length >= 12) strength += 25;
		if (pwd.match(/[A-Z]/)) strength += 25;
		if (pwd.match(/[0-9]/)) strength += 25;
		if (pwd.match(/[^A-Za-z0-9]/)) strength += 25;
		setPasswordStrength(strength);
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText(password);
		setShowModal(true);
	};

	const getStrengthColor = (strength: number) => {
		if (strength < 50) return "bg-red-500";
		if (strength < 75) return "bg-yellow-500";
		return "bg-green-500";
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-bold text-green-500">
						Password Generator
					</h2>
					<button onClick={onClose} className="text-white hover:text-gray-50">
						<X size={24} />
					</button>
				</div>

				<div className="mb-6">
					<div className="relative w-full mb-2">
						<input
							type={showPassword ? "text" : "password"}
							value={password}
							readOnly
							className="w-full bg-gray-700 text-white p-2 rounded-md pr-16"
						/>
						<button
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-10 top-1/2 transform -translate-y-1/2 bg-transparent text-white font-bold rounded-md flex items-center transition duration-300 ease-in-out"
						>
							{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
						</button>
						<button
							onClick={copyToClipboard}
							disabled={!password}
							className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
								!password ? "opacity-45 cursor-not-allowed" : "bg-transparent"
							} text-white font-bold rounded-md flex items-center transition duration-300 ease-in-out`}
						>
							<Copy size={16} />
						</button>
					</div>

					<div className="flex justify-between items-center mb-2">
						<span className="text-sm text-gray-300">Password Strength</span>
						<span className="text-sm text-gray-300">{passwordStrength}%</span>
					</div>
					<div className="w-full h-2 bg-gray-600 rounded">
						<div
							className={`h-full rounded ${getStrengthColor(passwordStrength)}`}
							style={{ width: `${passwordStrength}%` }}
						></div>
					</div>

					<div className="flex justify-between mt-4">
						<button
							onClick={generatePassword}
							className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
						>
							<RefreshCw size={20} className="mr-2" />
							Generate
						</button>
					</div>
				</div>

				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-300 mb-1">
							Password Length: {length}
						</label>
						<input
							type="range"
							value={length}
							onChange={(e) => setLength(Number(e.target.value))}
							min={8}
							max={32}
							step={1}
							className="w-full"
						/>
					</div>

					<div className="flex items-center">
						<input type="checkbox" checked={true} disabled className="mr-2" />
						<label className="text-sm text-gray-300">
							Include Small Letters (default)
						</label>
					</div>
					<div className="flex items-center">
						<input
							type="checkbox"
							checked={useCapitals}
							onChange={() => setUseCapitals(!useCapitals)}
							className="mr-2"
						/>
						<label className="text-sm text-gray-300">
							Include Capital Letters
						</label>
					</div>
					<div className="flex items-center">
						<input
							type="checkbox"
							checked={useNumbers}
							onChange={() => setUseNumbers(!useNumbers)}
							className="mr-2"
						/>
						<label className="text-sm text-gray-300">Include Numbers</label>
					</div>
					<div className="flex items-center">
						<input
							type="checkbox"
							checked={useSpecialChars}
							onChange={() => setUseSpecialChars(!useSpecialChars)}
							className="mr-2"
						/>
						<label className="text-sm text-gray-300">
							Include Special Characters
						</label>
					</div>
				</div>
			</div>

			{showModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
					<div className="bg-gray-800 p-6 rounded-lg shadow-lg">
						<h3 className="text-white mb-4">
							Your password has been copied to the clipboard.
						</h3>
						<div className="flex justify-between">
							<button
								onClick={() => setShowModal(false)}
								className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
