import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: "class", // Enables dark mode based on a class (e.g., 'dark')
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)", // Light mode background color
				foreground: "var(--foreground)", // Light mode foreground color
				darkBackground: "var(--dark-background)", // Dark mode background color
				darkForeground: "var(--dark-foreground)", // Dark mode foreground color
			},
		},
	},
	plugins: [],
};

export default config;
