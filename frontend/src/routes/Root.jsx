import Wheel from "../components/wheel/Wheel";
import Panels from "../components/panels/Panels";
import Title from "../components/Title";
import GDPRPopup from "../components/GDPRPopup";

function Root() {
	return (
		<main className="relative h-[100dvh] flex p-5 gap-28 justify-center font-outfit">
			<Title />
			<Wheel />
			<Panels />
			<GDPRPopup />
		</main>
	);
}

export default Root;
