import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/utils/firebase"; // Named import for `db`
import { collection, addDoc, Timestamp } from "firebase/firestore";

type Data = {
	message: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (req.method === "POST") {
		const { email } = req.body;

		if (!email || !email.includes("@")) {
			return res.status(400).json({ message: "Invalid email address." });
		}

		try {
			const waitlistRef = collection(db, "waitlist");
			await addDoc(waitlistRef, {
				email,
				createdAt: Timestamp.now(),
			});
			return res
				.status(200)
				.json({ message: "Successfully added to waitlist." });
		} catch (error) {
			console.error("Error adding to waitlist:", error); // Log error for debugging
			return res.status(500).json({ message: "Failed to add to waitlist." });
		}
	} else {
		return res.status(405).json({ message: "Method not allowed." });
	}
}
