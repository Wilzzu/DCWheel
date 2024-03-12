import { useEffect, useState } from "react";
import WheelContext from "./WheelContext";
import { v4 as uuidv4 } from "uuid";

const WheelContextProvider = ({ children }) => {
	const [players, setPlayers] = useState([]); // Players that are on the player list, will be saved so when returned to lobby they will remain there
	const [currentPlayers, setCurrentPlayers] = useState([]); // Players that are rendered on wheel
	const [teams, setTeams] = useState([]);
	const [selectedPlayer, setSelectedPlayer] = useState(null);
	const [ongoing, setOngoing] = useState(false); // When the game in its entirety is in progress, not just one round

	// Settings
	const [playersPerTeam, setPlayersPerTeam] = useState(5);
	const [spinSpeed, setSpinSpeed] = useState(0); // 0 = normal, 1 = fast, 2 = turbo
	const [pickingOrder, setPickingOrder] = useState(0); // 0 = alternate, 1 = fill team

	const addPlayer = (name, image, id) => {
		const player = {
			name,
			image,
			id: id || uuidv4(),
		};

		setPlayers((prev) => [...prev, player]);
	};

	const removePlayer = (id) => {
		setPlayers(players.filter((e) => e.id !== id));
	};

	const removePlayerFromWheel = (id) => {
		setCurrentPlayers(currentPlayers.filter((e) => e.id !== id));
	};

	const addPlayerToTeam = (currentTeam) => {
		const editArray = teams.slice();
		editArray.pop();
		currentTeam.push(selectedPlayer);
		editArray.push(currentTeam);
		setTeams(editArray);
	};

	// For creating and editing teams
	const handleTeams = () => {
		const currentTeam = teams[teams.length - 1];
		// Create new team if no teams yet, or current one has all players
		if (!currentTeam || (currentTeam.length && currentTeam.length % playersPerTeam === 0)) {
			return setTeams((prev) => [...prev, [selectedPlayer]]);
		}

		addPlayerToTeam(currentTeam);
	};

	const returnToStart = () => {
		setOngoing(false);
		setCurrentPlayers(players);
		setTeams([]);
	};

	// Update current players whenever "players" get updated while in lobby
	useEffect(() => {
		if (!players || ongoing) return;
		setCurrentPlayers(players);
	}, [players]);

	useEffect(() => {
		if (!selectedPlayer) return;
		handleTeams();
	}, [selectedPlayer]);

	return (
		<WheelContext.Provider
			value={{
				players,
				addPlayer,
				teams,
				playersPerTeam,
				setPlayersPerTeam,
				setPlayers,
				spinSpeed,
				setSpinSpeed,
				pickingOrder,
				setPickingOrder,
				currentPlayers,
				ongoing,
				setOngoing,
				returnToStart,
				removePlayerFromWheel,
				removePlayer,
				selectedPlayer,
				setSelectedPlayer,
			}}>
			{children}
		</WheelContext.Provider>
	);
};

export default WheelContextProvider;
