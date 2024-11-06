import { BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "./Router/AppRouter";
import Layout from "./layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();


function App() {
	return (
		<Router>
			<Layout>
				<QueryClientProvider client={queryClient}>
					<AppRouter />
				</QueryClientProvider>
			</Layout>
		</Router>
	);
}

export default App;
