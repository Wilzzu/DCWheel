import Wheel from "../components/wheel/Wheel";
import Panels from "../components/panels/Panels";
import Title from "../components/Title";
import GDPRPopup from "../components/GDPRPopup";
import Footer from "../components/Footer";
import { useRef } from "react";

function Root() {
	const rootRef = useRef(null);
	return (
		<div
			ref={rootRef}
			className="scrollbar-thin scrollbar-track-darkBlack scrollbar-thumb-green-500 overflow-y-auto overflow-x-hidden max-h-dvh">
			<main className="relative min-h-dvh flex gap-28 justify-center font-outfit">
				<Title />
				<Wheel />
				<Panels rootRef={rootRef} />
			</main>
			<GDPRPopup />
			<Footer />
		</div>
	);
}

export default Root;
