import { useState } from "react";
import WheelContext from "./WheelContext";

const WheelContextProvider = ({ children }) => {
	const [playersPerTeam, setPlayersPerTeam] = useState(5);
	const [spinSpeed, setSpinSpeed] = useState(0); // 0 = normal, 1 = fast, 2 = turbo
	const [pickingOrder, setPickingOrder] = useState(0); // 0 = alternate, 1 = fill team

	return (
		<WheelContext.Provider
			value={{
				playersPerTeam,
				setPlayersPerTeam,
				spinSpeed,
				setSpinSpeed,
				pickingOrder,
				setPickingOrder,
			}}>
			{children}
		</WheelContext.Provider>
	);
};

export default WheelContextProvider;
