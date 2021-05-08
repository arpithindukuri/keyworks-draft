import { createContext, useState } from "react";

export const AppContext = createContext<AppContextType>({
	state: { type: null },
	setType: () => {},
	clearType: () => {},
});

export type typeType =
	| "ratings"
	| "trends"
	| "regcomp"
	| "highriskassets"
	| null;

export type stateType = {
	type: typeType;
};

export type AppContextType = {
	state: stateType;
	setType: (type: typeType) => void;
	clearType: () => void;
};

function AppProvider({ children }: { children: any }) {
	const [state, setState] = useState<stateType>({
		type: null,
	});

	const setType = (type: typeType) => {
		setState((prev) => ({ ...prev, type: type }));
	};

	const clearType = () => {
		setState((prev) => ({ ...prev, type: null }));
	};

	return (
		<AppContext.Provider
			value={{
				state,
				setType,
				clearType,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export default AppProvider;
