// // src/app/dashboard/page.tsx
// "use client";
// import { useState, useEffect } from "react";
// import { db, auth } from "../../utils/firebase";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";

// const DashboardPage = () => {
// 	const [passwords, setPasswords] = useState<any[]>([]);

// 	useEffect(() => {
// 		const fetchPasswords = async () => {
// 			const user = auth.currentUser;
// 			if (user) {
// 				const q = query(
// 					collection(db, "passwords"),
// 					where("userId", "==", user.uid)
// 				);
// 				const querySnapshot = await getDocs(q);
// 				setPasswords(querySnapshot.docs.map((doc) => doc.data()));
// 			}
// 		};

// 		onAuthStateChanged(auth, fetchPasswords);
// 	}, []);

// 	return (
// 		<div className="min-h-screen p-8">
// 			<h1 className="text-3xl font-bold mb-4">Your Passwords</h1>
// 			<ul>
// 				{passwords.map((password, index) => (
// 					<li key={index}>
// 						{password.name} - {password.value}
// 					</li>
// 				))}
// 			</ul>
// 		</div>
// 	);
// };

// export default DashboardPage;

"use client";

import { useState } from "react";
import { Search, Plus, Copy, Eye, Edit, Trash2 } from "lucide-react";
import PasswordGenerator from "@/components/PasswordGenerator";

const passwords = [
	{ id: 1, name: "Gmail", username: "user@example.com", password: "********" },
	{
		id: 2,
		name: "Facebook",
		username: "user@example.com",
		password: "********",
	},
	{
		id: 3,
		name: "Twitter",
		username: "user@example.com",
		password: "********",
	},
	{
		id: 4,
		name: "LinkedIn",
		username: "user@example.com",
		password: "********",
	},
];

export default function Dashboard() {
	const [searchTerm, setSearchTerm] = useState("");
	const [showGenerator, setShowGenerator] = useState(false);

	const filteredPasswords = passwords.filter((password) =>
		password.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="min-h-screen bg-gray-900">
			<header className="bg-gray-800 py-4">
				<div className="container mx-auto px-4">
					<h1 className="text-2xl font-bold text-green-500">
						Safeguard Dashboard
					</h1>
				</div>
			</header>

			<main className="container mx-auto px-4 py-8">
				<div className="flex justify-between items-center mb-6">
					<div className="relative">
						<input
							type="text"
							placeholder="Search passwords..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-white border-gray-700 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
						/>
						<Search
							className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
							size={20}
						/>
					</div>
					<button
						onClick={() => setShowGenerator(true)}
						className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg flex items-center transition duration-300 ease-in-out"
					>
						<Plus size={20} className="mr-2" />
						Add Password
					</button>
				</div>

				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{filteredPasswords.map((password) => (
						<div
							key={password.id}
							className="bg-gray-800 p-6 rounded-lg shadow-lg"
						>
							<h3 className="text-xl font-semibold mb-2">{password.name}</h3>
							<p className="text-gray-400 mb-4">{password.username}</p>
							<div className="flex justify-between">
								<button
									className="text-green-500 hover:text-green-400"
									title="Copy"
								>
									<Copy size={20} />
								</button>
								<button
									className="text-blue-500 hover:text-blue-400"
									title="View"
								>
									<Eye size={20} />
								</button>
								<button
									className="text-yellow-500 hover:text-yellow-400"
									title="Edit"
								>
									<Edit size={20} />
								</button>
								<button
									className="text-red-500 hover:text-red-400"
									title="Delete"
								>
									<Trash2 size={20} />
								</button>
							</div>
						</div>
					))}
				</div>
			</main>

			{showGenerator && (
				<PasswordGenerator onClose={() => setShowGenerator(false)} />
			)}
		</div>
	);
}
