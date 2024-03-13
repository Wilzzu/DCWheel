import { useEffect, useState } from "react";
import WheelContext from "./WheelContext";
import useLocalStorage from "../hooks/useLocalStorage";

let currentTeamIndex = 0;

const WheelContextProvider = ({ children }) => {
	const { getItem } = useLocalStorage();
	const [players, setPlayers] = useState([]); // Players that are on the player list, will be saved so when returned to lobby they will remain there
	const [currentPlayers, setCurrentPlayers] = useState([]); // Players that are rendered on wheel
	const [teams, setTeams] = useState([]);
	const [teamAmount, setTeamAmount] = useState(0);
	const [teamsNotEven, setTeamsNotEven] = useState(false);
	const [selectedPlayer, setSelectedPlayer] = useState(null);
	const [ongoing, setOngoing] = useState(false); // When the game in its entirety is in progress, not just one round
	const [spinning, setSpinning] = useState(false);

	// Read settings from local storage or set a default value
	const [playersPerTeam, setPlayersPerTeam] = useState(
		getItem("wheelSettings", "playersPerTeam") || 5
	);
	const [spinSpeed, setSpinSpeed] = useState(getItem("wheelSettings", "spinSpeed") || 0); // 0 = normal, 1 = fast, 2 = turbo
	const [pickingOrder, setPickingOrder] = useState(getItem("wheelSettings", "pickingOrder") || 0); // 0 = alternate, 1 = fill team
	const [autospin, setAutospin] = useState(getItem("wheelSettings", "autospin") || false);
	const [mute, setMute] = useState(getItem("wheelSettings", "mute") || false);

	const removePlayer = (id) => {
		setPlayers(players.filter((e) => e.id !== id));
	};

	const removePlayerFromWheel = (id) => {
		setCurrentPlayers(currentPlayers.filter((e) => e.id !== id));
	};

	const handleAlternatePicking = () => {
		// Create new team if one doesn't exist
		if (teams.length < teamAmount) {
			setTeams([...teams, [selectedPlayer]]);
			return currentTeamIndex++;
		}

		if (currentTeamIndex >= teamAmount) currentTeamIndex = 0;
		let index = currentTeamIndex; // We have to do this, since currentTeamIndex will be incremented before setTeams is called

		// Add player to current team and increment index
		setTeams((prev) => prev.map((team, i) => (i === index ? [...team, selectedPlayer] : team)));
		currentTeamIndex++;
	};

	const handleFillTeamPicking = () => {
		const currentTeam = teams[teams.length - 1];
		// Create new team if one doesn't exist or if the current team is full
		if (!currentTeam || currentTeam.length % playersPerTeam === 0) {
			return setTeams((prev) => [...prev, [selectedPlayer]]);
		}

		// Add player to current team
		setTeams((prev) =>
			prev.map((team, i) => (i === prev.length - 1 ? [...team, selectedPlayer] : team))
		);
	};

	const handleTeams = () => {
		// If no teams exist, create one and add selected player to it
		if (!teams.length) {
			setTeams([[selectedPlayer]]);
			currentTeamIndex = 1;
			return;
		}

		// Add player to team depending on picking order
		if (pickingOrder === 0) return handleAlternatePicking();
		return handleFillTeamPicking();
	};

	const returnToStart = () => {
		setOngoing(false);
		setCurrentPlayers(players);
		setTeams([]);
		setSelectedPlayer(null);
	};

	// Update current players whenever "players" get updated while in lobby
	useEffect(() => {
		if (!players || ongoing) return;
		setCurrentPlayers(players);
		setTeamAmount(Math.ceil(players.length / playersPerTeam)); // Calculate amount of teams
		setTeamsNotEven(players.length % playersPerTeam !== 0);
	}, [players, playersPerTeam]);

	useEffect(() => {
		if (!selectedPlayer) return;
		handleTeams();
	}, [selectedPlayer]);

	return (
		<WheelContext.Provider
			value={{
				players,
				teams,
				teamAmount,
				setPlayers,
				currentPlayers,
				ongoing,
				setOngoing,
				spinning,
				setSpinning,
				returnToStart,
				removePlayerFromWheel,
				removePlayer,
				selectedPlayer,
				setSelectedPlayer,
				teamsNotEven,
				spinSpeed,
				setSpinSpeed,
				pickingOrder,
				setPickingOrder,
				playersPerTeam,
				setPlayersPerTeam,
				autospin,
				setAutospin,
				mute,
				setMute,
			}}>
			{children}
		</WheelContext.Provider>
	);
};

export default WheelContextProvider;
