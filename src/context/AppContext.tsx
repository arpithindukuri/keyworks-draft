import { createContext, useState } from "react";
import { WidgetIdType } from "../redux/widgetSlice";

export const AppContext = createContext<AppContextType>({
	state: { type: null },
	setType: () => {},
	clearType: () => {},
});

export type stateType = {
	type: WidgetIdType;
};

export type AppContextType = {
	state: stateType;
	setType: (type: WidgetIdType) => void;
	clearType: () => void;
};

function AppProvider({ children }: { children: any }) {
	const [state, setState] = useState<stateType>({
		type: null,
	});

	const setType = (type: WidgetIdType) => {
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
