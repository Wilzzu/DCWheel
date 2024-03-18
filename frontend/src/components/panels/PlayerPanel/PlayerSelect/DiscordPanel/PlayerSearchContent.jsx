import { LuPlusCircle } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";

const PlayerSearchContent = ({ isLoading, isRefetching, isError, data, error }) => {
	console.log(data);
	return (
		<div
			onClick={(e) => e.stopPropagation()}
			className="absolute top-[3.25rem] right-0 max-h-[30rem] w-3/4 p-2 overflow-y-auto bg-darkBlack rounded-md border-2 border-highlightBlack">
			<div className="w-full flex gap-2 items-center justify-center bg-highlightBlack rounded-md px-3 py-0 mb-2 drop-shadow-button">
				<IoSearch className="w-5 h-auto" />
				<input
					type="text"
					placeholder="Search players..."
					className="h-12 w-full outline-none bg-transparent"
				/>
			</div>
			<ul>
				{data?.members?.map((member) => (
					<li key={member.id}>
						<button className="group flex items-center w-full gap-2 p-2 hover:bg-highlightBlack rounded-md">
							<img
								src={member.avatar}
								alt={member.name + " avatar"}
								className="w-8 h-8 rounded-full"
							/>
							<p className="w-full truncate text-left" title={member.name}>
								{member.name}
							</p>
							<LuPlusCircle className="w-7 h-7 opacity-20 group-hover:opacity-100" />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default PlayerSearchContent;
