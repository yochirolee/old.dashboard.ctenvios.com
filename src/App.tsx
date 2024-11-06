import { BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "./Router/AppRouter";
import Layout from "./layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./context/ThemeContext";

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
