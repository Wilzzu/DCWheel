import { useContext } from "react";
import WheelContext from "../../contexts/WheelContext";
import { LuArrowRightLeft } from "react-icons/lu";
import MultiSelectionButton from "./MultiSelectionButton";
import TeamFillIcon from "../../assets/TeamFillIcon";

const icons = {
	0: <LuArrowRightLeft className="w-auto h-6 z-[2] stroke-white drop-shadow-icon" />,
	1: <TeamFillIcon className="w-auto h-6 p-[0.12rem] z-[2] stroke-white drop-shadow-icon" />,
};

const PickingOrder = () => {
	const { pickingOrder, setPickingOrder } = useContext(WheelContext);

	return (
		<div className="flex flex-col items-center">
			<p>Picking order</p>
			<ul className="flex items-center bg-darkBlack rounded-lg p-1">
				<li>
					<MultiSelectionButton
						layout="selectedOrder"
						name={"Alternate"}
						type={0}
						icons={icons}
						val={pickingOrder}
						setVal={setPickingOrder}
					/>
				</li>
				<li>
					<MultiSelectionButton
						layout="selectedOrder"
						name={"Fill team"}
						type={1}
						icons={icons}
						val={pickingOrder}
						setVal={setPickingOrder}
					/>
				</li>
			</ul>
		</div>
	);
};

export default PickingOrder;
