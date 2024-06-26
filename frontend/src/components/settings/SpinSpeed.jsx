import { BsSpeedometer2 } from "react-icons/bs";
import { IoPlayForwardOutline } from "react-icons/io5";
import { IoPlayOutline } from "react-icons/io5";
import MultiSelectionButton from "./MultiSelectionButton";
import { useContext } from "react";
import WheelContext from "../../contexts/WheelContext";

const icons = {
	0: (
		<IoPlayOutline className="w-auto h-5 2xl:h-6 p-[0.08rem] z-[2] stroke-white drop-shadow-icon" />
	),
	1: <IoPlayForwardOutline className="w-auto h-5 2xl:h-6 z-[2] stroke-white drop-shadow-icon" />,
	2: <BsSpeedometer2 className="w-auto h-5 2xl:h-6 z-[2] fill-white drop-shadow-icon" />,
};

const WheelSpeed = ({ layout }) => {
	const { spinSpeed, setSpinSpeed } = useContext(WheelContext);

	return (
		<div className="flex flex-col items-center">
			<p>Spin speed</p>
			<ul className="flex items-center bg-darkBlack rounded-md 2xl:rounded-lg p-1 drop-shadow-icon">
				<li>
					<MultiSelectionButton
						layout={layout}
						name={"Normal"}
						type={0}
						icons={icons}
						val={spinSpeed}
						setVal={setSpinSpeed}
						localKey={"wheelSettings"}
						localItem={"spin_speed"}
					/>
				</li>
				<li>
					<MultiSelectionButton
						layout={layout}
						name={"Fast"}
						type={1}
						icons={icons}
						val={spinSpeed}
						setVal={setSpinSpeed}
						localKey={"wheelSettings"}
						localItem={"spin_speed"}
					/>
				</li>
				<li>
					<MultiSelectionButton
						layout={layout}
						name={"Turbo"}
						type={2}
						icons={icons}
						val={spinSpeed}
						setVal={setSpinSpeed}
						localKey={"wheelSettings"}
						localItem={"spin_speed"}
					/>
				</li>
			</ul>
		</div>
	);
};

export default WheelSpeed;
