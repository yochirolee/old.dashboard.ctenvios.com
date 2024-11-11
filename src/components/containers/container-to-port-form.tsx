import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tracking_api } from "@/api/tracking-api";
import { toast } from "@/hooks/use-toast";

const FormSchema = z.object({
	updatedAt: z.date({
		required_error: "A date is required.",
	}),
	containerId: z.number(),
	eventType: z.string(),
	userId: z.string(),
});

export function ContainerToPortForm({ selectedContainerId }: { selectedContainerId: number }) {
	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			updatedAt: undefined,
			containerId: selectedContainerId,
			eventType: "CONTAINER_TO_PORT",
			userId: "42cbb03e-9d73-47a6-857e-77527c02bdc2",
		},
	});
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const queryClient = useQueryClient();

	const updateContainerMutation = useMutation({
		mutationFn: (values: z.infer<typeof FormSchema>) =>
			tracking_api.containers.containerUpdate({ ...values }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["parcelsByContainerId", selectedContainerId],
			});
			toast({
				title: "Contenedor actualizado",
				description: "El contenedor ha sido actualizado correctamente",
			});
			form.reset();
		},
		onError: (error) => {
			setError(error.message || "An error occurred while creating the issue");
			console.error("Error creating issue:", error);
		},
	});

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		updateContainerMutation.mutate(data);
	};

	return (
		<div className="my-6">
			{error && <div className="text-sm text-red-500 mb-4">{error}</div>}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="updatedAt"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={"outline"}
												className={cn(
													"w-[240px] pl-3 text-left font-normal",
													!field.value && "text-muted-foreground",
												)}
											>
												{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={(date) => {
												field.onChange(date);
												setIsCalendarOpen(false);
											}}
											disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button className="w-full dark:bg-muted text-white" type="submit">
						{updateContainerMutation.isPending ? (
							<div className="flex items-center gap-2">
								<Loader2 className="animate-spin" />
								Actualizando...
							</div>
						) : (
							"Agregar al Puerto del Mariel"
						)}
					</Button>
				</form>
			</Form>
		</div>
	);
}
