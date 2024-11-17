import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const HomeButton = () => {
	return (
		<Link
			href="/"
			className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-lg transition duration-300 ease-in-out transform inline-flex items-center"
		>
			<ArrowLeft className="mr-2 h-5 w-5" />
			Home
		</Link>
	);
};

export default HomeButton;
