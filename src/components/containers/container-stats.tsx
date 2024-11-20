import { useMemo } from "react";
import { Label } from "@/components/ui/label";
import { CheckCheckIcon, ForkliftIcon, ShieldIcon, TruckIcon, AnchorIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export const ContainerStats = ({ parcelsInContainer }: { parcelsInContainer: any[] }) => {
	const stats = useMemo(() => {
		const initialStats = {
			puertoMariel: 0,
			aforoEspera: 0,
			almacenMypimes: 0,
			enTraslado: 0,
			entregado: 0,
		};

		return parcelsInContainer.reduce((acc, parcel) => {
			switch (parcel.status) {
				case "EN_CONTENEDOR":
					acc.puertoMariel++;
					break;
				case "EN_ESPERA_DE_AFORO":
					acc.aforoEspera++;
					break;
				case "AFORADO":
					acc.almacenMypimes++;
					break;
				case "EN_TRASLADO":
					acc.enTraslado++;
					break;
				case "ENTREGADO":
					acc.entregado++;
					break;
			}
			return acc;
		}, initialStats);
	}, [parcelsInContainer]);

	return (
		<div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-2 space-y-4 my-4">
			<div className="grid  col-span-5  gap-4 bg-muted/40 dark:bg-gray-900 rounded-lg md:p-6 grid-cols-1   lg:grid-cols-5">
				<Card className="rounded-xl border bg-card text-card-foreground shadow">
					<div className="m-6">
						<div className="flex items-center text-slate-800 dark:text-gray-300 my-4 justify-between">
							<Label> Puerto Mariel</Label>
							<AnchorIcon className="text-lg  text-violet-500" />
						</div>
						<div className="">
							<h1 className="text-2xl font-bold">{stats.puertoMariel}</h1>
						</div>
					</div>
				</Card>
				<Card className="rounded-xl border bg-card text-card-foreground shadow">
					<div className="m-6">
						<div className="flex items-center text-slate-800 dark:text-gray-300 my-4 justify-between">
							<div className="flex flex-col gap-1">
								<Label> Almacen MiPymes</Label>
							</div>

							<ShieldIcon className="text-lg  text-yellow-500" />
						</div>

						<div className="flex text-center items-center  justify-between gap-2">
							<h1 className="text-2xl font-bold">{stats.aforoEspera}</h1>
							<div className="text-xs text-slate-700">En espera de Aforo</div>
						</div>
					</div>
				</Card>
				<Card className="rounded-xl border bg-card text-card-foreground shadow">
					<div className="m-6">
						<div className="flex items-center text-slate-800 dark:text-gray-300 my-4 justify-between">
							<Label> Almacen Mypimes</Label>
							<ForkliftIcon className="text-xl  text-slate-800" />
						</div>
						<div className="flex text-center items-center  justify-between gap-2">
							<h1 className="text-2xl font-bold">{stats.almacenMypimes}</h1>
							<div className="text-xs text-slate-700">Aforado, Listo para Traslado</div>
						</div>
					</div>
				</Card>
				<Card className="rounded-xl border bg-card text-card-foreground shadow">
					<div className="m-6">
						<div className="flex items-center text-slate-800 dark:text-gray-300 my-4 justify-between">
							<Label> En Traslado</Label>
							<TruckIcon className="text-xl   text-blue-800" />
						</div>
						<h1 className="text-2xl font-bold">{stats.enTraslado}</h1>
					</div>
				</Card>
				<Card className="rounded-xl border bg-card text-card-foreground shadow">
					<div className="m-6">
						<div className="flex items-center text-slate-800 dark:text-gray-300 my-4 justify-between">
							<Label> Entregado</Label>
							<CheckCheckIcon className="text-xl  text-green-500" />
						</div>
						<h1 className="text-2xl font-bold">{stats.entregado}</h1>
					</div>
				</Card>
			</div>
		</div>
	);
};
