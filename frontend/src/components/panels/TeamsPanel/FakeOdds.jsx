import { useEffect, useState } from "react";

function calculateFakeOdds(numberOfTeams) {
	// Generate random win probabilities for each team
	const winProbabilities = Array(numberOfTeams)
		.fill(0)
		.map(() => Math.random());

	// Normalize to ensure probabilities add up to 1
	const totalProbability = winProbabilities.reduce((sum, prob) => sum + prob, 0);
	const normalizedProbabilities = winProbabilities.map((prob) => prob / totalProbability);
	const scalingFactor = numberOfTeams === 2 ? 1 : 1.7 / numberOfTeams;

	// Convert probabilities into decimal odds
	const odds = normalizedProbabilities.map((prob) => scalingFactor / prob);
	const limitedOdds = odds.map((odd) => {
		return Math.max(1.01, Math.min(10, odd)).toFixed(2);
	});

	return limitedOdds;
}

const FakeOdds = ({ teams }) => {
	const [fakeOdds, setFakeOdds] = useState([]);
	useEffect(() => {
		setFakeOdds(calculateFakeOdds(teams.length));
	}, [teams]);

	return (
		<div className="w-full col-span-2 gap-[0.1rem] flex flex-col items-center justify-center">
			<h1>Win Probabilities</h1>
			<div className="flex gap-1 w-full items-center justify-center flex-wrap">
				{fakeOdds &&
					fakeOdds?.map((odd, i) => (
						<div
							key={"odd" + i}
							className="card-dark py-1 px-2 2xl:py-2 gap-2 rounded-md 2xl:rounded-lg bg-gradient-to-tr border-2 flex items-center">
							<h2>{"Team " + (i + 1) + ":"}</h2>
							<span className="border-2 border-green-500 p-2 py-1 text-sm 2xl:text-base rounded-md 2xl:rounded-lg bg-green-500/20">
								<p className="drop-shadow-text">{odd}</p>
							</span>
						</div>
					))}
			</div>
		</div>
	);
};

export default FakeOdds;
