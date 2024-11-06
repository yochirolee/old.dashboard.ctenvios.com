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
		<div className=" bg-muted/20  rounded-lg py-6 px-4 ">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="grid grid-cols-1 md:flex  md:mx-0 md:flex-row items-center gap-2 md:gap-4 "
				>
					<FormField
						control={form.control}
						name="search"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input className="md:w-72" placeholder="Search" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className=" md:w-auto dark:bg-muted text-white" type="submit" disabled={isLoading}>
						{isLoading ? (
							<div className="flex  w-full text-center md:text-left items-center gap-2">
								<Loader2 className="w-4 h-4 animate-spin" />
								<p>Buscando</p>
							</div>
						) : (
							<div className="flex w-full text-center md:text-left items-center gap-2">
								<Search className="w-4 h-4" />
								<p>Buscar</p>
							</div>
						)}
					</Button>
				</form>
			</Form>
		</div>
	);
}
