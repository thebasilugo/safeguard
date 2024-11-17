"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../../utils/firebase";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import BackButton from "@/components/BackButton";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		// try {
		// 	await signInWithEmailAndPassword(auth, email, password);
		// 	router.push("/dashboard");
		// } catch (err: any) {
		// 	setError(err.message);
		// }
	};

	return (
		<div className="min-h-screen flex flex-col justify-center items-center">
			<div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
				<BackButton />
				<h2 className="text-4xl font-bold text-center text-white mb-6">
					Login
				</h2>

				{/* Login Form */}
				<form onSubmit={handleLogin} className="space-y-6">
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

					{/* Login Button */}
					<Button type="submit">Login</Button>
				</form>

				{/* Forgot Password Link */}
				<p className="text-center text-gray-400 mt-4">
					<a
						href="./forgot-password"
						className="text-green-500 hover:underline"
					>
						Forgot your password?
					</a>
				</p>

				{/* Don't have an account */}
				<p className="text-center text-gray-400 mt-4">
					Don't have an account?{" "}
					<a href="./signup" className="text-green-500 hover:underline">
						Sign up here
					</a>
				</p>
			</div>
		</div>
	);
};

export default LoginPage;
