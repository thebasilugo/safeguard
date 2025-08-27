"use client";

import { useState } from "react";

const WaitlistForm: React.FC = () => {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			const response = await fetch("/api/waitlist", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});

			const data = await response.json();
			setMessage(data.message);
			if (response.ok) setEmail("");
		} catch (error) {
			setMessage("An error occurred. Please try again.");
		}
	};

	return (
		<div className="max-w-screen-sm mb-8 mx-auto text-black">
			<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Enter your email"
					className="border p-2 rounded"
					required
				/>
				<button
					type="submit"
					className="bg-blue-500 text-white p-2 rounded hover:bg-green-500 btn"
				>
					Join Waitlist
				</button>
			</form>
			{message && <p className="mt-4 text-gray-700">{message}</p>}
		</div>
	);
};

export default WaitlistForm;
