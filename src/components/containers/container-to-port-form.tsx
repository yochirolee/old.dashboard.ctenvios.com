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

import { useContainerToPort } from "@/hooks/use-containers";

const FormSchema = z.object({
	timestamp: z.date({
		required_error: "A date is required.",
	}),
});

export function ContainerToPortForm({ selectedContainerId }: { selectedContainerId: number }) {
	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			timestamp: undefined,
			containerId: undefined,
		},
	});
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);

	const { mutate: containerToPortMutation, isPending } = useContainerToPort(selectedContainerId);

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		containerToPortMutation(data.timestamp);
	};

	return (
		<div className="my-6">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="timestamp"
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
						{isPending ? (
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
