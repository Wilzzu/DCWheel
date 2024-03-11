import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { motion } from "framer-motion";
import ChartDataLabels from "chartjs-plugin-datalabels";
import config from "../../config.json";
import spinSound from "../assets/spinSound.mp3";
ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(ChartDataLabels);
ChartJS.defaults.font.family = "Outfit";

// Wheel default data
const defaultData = {
	labels: [],
	datasets: [
		// Players circle
		{
			backgroundColor: [],
			additionalProperties: [],
			data: [],
			borderWidth: 0,
			datasetIndex: 0,
		},
		// Inner white circle
		{
			data: [1],
			backgroundColor: ["#F5F5F5"],
			borderWidth: 10,
			borderColor: ["#F5F5F5"],
			weight: 0.33,
			datasetIndex: 1,
		},
	],
};

// Wheel options
const options = {
	plugins: {
		ChartDataLabels,
		legend: {
			display: false,
		},
		tooltip: {
			enabled: false,
		},
		datalabels: {
			formatter: function (_, context) {
				if (context.datasetIndex === 1) return "";
				const name = context.chart.data.labels[context.dataIndex];
				if (name.length > 14) return name.substring(0, 14) + "...";
				return name;
			},
			anchor: "center",
			align: "center",
			// offset: 10,
			rotation: function (ctx) {
				if (ctx.datasetIndex === 1) return;
				const valuesBefore = ctx.dataset.data.slice(0, ctx.dataIndex).reduce((a, b) => a + b, 0);
				const sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
				return ((valuesBefore + ctx.dataset.data[ctx.dataIndex] / 2) / sum) * 360 - 90;
			},
			font: function (context) {
				var width = context.chart.width;
				var size = Math.round(width / 26);
				return {
					size: size,
				};
			},
			color: function (context) {
				// Customize font color for each slice
				const index = context.dataIndex;
				if (!context.dataset.additionalProperties) return "#000";
				return context.dataset.additionalProperties[index] || "#fff";
			},
		},
	},
	animation: {
		duration: 0,
	},
	tooltips: { enabled: false },
	hover: { mode: null },
};

let audioContext;
let soundPromise;

// Set up audio
const createAudioContext = () => {
	audioContext = new AudioContext();
	soundPromise = loadSound(spinSound);
};
const loadSound = async (url) => {
	return fetch(url)
		.then((response) => response.arrayBuffer())
		.then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer));
};

