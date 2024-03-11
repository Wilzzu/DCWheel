const TeamFillIcon = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="100%"
		height="100%"
		viewBox="0 0 86.994 69.698"
		{...props}>
		<defs>
			<clipPath id="a">
				<path d="M0 0h34v66.5H0z" className="a" />
			</clipPath>
			<style>
				{".a,.b,.d{fill:none}.b,.d{stroke-linecap:round}.b{stroke-width:8px}.d{stroke-width:9px}"}
			</style>
		</defs>
		<path d="m42.174 5.578.011 58.487" className="b" />
		<g
			style={{
				clipPath: "url(#a)",
			}}
			transform="translate(0 1)">
			<path d="M4.494 5H29M4.494 24H29M4.494 43H29M4.494 62H29" className="d" />
		</g>
		<path
			d="M71.804 28.281 42.175 64.065M71.804 28.514l-.31 15M71.804 28.282l-16.31 3.232"
			className="b"
		/>
		<g
			style={{
				strokeLinejoin: "round",
				strokeWidth: 5,
				strokeDasharray: "71 31",
				strokeLinecap: "round",
				fill: "none",
			}}
			transform="translate(51.994)">
			<rect
				width={35}
				height={17}
				rx={8.5}
				style={{
					stroke: "none",
				}}
			/>
			<rect width={30} height={12} x={2.5} y={2.5} className="a" rx={6} />
		</g>
	</svg>
);
export default TeamFillIcon;
