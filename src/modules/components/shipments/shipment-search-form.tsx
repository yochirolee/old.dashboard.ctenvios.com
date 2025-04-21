import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const formSchema = z.object({
	search: z.string().min(4, { message: "Search is required" }),
});

export function ShipmentSearchForm({
	setQuerySearch,
	isLoading,
}: {
	setQuerySearch: (query: string) => void;
	isLoading: boolean;
}) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			search: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		setQuerySearch(values.search);
	}

	function handleSearchReset(e: React.FormEvent<HTMLInputElement>) {
		if (e.currentTarget.value === "") {
			form.reset({ search: "" });
			setQuerySearch("");
		}
	}

	return (
		<div className="grid w-full md:w-auto  ">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					
				>
					<FormField
						control={form.control}
						name="search"
						disabled={isLoading}
						render={({ field }) => (
							<FormItem >
								<FormControl >
									<div className="relative  ml-auto flex-1 md:grow-0">
										<Search className="absolute left-2.5 top-[12px] h-4 w-4 text-muted-foreground" />
										<Input
											type="search"
											placeholder="Buscar..."
											className="   pl-8 md:w-[200px] lg:w-[336px]"
											{...field}
											onChange={(e) => {
												field.onChange(e);
												handleSearchReset(e);
											}}
										/>
										{isLoading && (
											<div className="absolute right-2.5 top-[12px]">
												<div className="h-4 w-4  animate-spin rounded-full border-2 border-primary border-t-transparent dark:border-sky-500 dark:border-t-transparent" />
											</div>
										)}
									</div>
								</FormControl>
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</div>
	);
}
