const useSessionStorage = () => {
	// Key: Name of the group of items eg. "DCWPlayers", Item: Name of the item eg. "players", Value: Value of the item
	const setSessionItem = (key, item, value) => {
		try {
			const data = JSON.parse(sessionStorage.getItem(key) || "{}");
			data[item] = value;
			sessionStorage.setItem(key, JSON.stringify(data));
		} catch (e) {
			console.error(e);
		}
	};

	const getSessionItem = (key, item) => {
		try {
			const data = JSON.parse(sessionStorage.getItem(key) || "{}");
			return data[item];
		} catch (e) {
			console.error(e);
		}
	};

	return {
		getSessionItem,
		setSessionItem,
		clearSessionStorage: () => sessionStorage.clear(),
	};
};

export default useSessionStorage;
