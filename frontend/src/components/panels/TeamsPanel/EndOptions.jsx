import useSendScreenshot from "../../../api/useSendScreenshot";
import { PiImagesSquare } from "react-icons/pi";

const EndOptions = ({ containerRef }) => {
	const { sendScreenshot, isLoading, error, isSuccess } = useSendScreenshot();
	return (
		<>
			<button
				className="flex items-center justify-center  gap-2 p-4 text-white bg-gradient-to-tr from-transparent to-highlightBlack bg-darkBlack border-2 border-highlightBlack rounded-md hover:bg-highlightBlack duration-150"
				onClick={() => sendScreenshot(containerRef)}>
				<PiImagesSquare className="w-6 h-6" />
				{isLoading
					? "Sending..."
					: error
					? "Error"
					: isSuccess
					? "Screenshot sent!"
					: "Send Screenshot"}
			</button>
		</>
	);
};

export default EndOptions;
