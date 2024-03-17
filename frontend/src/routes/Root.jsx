import Wheel from "../components/wheel/Wheel";
import Panels from "../components/panels/Panels";
import Title from "../components/Title";

function Root() {
	return (
		<main className="relative h-[100dvh] flex p-5 gap-28 justify-center font-outfit">
			<Title />
			<Wheel />
			<Panels />
		</main>
	);
}

export default Root;
