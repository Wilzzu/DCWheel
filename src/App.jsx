import { useEffect, useState } from "react";
import PlayerPanel from "./components/PlayerPanel";
import Wheel from "./components/Wheel";
import { v4 as uuidv4 } from "uuid";
import TeamsPanel from "./components/TeamsPanel";
import SettingsPanel from "./components/settings/SettingsPanel";
import WheelContextProvider from "./contexts/WheelContextProvider";

function App() {
	const [players, setPlayers] = useState([]); // Selected players, will be saved so when returned to lobby they will remain there
	const [currentPlayers, setCurrentPlayers] = useState([]); // Players that are rendered on wheel
	const [teams, setTeams] = useState([]);
	const [playersPerTeam, setPlayersPerTeam] = useState(5);
	const [ongoing, setOngoing] = useState(false); // When the game in it's entirety is in progress, not just one round
	const [spinTime, setSpinTime] = useState(10000); // Add option for the user to select default or turbo spin time, can change during rounds
	const [selectedPlayer, setSelectedPlayer] = useState(null);

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
		if (!players) return;
		if (ongoing) return;

		setCurrentPlayers(players);
	}, [players]);

	useEffect(() => {
		if (!selectedPlayer) return;
		handleTeams();
	}, [selectedPlayer]);

	return (
		<main className="h-[100dvh] flex p-5 gap-28 justify-center font-outfit">
			<WheelContextProvider>
				<Wheel
					players={players}
					currentPlayers={currentPlayers}
					ongoing={ongoing}
					setOngoing={setOngoing}
					spinTime={spinTime}
					returnToStart={returnToStart}
					removePlayerFromWheel={removePlayerFromWheel}
					selectedPlayer={selectedPlayer}
					setSelectedPlayer={setSelectedPlayer}
					playersPerTeam={playersPerTeam}
				/>
				<section className="max-w-[440px] 2k:max-w-[540px] w-full h-full flex flex-col justify-between drop-shadow-xl">
					{ongoing ? (
						<TeamsPanel teams={teams} selectedPlayer={selectedPlayer} />
					) : (
						<PlayerPanel
							players={players}
							addPlayer={addPlayer}
							removePlayer={removePlayer}
							setPlayers={setPlayers}
						/>
					)}
					<SettingsPanel
						ongoing={ongoing}
						returnToStart={returnToStart}
						spinTime={spinTime}
						setSpinTime={setSpinTime}
						playersPerTeam={playersPerTeam}
						setPlayersPerTeam={setPlayersPerTeam}
						setPlayers={setPlayers}
						players={players}
					/>
				</section>
			</WheelContextProvider>
		</main>
	);
}

export default App;
