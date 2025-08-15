import React from "react";
import { SystemThemeProvider } from "./contexts";
import { Router } from "./Router";

export const App: React.FC = () => {
	return (
		<SystemThemeProvider>
			<Router />
		</SystemThemeProvider>
	);
};
