import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "../ui/card";
import { Loader2, Search } from "lucide-react";

const formSchema = z.object({
	search: z.string(),
});

export function SearchForm({
	onSearch,
	isLoading,
}: {
	onSearch: (query: string) => void;
	isLoading: boolean;
}) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			search: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		onSearch(values.search); // Pass the search term to the parent component
	}

	return (
		<div className="bg-gray-50/60  rounded-lg py-6 px-4 ">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-4 ">
					<FormField
						control={form.control}
						name="search"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input className="w-72" placeholder="Search" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" disabled={isLoading}>
						{isLoading ? (
							<>
								<Loader2 className="w-4 h-4 animate-spin" />
								Buscando
							</>
						) : (
							<>
								<Search className="w-4 h-4" />
								Buscar
							</>
						)}
					</Button>
				</form>
			</Form>
		</div>
	);
}
