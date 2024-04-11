import { useEffect, useState } from "react";

// Fake odds
function calculateFakeOdds(numberOfTeams) {
	// Generate random win probabilities for each team
	const winProbabilities = Array(numberOfTeams)
		.fill(0)
		.map(() => Math.random());

	// Normalize to ensure probabilities add up to 1
	const totalProbability = winProbabilities.reduce((sum, prob) => sum + prob, 0);
	const normalizedProbabilities = winProbabilities.map((prob) => prob / totalProbability);

	// Convert probabilities into decimal odds
	const odds = normalizedProbabilities.map((prob) => 1 / prob);
	const limitedOdds = odds.map((odd) => {
		return Math.max(1, Math.min(10, odd)).toFixed(2);
	});

	return limitedOdds;
}

const FakeOdds = ({ teams }) => {
	// Fake odds
	const [fakeOdds, setFakeOdds] = useState([]);
	useEffect(() => {
		setFakeOdds(calculateFakeOdds(teams.length));
	}, [teams]);

	return (
		<div className="w-full col-span-2 flex flex-col items-center justify-center">
			<h1>Win Probabilities</h1>
			<div className="flex gap-1 w-full items-center justify-center flex-wrap">
				{fakeOdds &&
					fakeOdds?.map((odd, i) => (
						<div
							key={"odd" + i}
							className="card-dark p-2 gap-2 rounded-lg bg-gradient-to-tr border-2 flex items-center">
							<h2>{"Team " + (i + 1) + ":"}</h2>
							<span className="border-2 border-green-500 p-2 py-1 rounded-lg bg-green-500/20">
								<p className="drop-shadow-text">{odd}</p>
							</span>
						</div>
					))}
			</div>
		</div>
	);
};

export default FakeOdds;
