"use client";
import React, { useState } from "react";
import Link from "next/link";
import Button from "./Button";

const CybersecurityTips = () => {
	// Tips array
	const tips = [
		"Use strong and unique passwords for each of your accounts.",
		"Enable two-factor authentication wherever possible.",
		"Be cautious of phishing emails and suspicious links.",
		"Regularly update your software and applications.",
		"Use a reputable antivirus program to protect your devices.",
		"Secure your Wi-Fi network with a strong password.",
		"Be wary of public Wi-Fi; use a VPN if necessary.",
		"Limit the personal information you share online.",
		"Regularly back up your data to prevent loss.",
		"Educate yourself about the latest cybersecurity threats.",
	];

	const [randomTip, setRandomTip] = useState<string | null>(null);

	// Function to get a random tip
	const generateRandomTip = () => {
		const tip = tips[Math.floor(Math.random() * tips.length)];
		setRandomTip(tip);
	};

	// Get the current year
	const currentYear = new Date().getFullYear();

	return (
		<div className="flex flex-col justify-center items-center min-h-screen bg-background text-foreground">
			<div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-md mt-[6rem]">
				<h1 className="text-3xl font-bold mb-4 text-white">
					Cybersecurity Tips
				</h1>
				<p className="mb-8 text-lg text-gray-400">
					Stay safe online! Here are some quick tips:
				</p>
				{/* Reusable Button component */}
				<Button onClick={generateRandomTip}>Get a Random Tip</Button>
			</div>

			{/* Display the random tip */}
			<div className="mt-2 max-w-md mx-auto rounded flex-grow">
				<ul
					id="tips-list"
					className="list-none p-0 font-bold text-2xl text-white fade-in"
				>
					{randomTip && (
						<li className="text-black text-center rounded-lg py-20">
							{randomTip}
						</li>
					)}
				</ul>
			</div>
		</div>
	);
};

export default CybersecurityTips;
