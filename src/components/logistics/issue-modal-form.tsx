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
import { AlertCircle, FlameIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const formSchema = z.object({
	hbl: z.string().min(1, "Tracking number is required"),
	eventId: z.number().min(1, "Event ID is required"),
	description: z.string().min(10, "Description must be at least 10 characters"),
	issueType: z.string().min(1, "Issue type is required"),
	userId: z.string().optional(),
});

export function IssueModalForm({ event }: { event: any }) {
	const [open, setOpen] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const queryClient = useQueryClient();
	console.log(event, "event");
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			hbl: event.hbl,
			eventId: event.id,
			issueType: "",
			description: "",
			userId: "42cbb03e-9d73-47a6-857e-77527c02bdc2",
		},
	});

	const createIssueMutation = useMutation({
		mutationFn: (values: z.infer<typeof formSchema>) =>
			axios.post("http://localhost:3001/api/issues", values),
		onSuccess: () => {
			setError(null);
			form.reset();
			setOpen(false);
			queryClient.invalidateQueries({
				queryKey: ["searchParcels"],
			});
			queryClient.invalidateQueries({
				queryKey: ["fetchParcelByHbl"],
			});
		},
		onError: (error) => {
			setError(error.message || "An error occurred while creating the issue");
			console.error("Error creating issue:", error);
		},
	});

	console.log(form.getValues(), "onSubmit");
	function onSubmit(values: z.infer<typeof formSchema>) {
		createIssueMutation.mutate(values);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" className="my-6">
					<FlameIcon className="h-4 w-4 text-red-500" />
					Incidencia
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Incidencia</DialogTitle>
					<DialogDescription>
						Por favor, proporcione detalles sobre la incidencia con su paquete.
					</DialogDescription>
				</DialogHeader>
				{error && <div className="text-sm font-medium text-red-500 mb-4">{error}</div>}
				<div className="flex flex-col gap-4 p-4  rounded-lg">
					<div className="flex items-center gap-2">
						<span className="text-gray-500">HBL:</span>
						<span className="font-medium">{event.hbl}</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-gray-500">Status:</span>
						<span className="font-medium">{event.status}</span>
					</div>
					<div className="col-span-2 flex items-center gap-2">
						<span className="text-gray-500">Location:</span>
						<span className="font-medium">{event.location}</span>
					</div>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="issueType"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Issue Type</FormLabel>
									<Select onValueChange={field.onChange}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select an issue type" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="ROTO">Paquete Roto</SelectItem>
											<SelectItem value="MOJADO">Paquete Mojado</SelectItem>
											<SelectItem value="FALTANTE">Contenido Faltante</SelectItem>
											<SelectItem value="NO_DECLARADO">No Declarado</SelectItem>
											<SelectItem value="DERRAME">Derrame</SelectItem>
											<SelectItem value="RETRASADO">Retrasado</SelectItem>
											<SelectItem value="OTRO">Otro</SelectItem>
											<SelectItem value="ENTREGA_FALLIDA">Entrega Fallida</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Please describe your issue in detail"
											className="resize-none"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex justify-end space-x-2 pt-4">
							<DialogTrigger asChild>
								<Button variant="outline">Cancel</Button>
							</DialogTrigger>
							<Button type="submit" disabled={createIssueMutation.isPending}>
								{createIssueMutation.isPending ? "Submitting..." : "Submit Issue"}
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
