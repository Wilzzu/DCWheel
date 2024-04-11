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
			className="scrollbar scrollbar-w-1 2xl:scrollbar-w-2 scrollbar-track-darkBlack scrollbar-thumb-green-500 overflow-y-auto overflow-x-hidden max-h-dvh">
			<main className="px-1 relative min-h-dvh flex flex-col lg:flex-row gap-0 xl:gap-16 2xl:gap-28 justify-center items-center lg:items-start font-outfit">
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
