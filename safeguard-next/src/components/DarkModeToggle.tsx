"use client";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const DarkModeToggle = () => {
	const [theme, setTheme] = useState<string | null>(null);

	// Check system preference and set initial theme
	useEffect(() => {
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			setTheme("dark");
			document.documentElement.classList.add("dark");
		} else {
			setTheme("light");
		}
	}, []);

	const toggleTheme = () => {
		if (theme === "light") {
			setTheme("dark");
			document.documentElement.classList.add("dark");
		} else {
			setTheme("light");
			document.documentElement.classList.remove("dark");
		}
	};

	return (
		<button
			onClick={toggleTheme}
			className="p-2 ml-4 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition duration-300 ease-in-out"
			aria-label="Toggle Dark Mode"
		>
			{theme === "dark" ? (
				<Sun className="w-4 h-4" />
			) : (
				<Moon className="w-4 h-4" />
			)}
		</button>
	);
};

export default DarkModeToggle;
