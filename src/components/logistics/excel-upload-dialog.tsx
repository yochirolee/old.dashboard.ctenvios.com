import { useState, useRef } from "react";
import { Upload, File, CheckCircle, AlertCircle, FileX, Loader2, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@/hooks/parcels/parcels";

export default function ExcelUploadDialog({ isLoading }: { isLoading: boolean }) {
	const [open, setOpen] = useState(false);
	const [file, setFile] = useState<File | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const mutation = useMutation({
		mutationFn: async (file: File) => {
			const formData = new FormData();
			formData.append("file", file);
			axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
			const response = await axios.post(`${baseUrl}/excel/upload-excel`, formData);
			return response.data;
		},

		onSuccess: () => {
			setSuccess(true);
			// Optionally invalidate and refetch other queries that might need updating
			// queryClient.invalidateQueries({ queryKey: ['parcels'] });
		},
		onError: () => {
			setError("An error occurred during upload. Please try again.");
			console.error(error);
			setSuccess(false);
		},
	});

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0];
		if (
			selectedFile &&
			selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
		) {
			setFile(selectedFile);
			setError(null);
		} else {
			setFile(null);
			setError("Please select a valid Excel file (.xlsx)");
		}
	};

	const handleUpload = async () => {
		if (!file) {
			setError("Please select a file to upload");
			return;
		}

		try {
			setError(null);
			setSuccess(false);
			mutation.mutate(file);
		} catch (err) {
			setError("An error occurred during upload. Please try again.");
			setSuccess(false);
		}
	};

	const resetUpload = () => {
		setFile(null);

		setError(null);
		setSuccess(false);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button disabled={isLoading} variant="ghost" size="sm" className="  h-8 lg:flex">
					<FileX className="h-4 w-4 text-green-600" />
					<span className=" md:inline">Importar Excel</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Upload Excel File</DialogTitle>
					<DialogDescription>Select and upload your Excel (.xlsx) file</DialogDescription>
				</DialogHeader>
				<Card className="w-full border-none space-y-4">
					<CardContent className="pt-6">
						<div className="space-y-4">
							<div className="flex items-center justify-center w-full">
								<label
									htmlFor="excel-file"
									className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-mute dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-muted"
								>
									<div className="flex flex-col items-center b justify-center pt-5 pb-6">
										<UploadCloud className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
										<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
											<span className="font-semibold">Click to upload</span> or drag and drop
										</p>
										<p className="text-xs text-gray-500 dark:text-gray-400">Excel file (XLSX)</p>
									</div>
									<input
										id="excel-file"
										type="file"
										className="hidden"
										accept=".xlsx"
										onChange={handleFileChange}
										ref={fileInputRef}
										aria-label="Upload Excel file"
									/>
								</label>
							</div>
							{file && (
								<Alert variant="default">
									<File className="h-4 w-4" />

									<AlertTitle>Selected File</AlertTitle>
									<AlertDescription>{file.name}</AlertDescription>
								</Alert>
							)}
							{error && (
								<Alert variant="destructive">
									<AlertCircle className="h-4 w-4" />
									<AlertTitle>Error</AlertTitle>
									<AlertDescription>{error}</AlertDescription>
								</Alert>
							)}
							{success && (
								<Alert variant="default" className="border-green-500  text-green-700">
									<CheckCircle className="h-4 w-4" />
									<AlertTitle>Success</AlertTitle>
									<AlertDescription>File processed successfully!</AlertDescription>
								</Alert>
							)}
						</div>
					</CardContent>
					<CardFooter className="grid grid-flow-col items-baseline gap-2   space-y-4  justify-end ">
						<Button
							variant="outline"
							className="w-full md:w-auto"
							onClick={handleUpload}
							disabled={!file || mutation.isPending}
						>
							{mutation.isPending ? (
								<div className="flex items-center gap-2">
									<Loader2 className="animate-spin" />
									<span>Processing</span>
								</div>
							) : (
								"Process"
							)}
						</Button>
						<Button
							variant="ghost"
							className="w-full md:w-auto"
							disabled={!file || mutation.isPending}
							onClick={resetUpload}
						>
							Reset
						</Button>
					</CardFooter>
				</Card>
			</DialogContent>
		</Dialog>
	);
}
