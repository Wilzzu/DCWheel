import Wheel from "../components/wheel/Wheel";
import Panels from "../components/panels/Panels";
import Title from "../components/Title";
import GDPRPopup from "../components/GDPRPopup";
import Footer from "../components/Footer";

function Root() {
	return (
		<div className="scrollbar-thin scrollbar-track-darkBlack scrollbar-thumb-green-500 overflow-y-auto max-h-dvh">
			<main className="relative h-[100dvh] flex p-5 gap-28 justify-center font-outfit">
				<Title />
				<Wheel />
				<Panels />
			</main>
			<GDPRPopup />
			<Footer />
		</div>
	);
}

export default Root;
