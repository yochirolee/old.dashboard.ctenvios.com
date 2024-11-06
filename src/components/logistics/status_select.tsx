
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const statuses = [
	{
		value: "AFORADO",
		label: "Aforado",
	},
	{
		value: "LISTO_PARA_TRASLADO",
		label: "Listo para Traslado",
	},
	{
		value: "EN_TRASLADO",
		label: "En Traslado",
	},
	{
		value: "ENTREGADO",
		label: "Entregado",
	},
	{
		value: "ENTREGA_FALLIDA",
		label: "Entrega Fallida",
	},
	{
		value: "ROTO",
		label: "Roto",
	},
	{
		value: "MOJADO",
		label: "Mojado",
	},
	{
		value: "CANAL_ROJO",
		label: "Canal Rojo",
	},
	{
		value: "FALTANTE",
		label: "Faltante",
	},
	{
		value: "NO_DECLARADO",
		label: "No Declarado",
	},
];

export function StatusSelect() {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");

	//on set value i need to update the parcel value using a mutation

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between"
				>
					{value ? statuses.find((status) => status.value === value)?.label : "Select status..."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Search status..." />
					<CommandList>
						<CommandEmpty>No status found.</CommandEmpty>
						<CommandGroup>
							{statuses.map((status) => (
								<CommandItem
									key={status.value}
									value={status.value}
									onSelect={(currentValue) => {
										setValue(currentValue === value ? "" : currentValue);
										setOpen(false);
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value === status.value ? "opacity-100" : "opacity-0",
										)}
									/>
									{status.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
