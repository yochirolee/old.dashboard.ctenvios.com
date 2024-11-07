import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, RefreshCcw } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { tracking_api } from "@/api/tracking-api";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
	updatedAt: z.date(),
	containerId: z.number(),
	eventType: z.string(),
	userId: z.string(),
});

// Infer the type from the schema
type FormValues = z.infer<typeof formSchema>;

export function ContainerUpdateModalForm({ selectedContainerId }: { selectedContainerId: number }) {
	const [open, setOpen] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const queryClient = useQueryClient();

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			containerId: selectedContainerId,
			updatedAt: new Date(),
			eventType: "",
			userId: "42cbb03e-9d73-47a6-857e-77527c02bdc2",
		},
	});
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);

	const updateContainerMutation = useMutation({
		mutationFn: (values: z.infer<typeof formSchema>) =>
			tracking_api.containers.containerUpdate(values),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["parcelsByContainerId", selectedContainerId],
			});
			form.reset();
			toast({
				title: "Contenedor actualizado",
				description: "El contenedor ha sido actualizado correctamente",
			});
			setError(null);
			setOpen(false);
		},
		onError: (error) => {
			setError(error.message || "An error occurred while creating the issue");
			console.error("Error creating issue:", error);
		},
	});

	const onSubmit = async (data: FormValues) => {
		try {
			console.log(data);
			updateContainerMutation.mutate(data);
		} catch (error) {
			if (error instanceof z.ZodError) {
				// Format and set the validation errors
				const errorMessages = error.errors
					.map((err) => `${err.path.join(".")}: ${err.message}`)
					.join("\n");
				setError(errorMessages);
			} else {
				setError("An unexpected error occurred");
			}
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" className="my-6">
					<RefreshCcw className="h-4 w-4 text-green-500" />
					Actualizar Contenedor
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Actualizar Contenedor</DialogTitle>
					<DialogDescription>
						Por favor, proporcione detalles sobre el contenedor.
					</DialogDescription>
				</DialogHeader>
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
														" pl-3 text-left font-normal",
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
						<FormField
							control={form.control}
							name="eventType"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Tipo de Evento</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<SelectTrigger>
											<SelectValue placeholder="Selecciona un tipo de evento" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="CONTAINER_TO_CUSTOMS">
												Desagrupado - Pendiente de Aduana
											</SelectItem>
											<SelectItem value="CONTAINER_WAREHOUSE">
												Aforado- Listo Para Traslado
											</SelectItem>
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>
						<div className="flex justify-end space-x-2 pt-4">
							<DialogTrigger asChild>
								<Button type="button" variant="outline">
									Cancel
								</Button>
							</DialogTrigger>
							<Button disabled={updateContainerMutation.isPending} type="submit">
								{updateContainerMutation.isPending ? "Actualizando..." : "Actualizar"}
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