const Wheel = (props) => {
	const [canSpin, setCanSpin] = useState(true);
	const [rotation, setRotation] = useState(0);
	const [wheelData, setWheelData] = useState(null);
	const [endWarning, setEndWarning] = useState(false);
	const wheelRef = useRef(null);

	function parsePlayersToWheel() {
		// Copy template and add placeholder data
		let template = structuredClone(defaultData);
		let addData = Array(4).fill({ name: "Add players" });

		// Replace placeholders
		if (props.currentPlayers.length > 0) addData = props.currentPlayers;
		if (props.ongoing) addData = props.currentPlayers;

		// Go through each player and add bg and font color, or if ongoing use the colors they were assigned
		addData.forEach((e, i) => {
			template.labels.push(e.name);
			template.datasets[0].backgroundColor.push(
				props.ongoing ? e.bgColor : config.wheelColors[i % 20].bgColor
			);
			template.datasets[0].additionalProperties.push(
				props.ongoing ? e.fontColor : config.wheelColors[i % 20].fontColor
			);
			template.datasets[0].data.push(1);
		});

		setWheelData(template);
	}

	// On first spin, save each players bg and font color
	const lockPlayerColors = () => {
		props.currentPlayers.forEach((e, i) => {
			(e.bgColor = wheelData.datasets[0].backgroundColor[i]),
				(e.fontColor = wheelData.datasets[0].additionalProperties[i]);
		});
	};

	const handleWheelClick = () => {
		if (!canSpin) return;
		if (props?.players?.length <= 0) return;

		// When all players have been selected and user presses the wheel
		if (props.ongoing && props.currentPlayers.length === 1) {
			setEndWarning(true);
			return setCanSpin(false);
		}

		// The first spin
		if (!props.ongoing) {
			lockPlayerColors();
			if (!audioContext) createAudioContext();
			props.setOngoing(true);
		} else {
			props.removePlayerFromWheel(props.selectedPlayer.id);
		}

		// Disable ability to spin until round end and set rotation to 0 to start the spin
		setCanSpin(false);
		setRotation(0);
	};

	const findSelectedIndex = (rotation) => {
		// How much space does one slice take from the wheel
		let sliceAngle = 360 / props.currentPlayers.length;

		// How many full rounds the wheel spun
		let rounds = Math.floor(rotation / 360);

		// How much was left from a one whole spin
		let left = rotation - rounds * 360;

		// Calculate which slice contains the remaining spin value and remove its index
		return Math.ceil(left / sliceAngle) - 1;
	};

	const spin = () => {
		// Calculate where wheel should stop at
		const newRotation = 360 * 7 + Math.random() * 360;
		setRotation(newRotation);
		props.setSelectedPlayer(null);

		// Call round end after spin has stopped
		setTimeout(() => {
			handleRoundEnd(findSelectedIndex(newRotation));
		}, props.spinTime);
	};

	const handleRoundEnd = (index) => {
		// Reverse array because we are spinning clockwise, return selected slice
		let rev = props.currentPlayers.slice().reverse();
		props.setSelectedPlayer({ ...rev[index], index });

		setCanSpin(true);
	};

	const handleEndWarning = () => {
		setEndWarning(false);
		setCanSpin(true);
	};

	// Spin the wheel when rotation gets resetted and game is ongoing
	useEffect(() => {
		if (props.ongoing && !rotation) spin();
	}, [rotation, props.ongoing]);

	const playSound = (soundBuffer) => {
		const source = audioContext.createBufferSource();
		source.buffer = soundBuffer;
		const gainNode = audioContext.createGain();
		gainNode.gain.value = 0.1;

		source.connect(gainNode);
		gainNode.connect(audioContext.destination);
		source.start();
	};

	// Calculate current wheel position when rotating to play a tick sound
	useEffect(() => {
		if (canSpin) return;
		let animationFrameId;
		let lastAudioPlayed = 0;

		const getCurrentRotation = () => {
			// Get current rotation for animation frame
			const computedStyle = window.getComputedStyle(wheelRef.current);
			const rotationProperty = computedStyle.getPropertyValue("rotate");
			const curRotation = rotationProperty.substring(0, rotationProperty.length - 3) - 90;

			// If tick has entered new slice, play audio if enough time has passed from last audio clip
			// Tweak the 0.00001, 10 and 5 values to determine how easily the sound is played
			if ((curRotation - 0.00001) % (360 / props.currentPlayers.length) < 10) {
				if (lastAudioPlayed > 10) {
					lastAudioPlayed = 0;
					soundPromise.then(playSound);
				}
			} else lastAudioPlayed++;

			animationFrameId = requestAnimationFrame(getCurrentRotation);
		};

		if (wheelRef.current) getCurrentRotation();
		return () => cancelAnimationFrame(animationFrameId);
	}, [canSpin, rotation, wheelRef]);

	// Refresh wheel everytime player is added/removed
	useEffect(() => {
		parsePlayersToWheel();
	}, [props.currentPlayers]);

	useEffect(() => {
		const preloadSound = async () => await fetch(spinSound);
		preloadSound();
	}, []);

	return (
		<section className="relative max-w-full aspect-square flex items-center justify-center select-none">
			{/* Wheel container to hide overflow */}
			<div className="w-full h-full overflow-hidden">
				{/* Spinning wheel div */}
				<div
					onClick={handleWheelClick}
					ref={wheelRef}
					className={cn(
						"aspect-square shadow-2xl w-full rounded-full overflow-hidden",
						!props.ongoing && "animate-infinite-rotate",
						canSpin && props?.players.length > 0 && "hover:cursor-pointer"
					)}
					style={{
						rotate: rotation + 90 + "deg", // +90deg because selector tick is on the right
						transitionDuration: rotation ? props.spinTime + "ms" : "0ms",
						transitionTimingFunction: "cubic-bezier(.15,.6,.25,1)",
					}}>
					{wheelData && <Pie data={wheelData} options={options} />}
				</div>
			</div>
			{/* Selector pin */}
			<div className="absolute -right-4 w-0 h-0 border-t-transparent border-t-[32px] border-b-transparent border-b-[32px] border-r-neutral-50 border-r-[42px] drop-shadow-lg" />
			{/* Help button */}
			<motion.div
				className={cn(
					"absolute py-4 px-6 2k:py-6 2k:px-8 rounded-2xl bg-green-600 border-2 border-green-400 bg-opacity-90 backdrop-blur-sm shadow-3xl shadow-green-500 text-white pointer-events-none",
					!props.ongoing &&
						props?.players.length <= 0 &&
						"bg-red-600 border-2 border-red-400 shadow-red-600",
					props.ongoing && "hidden"
				)}>
				<motion.p
					initial={{ y: 20, opacity: 0, rotate: 0.001 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{
						y: { type: "spring", stiffness: 20, damping: 4, delay: 0.35 },
						opacity: { duration: 1.2, delay: 0.35 },
					}}
					className={cn(
						"font-outfit text-3xl 2k:text-5xl group-hover:text-4xl",
						props?.players.length <= 0 && "pr-11 2k:pr-[4.2rem]"
					)}>
					{props?.players.length > 0 ? (
						"Click the wheel to spin!"
					) : (
						<>
							Add players <span className="ml-2 absolute animate-point-right">{"👉"}</span>
						</>
					)}
				</motion.p>
			</motion.div>
			{/* End warning */}
			{endWarning && (
				<div className="absolute w-1/2 h-1/5 bg-normalBlack rounded-3xl shadow-2xl flex flex-col items-center justify-center text-white gap-2 p-5">
					<p className="text-lg">Return to start?</p>
					{/* Selection buttons */}
					<div className="w-full flex gap-2 text-lg drop-shadow-md">
						<button
							onClick={() => {
								handleEndWarning();
								props.returnToStart();
							}}
							className="bg-green-500 w-full rounded-lg py-4 hover:bg-green-400 duration-150">
							<p className="drop-shadow-md">Yes</p>
						</button>
						<button
							onClick={handleEndWarning}
							className="bg-red-500 w-full rounded-lg py-4 hover:bg-red-400 duration-150">
							<p className="drop-shadow-md">Cancel</p>
						</button>
					</div>
				</div>
			)}
		</section>
	);
};

export default Wheel;
