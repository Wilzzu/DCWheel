import { useContext } from "react";
import WheelContext from "../../contexts/WheelContext";
import { LuArrowRightLeft } from "react-icons/lu";
import MultiSelectionButton from "./MultiSelectionButton";
import TeamFillIcon from "../../assets/TeamFillIcon";

const icons = {
	0: (
		<LuArrowRightLeft className="w-auto h-5 2xl:h-6 p-[0.1rem] z-[2] stroke-white drop-shadow-icon" />
	),
	1: <TeamFillIcon className="w-auto h-5 2xl:h-6 p-[0.2rem] z-[2] stroke-white drop-shadow-icon" />,
};

const PickingOrder = () => {
	const { pickingOrder, setPickingOrder } = useContext(WheelContext);

	return (
		<div className="flex flex-col items-center">
			<p>Picking order</p>
			<ul className="flex items-center bg-darkBlack rounded-md 2xl:rounded-lg p-1 drop-shadow-icon">
				<li>
					<MultiSelectionButton
						layout="selectedOrder"
						name={"Alternate"}
						type={0}
						icons={icons}
						val={pickingOrder}
						setVal={setPickingOrder}
						localKey={"wheelSettings"}
						localItem={"picking_order"}
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
						localKey={"wheelSettings"}
						localItem={"picking_order"}
					/>
				</li>
			</ul>
		</div>
	);
};

export default PickingOrder;
