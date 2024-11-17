"use client";
import { useState } from "react";
import { auth } from "../../../utils/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import HomeButton from "@/components/BackButton";

const SignupPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();
		// try {
		// 	// Create user with email and password
		// 	const userCredential = await createUserWithEmailAndPassword(
		// 		auth,
		// 		email,
		// 		password
		// 	);

		// 	// Update user profile with display name
		// 	await updateProfile(userCredential.user, {
		// 		displayName: name,
		// 	});

		// 	// Redirect to dashboard or another page
		// 	router.push("/dashboard");
		// } catch (err: any) {
		// 	setError(err.message);
		// }
	};

	return (
		<div className="min-h-screen flex flex-col justify-center items-center">
			<div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
				<HomeButton />
				<h2 className="text-4xl font-bold text-center text-white mb-6">
					Sign Up
				</h2>

				{/* Sign Up Form */}
				<form onSubmit={handleSignup} className="space-y-6">
					{/* Name Input */}
					<input
						type="text"
						placeholder="Full Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="w-full p-3 bg-gray-700 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
					/>

					{/* Email Input */}
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full p-3 bg-gray-700 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
					/>

					{/* Password Input */}
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full p-3 bg-gray-700 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
					/>

					{/* Error Message */}
					{error && <p className="text-red-500 text-center">{error}</p>}

					{/* Sign Up Button */}
					<Button type="submit">Sign Up</Button>
				</form>

				{/* Already have an account */}
				<p className="text-center text-gray-400 mt-4">
					Already have an account?{" "}
					<a href="./login" className="text-green-500 hover:underline">
						Login here
					</a>
				</p>
			</div>
		</div>
	);
};

export default SignupPage;
