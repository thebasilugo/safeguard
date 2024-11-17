import React from "react";

interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
	children,
	onClick,
	type = "button",
}) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition duration-300 ease-in-out"
		>
			{children}
		</button>
	);
};

export default Button;
