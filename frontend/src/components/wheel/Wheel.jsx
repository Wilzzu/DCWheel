import { useContext, useEffect, useRef, useState } from "react";
import { cn } from "../../../lib/utils";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import config from "../../../config.json";
import spinSound from "../../assets/spinSound.mp3";
import WheelContext from "../../contexts/WheelContext";
import useClickAnywhere from "../../hooks/useClickAnywhere";
import HelpButton from "./HelpButton";
import EndWarning from "./EndWarning";
import useWindowSize from "../../hooks/useWindowSize";
ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(ChartDataLabels);
ChartJS.defaults.font.family =
	"Outfit, ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'";

// Wheel default data
const defaultData = {
	labels: [],
	datasets: [
		// Players circle
		{
			backgroundColor: [],
			borderColor: [],
			additionalProperties: [],
			data: [],
			borderWidth: 10,
			borderAlign: "inner",
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
				// Truncate long names
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

// Parse spin speed to time
const spinTime = {
	0: 10000,
	1: 5000,
	2: 500,
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

const Wheel = () => {
	const [canSpin, setCanSpin] = useState(true);
	const [rotation, setRotation] = useState(0);
	const [wheelData, setWheelData] = useState(null);
	const [endWarning, setEndWarning] = useState(false);
	const wheelRef = useRef(null);

	const {
		players,
		currentPlayers,
		spinSpeed,
		removePlayerFromWheel,
		selectedPlayer,
		setSelectedPlayer,
		ongoing,
		setOngoing,
		allPlayersDrawn,
		setAllPlayersDrawn,
		setSpinning,
		autospin,
		mute,
	} = useContext(WheelContext);
	const clicked = useClickAnywhere(); // Used for audio context creation on first click
	const { width } = useWindowSize();

	// These allow us to change settings during the spin
	const muteRef = useRef(mute);
	const autospinRef = useRef(autospin);
	const canSpinRef = useRef(canSpin);
	const ongoingRef = useRef(ongoing);
	useEffect(() => {
		muteRef.current = mute;
		autospinRef.current = autospin;
		canSpinRef.current = canSpin;
		ongoingRef.current = ongoing;
	}, [mute, autospin, canSpin, ongoing]);

	function parsePlayersToWheel() {
		// Copy template and add placeholder data
		let template = structuredClone(defaultData);
		let addData = Array(4).fill({ name: "Add players" });

		// Replace placeholders
		if (currentPlayers.length > 0) addData = currentPlayers;
		if (ongoing) addData = currentPlayers;

		// Change border width based on player count and screen width
		let defaultWidth = width <= 1024 ? 16 : 26;
		template.datasets[0].borderWidth = defaultWidth - currentPlayers.length;

		// Go through each player and add bg and font color, or if ongoing use the colors they were assigned
		addData.forEach((e, i) => {
			template.labels.push(e.name);
			template.datasets[0].backgroundColor.push(
				ongoing ? e.bgColor : config.wheelColors[i % 20].bgColor
			);
			template.datasets[0].borderColor.push(
				ongoing ? e.borderColor : config.wheelColors[i % 20].borderColor
			);
			template.datasets[0].additionalProperties.push(
				ongoing ? e.fontColor : config.wheelColors[i % 20].fontColor
			);
			template.datasets[0].data.push(1);
		});

		setWheelData(template);
	}

	// On first spin, save each players bg and font color
	const lockPlayerColors = () => {
		currentPlayers.forEach((e, i) => {
			(e.bgColor = wheelData.datasets[0].backgroundColor[i]),
				(e.borderColor = wheelData.datasets[0].borderColor[i]),
				(e.fontColor = wheelData.datasets[0].additionalProperties[i]);
		});
	};

	const handleWheelClick = (auto) => {
		if (!canSpin && !auto) return;
		if (players?.length <= 0) return;

		// When all players have been selected and user presses the wheel
		if (ongoing && allPlayersDrawn) {
			setEndWarning(true);
			return setCanSpin(false);
		}

		// The first spin
		if (!ongoing) {
			lockPlayerColors();
			if (!audioContext) createAudioContext();
			setOngoing(true);
		} else {
			removePlayerFromWheel(selectedPlayer.id);
		}

		// Disable ability to spin until round end and set rotation to 0 to start the spin
		setCanSpin(false);
		setRotation(0);
	};

	const findSelectedIndex = (rotation) => {
		// How much space does one slice take from the wheel
		let sliceAngle = 360 / currentPlayers.length;

		// How many full rounds the wheel spun
		let rounds = Math.floor(rotation / 360);

		// How much was left from a one whole spin
		let left = rotation - rounds * 360;

		// Calculate which slice contains the remaining spin value and remove its index
		return Math.ceil(left / sliceAngle) - 1;
	};

	const spin = () => {
		setSpinning(true);

		// Calculate where wheel should stop at
		const newRotation = 360 * 7 + Math.random() * 360;
		setRotation(newRotation);
		setSelectedPlayer(null);

		// Play sound
		soundPromise.then(playSound);

		// Call round end after spin has stopped
		setTimeout(
			() => {
				handleRoundEnd(findSelectedIndex(newRotation));
			},
			currentPlayers?.length === 1 ? 1000 : spinTime[spinSpeed] // If only one player, end round in 1s
		);
	};

	const handleRoundEnd = (index) => {
		// Reverse array because we are spinning clockwise, return selected slice
		let rev = currentPlayers.slice().reverse();
		setSelectedPlayer({ ...rev[index], index });

		// If only one player, set all players drawn
		if (currentPlayers.length === 1) setAllPlayersDrawn(true);

		setCanSpin(true);
		setSpinning(false);
	};

	// Spin the wheel when rotation gets resetted and game is ongoing
	useEffect(() => {
		if (ongoing && !rotation) spin();
	}, [rotation, ongoing]);

	const playSound = (soundBuffer) => {
		const source = audioContext.createBufferSource();
		source.buffer = soundBuffer;
		const gainNode = audioContext.createGain();
		gainNode.gain.value = muteRef.current ? 0 : 0.1;

		source.connect(gainNode);
		gainNode.connect(audioContext.destination);
		source.start();
	};

	// Calculate current wheel position when rotating to play a tick sound
	useEffect(() => {
		if (canSpin) return;
		let animationFrameId;
		let lastAudioPlayed = 0;
		let prevSlicePosition = 999;

		const soundTiming = () => {
			// Get current rotation for animation frame
			const computedStyle = window.getComputedStyle(wheelRef.current);
			const rotationProperty = computedStyle.getPropertyValue("rotate");
			const curRotation = rotationProperty.substring(0, rotationProperty.length - 3) - 90;

			// Play sound if tick has entered new slice, aka if the current slice position is smaller than the previous slice position
			// Allow sound to play once every 32ms
			const slicePosition = (curRotation - 0.00001) % (360 / currentPlayers.length);
			if (slicePosition < prevSlicePosition && slicePosition > 0) {
				if (Date.now() - lastAudioPlayed > 32) {
					soundPromise.then(playSound);
					lastAudioPlayed = Date.now();
				}
			}

			prevSlicePosition = slicePosition;
			animationFrameId = requestAnimationFrame(soundTiming);
		};

		if (wheelRef.current && currentPlayers.length > 1) soundTiming(); // Don't play sound on last spin
		return () => cancelAnimationFrame(animationFrameId);
	}, [canSpin, rotation, wheelRef]);

	// Refresh wheel everytime player is added/removed
	useEffect(() => {
		parsePlayersToWheel();
	}, [currentPlayers]);

	// Autospin
	const autospinStart = () => {
		if (allPlayersDrawn) return; // Don't spin if all players have been selected
		if (autospinRef.current && canSpinRef.current && ongoingRef.current) handleWheelClick(true); // Double check if we can spin
	};

	useEffect(() => {
		if (autospinRef.current && canSpin && ongoing) setTimeout(() => autospinStart(), 500);
	}, [autospinRef.current, canSpin, ongoing]);

	// Preload sound and create audio context on first click
	useEffect(() => {
		const preloadSound = async () => await fetch(spinSound);
		preloadSound();
	}, []);

	useEffect(() => {
		if (clicked) createAudioContext();
	}, [clicked]);
	return (
		<section className="lg:sticky w-fit lg:w-auto top-0 max-w-full max-h-fit lg:max-h-dvh lg:h-dvh p-2 lg:p-5 aspect-square flex items-center justify-center select-none pointer-events-none">
			{/* Wheel container to hide overflow */}
			<div className="w-full h-full overflow-hidden drop-shadow-wheel">
				{/* Clickable spinning wheel */}
				<button
					onClick={handleWheelClick}
					ref={wheelRef}
					disabled={!canSpin || players.length <= 0}
					className={cn(
						"aspect-square w-full rounded-full overflow-hidden disabled:hover:cursor-default pointer-events-auto",
						!ongoing && "animate-infinite-rotate",
						canSpin && players.length > 0 && "hover:cursor-pointer"
					)}
					style={{
						rotate: rotation + 90 + "deg", // +90deg because selector tick is on the right
						transitionDuration: rotation
							? currentPlayers?.length === 1 // If only one player, spin for 1s
								? "1000ms"
								: spinTime[spinSpeed] + "ms"
							: "0ms",
						transitionTimingFunction: "cubic-bezier(.15,.6,.25,1)",
					}}>
					{wheelData && <Pie data={wheelData} options={options} />}
				</button>
			</div>
			{/* Selector pin */}
			<div className="absolute right-1 w-0 h-0 border-t-transparent border-t-[24px] lg:border-t-[32px] border-b-transparent border-b-[24px] lg:border-b-[32px] border-r-neutral-50 border-r-[24px] lg:border-r-[42px] drop-shadow-lg" />
			<HelpButton ongoing={ongoing} players={players} />
			{endWarning && <EndWarning setEndWarning={setEndWarning} setCanSpin={setCanSpin} />}
		</section>
	);
};

export default Wheel;
