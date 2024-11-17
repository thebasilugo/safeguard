"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Shield, Lock, Key, X, Menu } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";

const Header = () => {
	const [showMiniApps, setShowMiniApps] = useState(false);
	const [showMobileMenu, setShowMobileMenu] = useState(false);

	const miniApps = [
		{ name: "Password Generator", icon: <Key className="w-6 h-6" /> },
		{ name: "Password Strength Checker", icon: <Shield className="w-6 h-6" /> },
		{ name: "Two-Factor Authentication", icon: <Lock className="w-6 h-6" /> },
	];

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				setShowMobileMenu(false);
			}
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const NavItems = () => (
		<>
			<li>
				<a href="/#features" className="hover:text-green-500 transition-colors">
					Features
				</a>
			</li>
			<li>
				<a href="#demo" className="hover:text-green-500 transition-colors">
					Demo
				</a>
			</li>
			{/* <li>
				<a href="#pricing" className="hover:text-green-500 transition-colors">
					Pricing
				</a>
			</li> */}
			{/* <li>
				<button
					onClick={() => setShowMiniApps(true)}
					className="hover:text-green-500 transition-colors"
				>
					Mini Apps
				</button>
			</li> */}
		</>
	);

	return (
		<header className="container mx-auto py-6 px-4 top-0 right-0 left-0 mb-4">
			<nav className="flex justify-between items-center">
				<h1 className="text-2xl font-bold text-green-500">
					<a href="/" className="hover:text-green-500 transition-colors">
						Safeguard
					</a>
				</h1>
				<ul className="hidden md:flex space-x-4 items-center">
					<NavItems />
					{/* <li>
						<Link
							href="/auth/login"
							className="hover:text-green-500 transition-colors"
						>
							Login
						</Link>
					</li> */}
					{/* <li>
						<DarkModeToggle />
					</li> */}
				</ul>
				<button
					onClick={() => setShowMobileMenu(!showMobileMenu)}
					className="md:hidden text-white"
				>
					<Menu className="h-6 w-6" />
				</button>
			</nav>

			{showMobileMenu && (
				<div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50">
					<div className="fixed right-0 top-0 bottom-0 w-64 bg-gray-800 p-4">
						<button
							onClick={() => setShowMobileMenu(false)}
							className="absolute top-4 right-4 text-white"
						>
							<X className="h-6 w-6" />
						</button>
						<ul className="space-y-4 mt-12">
							<NavItems />
							<li>
								<Link
									href="/auth/login"
									className="hover:text-green-500 transition-colors"
								>
									Login
								</Link>
							</li>
						</ul>
					</div>
				</div>
			)}

			{showMiniApps && (
				<div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-gray-800 p-6 rounded-lg">
						<h2 className="text-xl font-bold mb-4 text-white">Mini Apps</h2>
						<div className="grid grid-cols-2 gap-4">
							{miniApps.map((app, index) => (
								<button
									key={index}
									className="flex flex-col items-center justify-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-white"
									onClick={() => setShowMiniApps(false)}
								>
									{/* <a href={app.url}> */}
									{app.icon}
									<span className="mt-2 text-sm">{app.name}</span>
									{/* </a> */}
								</button>
							))}
						</div>
						<button
							onClick={() => setShowMiniApps(false)}
							className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
						>
							Close
						</button>
					</div>
				</div>
			)}
		</header>
	);
};

export default Header;
