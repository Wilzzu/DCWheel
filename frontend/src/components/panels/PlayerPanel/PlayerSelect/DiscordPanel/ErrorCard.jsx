import { BiError } from "react-icons/bi";

const ErrorCard = ({ content }) => {
	return (
		<div className="flex items-center h-10 p-2 gap-1 w-full">
			<BiError className="text-red-500 h-5 w-5" />
			<p>{content || "Error"}</p>
		</div>
	);
};

export default ErrorCard;
