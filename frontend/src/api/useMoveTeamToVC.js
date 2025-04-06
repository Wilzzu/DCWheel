import axios from "axios";
import { useMutation } from "react-query";
import { useContext } from "react";
import DiscordContext from "../contexts/DiscordContext";
import useLocalStorage from "../hooks/useLocalStorage";
import useSessionStorage from "../hooks/useSessionStorage";

const useMoveTeamToVC = () => {
	const { selectedServer } = useContext(DiscordContext);
	const { getItem } = useLocalStorage();
	const { getSessionItem } = useSessionStorage();

	// Move team to VC and listen to the mutations
	const moveTeamToVCMutation = useMutation(async (variables) => {
		try {
			await axios.post(
				`${import.meta.env.VITE_SERVER_URL}/api/moveteamtovc`,
				{
					guildId: selectedServer?.id,
					channelId: variables.channelId,
					userId: getSessionItem("DCWSession", "user")?.provider_id,
					teamNumber: variables.teamNumber,
					data: variables.team,
				},
				{
					headers: {
						Authorization: `Bearer ${getItem("DCWAuth", "provider_token")}`,
					},
				}
			);
		} catch (error) {
			throw new Error("Failed to move team to a VC: " + error?.message);
		}
	});

	// Function that can be called from the component
	const moveTeamToVC = async (team, teamNumber, channelId) => {
		moveTeamToVCMutation.mutate({ team, teamNumber, channelId });
	};

	return {
		moveTeamToVC,
		isLoading: moveTeamToVCMutation.isLoading,
		error: moveTeamToVCMutation.error,
		isSuccess: moveTeamToVCMutation.isSuccess,
		reset: moveTeamToVCMutation.reset,
	};
};

export default useMoveTeamToVC;
