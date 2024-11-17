"use client";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
// import { auth } from "../../../utils/firebase";
import Button from "@/components/Button";
const ForgotPasswordPage = () => {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	const handlePasswordReset = async (e: React.FormEvent) => {
		e.preventDefault();
		// try {
		// 	await sendPasswordResetEmail(auth, email);
		// 	setMessage("Password reset link sent! Check your email.");
		// 	setError(""); // Clear error if reset is successful
		// } catch (err: any) {
		// 	setError(err.message);
		// 	setMessage(""); // Clear message if an error occurs
		// }
	};

	return (
		<div className="min-h-screen flex flex-col justify-center items-center">
			<div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
				<h2 className="text-4xl font-bold text-center text-white mb-6">
					Forgot Password
				</h2>

				{/* Password Reset Form */}
				<form onSubmit={handlePasswordReset} className="space-y-6">
					{/* Email Input */}
					<input
						type="email"
						placeholder="Enter your email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full p-3 bg-gray-700 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
					/>

					{/* Error or Success Message */}
					{error && <p className="text-red-500 text-center">{error}</p>}
					{message && <p className="text-green-500 text-center">{message}</p>}

					{/* Submit Button */}
					<Button type="submit"> Send Password Reset Email</Button>
				</form>

				{/* Back to Login */}
				<p className="text-center text-gray-400 mt-4">
					Remembered your password?{" "}
					<a href="./login" className="text-green-500 hover:underline">
						Login here
					</a>
				</p>
			</div>
		</div>
	);
};

export default ForgotPasswordPage;
