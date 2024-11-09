import {
    Anchor,
	ArrowDown,
	ArrowRight,
	ArrowUp,
	Check,
	ShieldAlert,
	Ship,
	Timer,
	Truck,
} from "lucide-react";

export const labels = [
	{
		value: "bug",
		label: "Bug",
	},
	{
		value: "feature",
		label: "Feature",
	},
	{
		value: "documentation",
		label: "Documentation",
	},
];

export const statuses = [
	{
		value: "ENTREGADO",
		label: "Entregado",
		icon: Check,
	},
	{
		value: "EN_TRASLADO",
		label: "En Traslado",
		icon: Truck,
	},
	{
		value: "AFORADO",
		label: "Listo para Traslado (Aforado)",
		icon: Timer,
	},
	{
		value: "EN_ESPERA_DE_AFORO",
		label: "En Espera de Aforo (Aduana)",
		icon: ShieldAlert,
	},
	{
		value: "EN_PUERTO_DEL_MARIEL",
		label: "En Puerto del Mariel",
		icon: Anchor,
	},
];

export const priorities = [
	{
		label: "Low",
		value: "low",
		icon: ArrowDown,
	},
	{
		label: "Medium",
		value: "medium",
		icon: ArrowRight,
	},
	{
		label: "High",
		value: "high",
		icon: ArrowUp,
	},
];
