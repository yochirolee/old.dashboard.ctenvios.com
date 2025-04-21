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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Loader2, RefreshCcw } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Container } from "@/data/data";
import { useUpdateContainerStatus } from "@/hooks/use-containers";

const formSchema = z.object({
	timestamp: z.date(),
	statusId: z.string(),
});

// Infer the type from the schema
type FormValues = z.infer<typeof formSchema>;

export function ContainerUpdateModalForm({ selectedContainer }: { selectedContainer: Container }) {
	const [open, setOpen] = useState(false);
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			timestamp: undefined,
			statusId: undefined,
		},
	});
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const { mutate: updateContainerMutation, isPending } = useUpdateContainerStatus(
		selectedContainer?.id,
	);

	const onSubmit = async (data: FormValues) => {
		updateContainerMutation(
			{
				timestamp: data.timestamp,
				statusId: Number(data.statusId),
			},
			{
				onSuccess: () => {
					setOpen(false);
					form.reset();
				},
			},
		);
	};

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			form.reset();
		}
		setOpen(open);
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button disabled={!selectedContainer} variant="outline" size="sm" className=" w-full md:w-auto lg:flex border-gray-300/15">
					<RefreshCcw className="h-4 w-4 text-green-600" />
					<span className=" md:inline">Actualizar</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Actualizar Contenedor</DialogTitle>
					<DialogDescription>
						Por favor, proporcione detalles sobre el contenedor.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="timestamp"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Fecha</FormLabel>
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
							name="statusId"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Tipo de Evento</FormLabel>
									<Select
										onValueChange={(value) => {
											form.setValue("statusId", value);
										}}
										defaultValue={field.value?.toString()}
									>
										<SelectTrigger>
											<SelectValue placeholder="Selecciona un tipo de evento" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="5">Desagrupado - Pendiente de Aduana</SelectItem>
											<SelectItem value="6">Aforado- Listo Para Traslado</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button className="w-full" disabled={isPending} type="submit">
							{isPending ? (
								<div className="flex items-center gap-2">
									<Loader2 className="animate-spin" />
									Actualizando...
								</div>
							) : (
								"Actualizar"
							)}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
