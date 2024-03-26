import axios from "axios";
import html2canvas from "html2canvas";
import { useMutation } from "react-query";
import CryptoJS from "crypto-js";
import { useContext } from "react";
import DiscordContext from "../contexts/DiscordContext";
import useLocalStorage from "../hooks/useLocalStorage";

const useSendScreenshot = () => {
	const { selectedServer } = useContext(DiscordContext);
	const { getItem } = useLocalStorage();

	const createScreenshot = async (containerRef) => {
		const container = containerRef.current;
		if (container) {
			// Add custom styles to the container for the screenshot
			const style = document.createElement("style");
			document.head.appendChild(style);
			style.sheet?.insertRule("body > div:last-child img { display: inline-block; }"); // Fix paragraphs being offset: https://github.com/niklasvh/html2canvas/issues/2775#issuecomment-1316356991
			style.sheet?.insertRule(".team-card { border-color: #22C55E; }");

			// Generate the canvas
			const data = await html2canvas(container, { useCORS: true, backgroundColor: null }).then(
				(canvas) => {
					style.remove();
					return canvas.toDataURL("image/webp");
				}
			);

			// Encrypt data
			if (!data) return console.error("Failed to generate screenshot: No data found.");
			const encryptedData = CryptoJS.AES.encrypt(
				data,
				import.meta.env.VITE_ENCRYPTION_KEY
			).toString();
			return encryptedData;
		} else {
			console.error("Failed to generate screenshot: No container found.");
		}
	};

	// Send screenshot to the server and listen to the mutations
	const sendScreenshotMutation = useMutation(async (data) => {
		try {
			await axios.post(
				`${import.meta.env.VITE_SERVER_URL}/api/screenshot`,
				{
					guildId: selectedServer?.id,
					channelId: "924300455851458562", // Temporary hardcoded channel ID
					data,
				},
				{
					headers: {
						Authorization: `Bearer ${getItem("DCWAuth", "provider_token")}`,
					},
				}
			);
		} catch (error) {
			throw new Error("Failed to send screenshot: " + error.message);
		}
	});

	// Function that can be called from the component with containerRef
	const sendScreenshot = async (containerRef) => {
		const encryptedData = await createScreenshot(containerRef);
		sendScreenshotMutation.mutate(encryptedData);
	};

	return {
		sendScreenshot,
		isLoading: sendScreenshotMutation.isLoading,
		error: sendScreenshotMutation.error,
		isSuccess: sendScreenshotMutation.isSuccess,
	};
};

export default useSendScreenshot;
