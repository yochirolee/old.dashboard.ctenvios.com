import { useState } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useAgencies } from "@/hooks/use-agencies";

export const AgencySelect = ({
	setSelectedAgency,
}: {
	setSelectedAgency: (agency: any) => void;
}) => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");

	const { data: agencies = [], isLoading, error } = useAgencies();
	console.log(agencies);
	if (error) {
		return <div>Error loading agencies</div>;
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between"
				>
					{value ? (
						agencies.find((agency: any) => agency.id === value)?.name + " - " + value
					) : isLoading ? (
						<Skeleton className="h-4 w-full" />
					) : (
						"Agencias..."
					)}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
				<Command className="w-full">
					<CommandInput placeholder="Search Agency..." />
					<CommandList>
						<CommandEmpty>No agencies found.</CommandEmpty>
						<CommandGroup>
							{agencies.map((agency: any) => (
								<CommandItem
									key={agency.id}
									value={agency.id}
									onSelect={() => {
										setValue(agency.id);
										setSelectedAgency(agency);
										setOpen(false);
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value === agency.id ? "opacity-100" : "opacity-0",
										)}
									/>
									{agency.name + " - " + agency.id}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
