import { useState } from "react";
import PlayerPanel from "./components/PlayerPanel";
import Wheel from "./components/wheel/Wheel";
import TeamsPanel from "./components/TeamsPanel";
import SettingsPanel from "./components/settings/SettingsPanel";
import WheelContextProvider from "./contexts/WheelContextProvider";

function App() {
	const [ongoing, setOngoing] = useState(false); // When the game in it's entirety is in progress, not just one round

	return (
		<main className="h-[100dvh] flex p-5 gap-28 justify-center font-outfit">
			<WheelContextProvider>
				<Wheel ongoing={ongoing} setOngoing={setOngoing} />
				<section className="max-w-[440px] 2k:max-w-[540px] w-full h-full flex flex-col justify-between">
					{ongoing ? <TeamsPanel /> : <PlayerPanel />}
					<SettingsPanel ongoing={ongoing} />
				</section>
			</WheelContextProvider>
		</main>
	);
}

export default App;
