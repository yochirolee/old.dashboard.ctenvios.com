import { useMemo, useRef } from "react";
import { useQRCode } from "next-qrcode";
import Barcode from "react-barcode";
import { Separator } from "@/components/ui/separator";
import { useReactToPrint, PrintContextReturnType } from "react-to-print";
import { Button } from "@/components/ui/button";

interface ShippingLabelProps {
	trackingNumber: string;
	sender?: string;
	recipient?: string;
	destination?: string;
	weight?: {
		lb: number;
		kg: number;
	};
	volume?: string;
	packageCount?: number;
	address?: string;
	phone?: string;
	ci?: string;
}

export function ShippingLabel({
	trackingNumber,
	sender = "ZOILA ROSA OJEDA GALGUERRA",
	recipient = "YUSMARYS DE LAS MERCEDES CURBELO OJEDA",
	destination = "La Habana / Arroyo Naranjo",
	weight = { lb: 6.8, kg: 3.08 },
	volume = "0.0 m3",
	packageCount = 1,
	address = "Cuba La Habana Arroyo Naranjo Cll CALLE SOFIA No. 37 e/ CARLOS Y MARIA LUISA, RPTO PARRAGA, LA CURVA",
	phone = "50757163",
	ci = "90092328577",
}: ShippingLabelProps) {
	const { Canvas } = useQRCode();

	const formatText = useMemo(
		() => (text: string) => {
			return text
				.split(" ")
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
				.join(" ");
		},
		[],
	);

	return (
		<div className="w-[4in] h-[6in]  bg-white p-2 font-mono text-black mb-8 border border-gray-300 rounded-lg shadow-md">
			<div className="mb-2 flex items-center  justify-between">
				<h1 className="text-lg font-bold">Caribe Travel Express</h1>
				<div className="flex items-center justify-center gap-2 rounded bg-gray-800 px-3 py-1 text-white">
					<div className="text-xl">{packageCount}</div>
					<div className="text-sm">Bultos</div>
				</div>
			</div>

			<div className="mb-2 flex justify-center">
				<Barcode
					value={trackingNumber}
					width={1.5}
					height={50}
					fontSize={14}
					displayValue={true}
					margin={0}
				/>
			</div>

			<div className="space-y-2 text-sm">
				<div className="rounded px-3  text-center text-lg font-bold">Transcargo</div>
				<Separator className="my-1 bg-gray-100" />
				<div className="mt-6 rounded-lg  ">
					<div className="mb-2 bpx-2 py-1 text-left font-semibold ">
						TELEVISOR DE 55 PULGADAS VIZIO,TELEVISOR DE 55 PULGADAS VIZIO,TELEVISOR DE 55 PULGADAS
						VIZIO
					</div>
				</div>
				<div className="flex text-xs justify-between">
					<div className="inline-flex gap-1">
						<div>Peso:</div>
						<div>{weight.lb} Lb.</div>/<div>{weight.kg} Kg.</div>
					</div>
					<div className="inline-flex gap-1">
						<div>Vol:</div>
						<div>{volume}</div>
					</div>
				</div>

				<div className="flex  gap-2 items-center">
					<div className="text-xs font-semibold text-gray-600">Envia:</div>
					<div className="text-xs">{formatText(sender)}</div>
				</div>
				<div className="space-y-2">
					<div className="flex gap-2 items-center">
						<div className="text-xs font-semibold text-gray-600">Recibe:</div>
						<div className="">{formatText(recipient)}</div>
					</div>
					<div className="flex flex-wrap justify-between gap-2 text-sm">
						<div>
							<span className="text-xs font-semibold text-gray-600">Telefonos:</span> /{phone}
						</div>
						<div>
							<span className="text-xs font-semibold text-gray-600">Ci:</span> {ci}
						</div>
					</div>
					<div className="flex gap-2 items-center">
						<span className="text-xs font-semibold text-gray-600">Direccion:</span>

						{formatText(address)}
					</div>
				</div>

				<div className="text-center bg-gray-100 px-3 py-2 font-semibold">
					{formatText(destination)}
				</div>

				<div className="mt-4 flex items-end justify-between">
					<Canvas
						text={trackingNumber}
						options={{
							width: 100,
						}}
					/>
					<div className="text-2xl font-bold">64102</div>
				</div>
			</div>
		</div>
	);
}

export default function MultipleShippingLabels() {
	const contentRef = useRef<HTMLDivElement>(null);
	const reactToPrint = useReactToPrint({
		contentRef,
		pageStyle: `
      @page {
        size: 4in 6in;  /* Set exact page size to 4x6 inches */
        margin: 0;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      @media print {
        html, body {
          margin: 0;
          padding: 0;
          width: 4in;
          height: 6in;
        }
        .page-break-after {
          page-break-after: always;
          width: 4in;
          height: 6in;
        }
      }
    `,
	});

	const baseTrackingNumber = "CTE231425247602";

	const handlePrint = () => {
		reactToPrint();
	};

	const generateTrackingNumbers = (base: string, count: number) => {
		const result = [];
		for (let i = 0; i < count; i++) {
			const num = Number.parseInt(base.slice(-5)) + i;
			result.push(`${base.slice(0, -5)}${num.toString().padStart(5, "0")}`);
		}
		return result;
	};

	const trackingNumbers = generateTrackingNumbers(baseTrackingNumber, 10);

	return (
		<div className="flex flex-col items-center">
			<Button onClick={handlePrint} className="mb-4">
				Print Labels
			</Button>
			<div className="w- mx-auto" ref={contentRef}>
				{trackingNumbers.map((trackingNumber, index) => (
					<div key={trackingNumber} className="page-break-after">
						<ShippingLabel trackingNumber={trackingNumber} packageCount={index + 1} />
					</div>
				))}
			</div>
		</div>
	);
}
