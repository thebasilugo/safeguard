import React from "react";
import { Shield, Lock, Key, ArrowRight } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import ClientComponent from "../client/page";
// import WaitlistForm from "@/components/WaitlistForm";

export default function ServerComponent() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
			<main className="container mx-auto p-4">
				<Header />
				<section className="text-center mb-16">
					<h2 className="text-5xl font-bold mb-6 leading-tight">
						Secure Your Digital Life
					</h2>
					<p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
						Generate, store, and manage your passwords with military-grade
						encryption. Your ultimate solution for unbreakable online security.
					</p>
					{/* <Link
						href="/auth/login"
						className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform inline-flex items-center"
					>
						Get Started with Google <ArrowRight className="ml-2 h-5 w-5" />
					</Link> */}
				</section>

				<section id="features" className="mb-16">
					<div className="grid md:grid-cols-3 gap-8">
						<FeatureCard
							icon={<Shield className="text-green-500 w-12 h-12 mb-4" />}
							title="Unbreakable Security"
							description="Your data is protected with state-of-the-art encryption algorithms."
						/>
						<FeatureCard
							icon={<Lock className="text-green-500 w-12 h-12 mb-4" />}
							title="Password Generator"
							description="Create strong, unique passwords with our advanced generator tool."
						/>
						<FeatureCard
							icon={<Key className="text-green-500 w-12 h-12 mb-4" />}
							title="Easy Management"
							description="Organize and access your passwords effortlessly across all your devices."
						/>
					</div>
				</section>

				{/* <section className="text-center mb-16">
					<h3 className="text-2xl font-semibold text-green-500 mb-4">
						Stay Informed, Stay Safe
					</h3>
					<p className="text-lg text-gray-700 mb-6">
						Get the latest cybersecurity tips and visualize brute force attacks
						to understand the importance of strong passwords.
					</p>
					<div className="flex justify-center space-x-4">
						<button>View Cyber Tips</button>
						<button>Brute Force Visualizer</button>
					</div>
				</section> */}

				{/* <div className="flex justify-center items-center"> */}
				<ClientComponent />
				{/* </div> */}
			</main>
			{/* <section className="pb-8 mx-auto text-center">
				<h1 className="text-2xl font-bold mb-2">Join Our Waitlist</h1>
				<WaitlistForm />
			</section> */}
		</div>
	);
}

function FeatureCard({ icon, title, description }: any) {
	return (
		<div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
			<div className="flex items-center space-x-2 mb-4">
				{icon}
				<h3 className="text-xl font-semibold text-white">{title}</h3>
			</div>
			<p className="text-gray-400">{description}</p>
		</div>
	);
}
