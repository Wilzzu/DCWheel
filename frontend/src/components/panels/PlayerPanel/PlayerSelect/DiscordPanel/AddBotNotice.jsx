import { BiError } from "react-icons/bi";

const AddBotNotice = () => {
	return (
		<div className="flex gap-3 items-center w-full text-sm text-left bg-normalBlack rounded-md p-2">
			<BiError className="text-white/90 h-8 w-8 flex-shrink-0" />
			<p>
				The <b>DCWheel bot</b> is not added to any of your servers!
			</p>
		</div>
	);
};

export default AddBotNotice;
