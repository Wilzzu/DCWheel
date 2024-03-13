import Wheel from "./components/wheel/Wheel";
import WheelContextProvider from "./contexts/WheelContextProvider";
import Panels from "./components/panels/Panels";

function App() {
	return (
		<main className="h-[100dvh] flex p-5 gap-28 justify-center font-outfit">
			<WheelContextProvider>
				<Wheel />
				<Panels />
			</WheelContextProvider>
		</main>
	);
}

export default App;
