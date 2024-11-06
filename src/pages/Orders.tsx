import { useQuery } from "@tanstack/react-query";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../components/ui/table";

interface Order {
	id: number;
	title: string;
	price: number;
	category: string;
}

const fetchOrders = async (): Promise<Order[]> => {
	const response = await fetch("https://fakestoreapi.com/products?limit=5");
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json();
};

export default function Orders() {
	const {
		data: orders,
		isLoading,
		error,
	} = useQuery<Order[], Error>({
		queryKey: ["orders"],
		queryFn: fetchOrders,
	});

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>An error occurred: {error.message}</div>;

	return (
		<div className="rounded-md container">
			<h1>Orders</h1>
			<p>Manage your orders here.</p>

			<Table>
				<TableCaption>A list of your recent orders.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>ID</TableHead>
						<TableHead>Title</TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Category</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{orders?.map((order) => (
						<TableRow key={order.id}>
							<TableCell>{order.id}</TableCell>
							<TableCell>{order.title}</TableCell>
							<TableCell>${order.price.toFixed(2)}</TableCell>
							<TableCell>{order.category}</TableCell>
							<TableCell>{order.title}</TableCell>
							<TableCell>${order.price.toFixed(2)}</TableCell>
							<TableCell>{order.category}</TableCell>
							<TableCell>{order.title}</TableCell>
							<TableCell>${order.price.toFixed(2)}</TableCell>
							<TableCell>{order.category}</TableCell>
							<TableCell>{order.title}</TableCell>
							<TableCell>${order.price.toFixed(2)}</TableCell>
							<TableCell>{order.category}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
