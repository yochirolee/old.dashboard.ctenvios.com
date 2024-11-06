import { BrowserRouter as Router } from "react-router-dom";

import Layout from "@/layout/layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/context/theme-context";
import AppRouter from "./router/AppRouter";

const queryClient = new QueryClient();

function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Router>
				<Layout>
					<QueryClientProvider client={queryClient}>
						<AppRouter />
					</QueryClientProvider>
				</Layout>
			</Router>
		</ThemeProvider>
	);
}

export default App;
