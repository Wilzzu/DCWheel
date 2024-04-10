import { ImSpinner2 } from "react-icons/im";

const LoadingPlaceholder = () => {
	return (
		<div className="flex items-center h-8 2xl:h-10 p-2 gap-2 w-full">
			<ImSpinner2 className="animate-spin h-5 w-5" />
			Loading...
		</div>
	);
};

export default LoadingPlaceholder;
