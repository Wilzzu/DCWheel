import Wheel from "../components/wheel/Wheel";
import Panels from "../components/panels/Panels";

function Root() {
	return (
		<main className="h-[100dvh] flex p-5 gap-28 justify-center font-outfit">
			<Wheel />
			<Panels />
		</main>
	);
}

export default Root;
