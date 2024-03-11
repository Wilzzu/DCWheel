import { BsSpeedometer2 } from "react-icons/bs";
import { IoPlayForwardOutline } from "react-icons/io5";
import { IoPlayOutline } from "react-icons/io5";
import MultiSelectionButton from "./MultiSelectionButton";
import { useContext } from "react";
import WheelContext from "../../contexts/WheelContext";

const icons = {
	0: <IoPlayOutline className="w-auto h-6 z-[2] stroke-white drop-shadow-icon" />,
	1: <IoPlayForwardOutline className="w-auto h-6 z-[2] stroke-white drop-shadow-icon" />,
	2: <BsSpeedometer2 className="w-auto h-6 z-[2] fill-white drop-shadow-icon" />,
};

const WheelSpeed = () => {
	const { spinSpeed, setSpinSpeed } = useContext(WheelContext);

	return (
		<div className="flex flex-col items-center">
			<p>Spin speed</p>
			<ul className="flex items-center bg-darkBlack rounded-lg p-1">
				<li>
					<MultiSelectionButton
						layout="selectedSpeed"
						name={"Normal"}
						type={0}
						icons={icons}
						val={spinSpeed}
						setVal={setSpinSpeed}
					/>
				</li>
				<li>
					<MultiSelectionButton
						layout="selectedSpeed"
						name={"Fast"}
						type={1}
						icons={icons}
						val={spinSpeed}
						setVal={setSpinSpeed}
					/>
				</li>
				<li>
					<MultiSelectionButton
						layout="selectedSpeed"
						name={"Turbo"}
						type={2}
						icons={icons}
						val={spinSpeed}
						setVal={setSpinSpeed}
					/>
				</li>
			</ul>
		</div>
	);
};

export default WheelSpeed;
