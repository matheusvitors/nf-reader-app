import React from "react";
import { SystemThemeProvider } from "./contexts";
import { Router } from "./Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const App: React.FC = () => {
	const queryClient = new QueryClient()

	return (
		<SystemThemeProvider>
			<QueryClientProvider client={queryClient}>
				<Router />
			</QueryClientProvider>
		</SystemThemeProvider>
	);
};
