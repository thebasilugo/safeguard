import Link from "next/link";
import React from "react";

const Footer = () => {
	// Get the current year dynamically
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gray-800 py-4 fixed bottom-0 right-0 left-0 mx-auto">
			<div className="container mx-auto px-4 text-center text-gray-400">
				&copy; {currentYear}{" "}
				<Link
					href="https://www.linkedin.com/in/thebasilugo"
					target="_blank"
					className="hover:underline hover:text-white"
				>
					thebasilugo
				</Link>
				{/* Safeguard. All rights reserved. */}
			</div>
		</footer>
	);
};

export default Footer;
