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
									<div className="relative ml-auto flex-1 md:grow-0">
										<Search className="absolute left-2.5 top-[12px] h-4 w-4 text-muted-foreground" />
										<Input
											type="search"
											placeholder="Buscar..."
											className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
											{...field}
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</div>
	);
}
