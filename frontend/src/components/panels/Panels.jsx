import { useContext, useEffect, useRef } from "react";
import WheelContext from "../../contexts/WheelContext";
import PlayerPanel from "./PlayerPanel/PlayerPanel";
import TeamsPanel from "./TeamsPanel/TeamsPanel";
import SettingsPanel from "../settings/SettingsPanel";
import { cn } from "../../../lib/utils";

const Panels = ({ rootRef }) => {
	const { ongoing } = useContext(WheelContext);
	const mainRef = useRef(null);

	// Scroll to top when going to player select
	useEffect(() => {
		if (ongoing) return;
		rootRef?.current?.scrollTo({ top: 0, behavior: "smooth" });
	}, [ongoing]);

	return (
		<section
			ref={mainRef}
			className={cn(
				"max-w-[440px] 2k:max-w-[540px] w-full lg:h-dvh py-5 flex flex-col justify-start lg:justify-between text-sm 2xl:text-base",
				ongoing && "lg:min-h-dvh lg:h-auto"
			)}>
			{ongoing ? <TeamsPanel mainRef={mainRef} /> : <PlayerPanel />}
			<SettingsPanel ongoing={ongoing} />
		</section>
	);
};

export default Panels;
