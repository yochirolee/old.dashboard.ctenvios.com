import { useState, useRef } from "react";
import { Upload, File, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

export default function ExcelUploadDialog() {
	const [open, setOpen] = useState(false);
	const [file, setFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);
	const [progress, setProgress] = useState(0);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

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

	const simulateUpload = async () => {
		setUploading(true);
		setProgress(0);
		setError(null);
		setSuccess(false);

		for (let i = 0; i <= 100; i += 10) {
			setProgress(i);
			await new Promise((resolve) => setTimeout(resolve, 500));
		}

		setUploading(false);
		setSuccess(true);
	};

	const handleUpload = async () => {
		if (!file) {
			setError("Please select a file to upload");
			return;
		}

		try {
			await simulateUpload();
			// In a real application, you would use an API call here
			// const formData = new FormData()
			// formData.append('file', file)
			// const response = await fetch('/api/upload', { method: 'POST', body: formData })
			// if (!response.ok) throw new Error('Upload failed')
		} catch (err) {
			setError("An error occurred during upload. Please try again.");
			setSuccess(false);
		}
	};

	const resetUpload = () => {
		setFile(null);
		setProgress(0);
		setError(null);
		setSuccess(false);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>Upload Excel File</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Upload Excel File</DialogTitle>
					<DialogDescription>Select and upload your Excel (.xlsx) file</DialogDescription>
				</DialogHeader>
				<Card className="w-full">
					<CardContent className="pt-6">
						<div className="space-y-4">
							<div className="flex items-center justify-center w-full">
								<label
									htmlFor="excel-file"
									className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
								>
									<div className="flex flex-col items-center justify-center pt-5 pb-6">
										<Upload className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
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
								<Alert>
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
								<Alert variant="default" className="border-green-500 text-green-700">
									<CheckCircle className="h-4 w-4" />
									<AlertTitle>Success</AlertTitle>
									<AlertDescription>File uploaded successfully!</AlertDescription>
								</Alert>
							)}
							{uploading && (
								<div className="space-y-2">
									<Progress value={progress} className="w-full" />
									<p className="text-sm text-gray-500 dark:text-gray-400 text-center">
										{progress}% uploaded
									</p>
								</div>
							)}
						</div>
					</CardContent>
					<CardFooter className="flex justify-between">
						<Button variant="outline" onClick={resetUpload}>
							Reset
						</Button>
						<Button onClick={handleUpload} disabled={!file || uploading}>
							{uploading ? "Uploading..." : "Upload"}
						</Button>
					</CardFooter>
				</Card>
			</DialogContent>
		</Dialog>
	);
}
