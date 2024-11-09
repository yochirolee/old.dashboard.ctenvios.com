import {
	Anchor,
	ArrowDown,
	ArrowRight,
	ArrowUp,
	BaggageClaim,
	Barcode,
	Building2,
	Check,
	CheckCheck,
	Container,
	FileText,
	LucideAnchor,
	ShieldAlert,
	ShieldCheck,
	Ship,
	Timer,
	Warehouse,
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
	{ value: "FACTURADO", label: "Facturado", icon: FileText },
	{ value: "EN_PALLET", label: "En Pallet", icon: BaggageClaim },
	{ value: "EN_DESPACHO", label: "En Despacho", icon: Barcode },
	{ value: "EN_CONTENEDOR", label: "En Contenedor", icon: Container },
	{ value: "EN_ESPERA_DE_AFORO", label: "En Espera de Aforo (Aduana)", icon: ShieldAlert },
	{ value: "AFORADO", label: "Aforado", icon: ShieldCheck },
	{ value: "EN_TRASLADO", label: "En Traslado", icon: Truck },
	{ value: "ENTREGADO", label: "Entregado", icon: CheckCheck },
];

export const locations = [
	{ value: 1, label: "Agencia", icon: Building2 },
	{ value: 2, label: "Almacen Central", icon: Warehouse },
	{ value: 3, label: "Contenedor", icon: Container },
	{ value: 4, label: "Puerto del Mariel", icon: LucideAnchor },
	{ value: 5, label: "Almacen Mypimes", icon: Warehouse },
	{ value: 6, label: "En Traslado", icon: Truck },
	{ value: 7, label: "Entregado", icon: CheckCheck },
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
