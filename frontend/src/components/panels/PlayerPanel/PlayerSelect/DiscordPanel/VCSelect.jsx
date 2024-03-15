import { useState } from "react";
import { HiOutlineVolumeUp } from "react-icons/hi";
import { FaAngleDown } from "react-icons/fa6";
import { IoMdRefresh } from "react-icons/io";
import VCContent from "./VCContent";
import { cn } from "../../../../../../lib/utils";

const VCSelect = () => {
	const [showVC, setShowVC] = useState(false);
	const [disabled, setDisabled] = useState(false);

	const selectedVC = null;

	const toggleVC = () => {
		setShowVC((prev) => !prev);
	};

	const forceRefetch = () => {
		// refetch();
		setDisabled(true);
	};

	return (
		<div
			className={cn(
				"relative w-full h-14 text-white bg-darkBlack hover:bg-highlightBlack duration-150 rounded-lg border-2 flex items-center justify-start border-green-500",
				showVC && "border-highlightBlack"
			)}>
			<button onClick={toggleVC} className="h-full w-full flex items-center justify-between px-4">
				<span className="flex items-center gap-2">
					{selectedVC ? (
						<>
							<img src={selectedVC.icon} alt="" className="w-10 h-auto rounded-full" />
							{selectedVC.name}
						</>
					) : (
						<>
							<HiOutlineVolumeUp className="h-6 w-auto inline-block" />
							Add from VC
						</>
					)}
				</span>
				{!showVC && <FaAngleDown className="h-6 w-auto mt-1" />}
			</button>
			{showVC && (
				<>
					<VCContent
					// isLoading={isLoading}
					// isRefetching={isRefetching}
					// isError={isError}
					// error={error}
					// data={data}
					/>
					<button
						disabled={disabled}
						onClick={forceRefetch}
						className="absolute right-4 h-10 duration-300 hover:text-green-400 disabled:hover:text-white disabled:opacity-40">
						<IoMdRefresh className="h-6 w-auto" />
					</button>
				</>
			)}
		</div>
	);
};

export default VCSelect;
