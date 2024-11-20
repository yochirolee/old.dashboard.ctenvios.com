import * as React from "react";
import {
	AlertCircle,
	Archive,
	ArchiveX,
	File,
	Inbox,
	MessagesSquare,
	Search,
	Send,
	ShoppingCart,
	Trash2,
	Users2,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { IssuesDisplay } from "@/components/issues/issues-display";

import IssueForm from "@/components/issues/issue-form";

import { IssuesList } from "@/components/issues/issues-list";
import { useFetchIssues } from "@/hooks/parcels/issues";

interface IssuesProps {
	issues: {
		hbl: string;
		invoiceId: number;
		agency: string;
		description: string;
	}[];
	defaultLayout: number[] | undefined;
	defaultCollapsed?: boolean;
	navCollapsedSize: number;
}

export default function IssuesPage({
	defaultLayout = [10, 32, 48],
	defaultCollapsed = false,
	navCollapsedSize,
}: IssuesProps) {
	const { data: issues, isLoading } = useFetchIssues();
	const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

	const [direction, setDirection] = React.useState<"horizontal" | "vertical">(
		window.innerWidth < 768 ? "vertical" : "horizontal",
	);

	React.useEffect(() => {
		const handleResize = () => {
			setDirection(window.innerWidth < 768 ? "vertical" : "horizontal");
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	if (isLoading) return <div>Loading...</div>;

	return (
		<TooltipProvider delayDuration={0}>
			<ResizablePanelGroup
				direction={direction}
				onLayout={(sizes: number[]) => {
					document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(sizes)}`;
				}}
				className="h-full  max-h-[calc(100vh-70px)]"
			>
				<ResizablePanel defaultSize={defaultLayout[0]} minSize={30}>
					<Tabs defaultValue="all">
						<div className="flex items-center px-4 py-2">
							<h1 className="text-xl font-bold">Reclamaciones</h1>
							<TabsList className="ml-auto">
								<TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">
									Todas
								</TabsTrigger>
								<TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">
									No Resueltas
								</TabsTrigger>
							</TabsList>
						</div>
						<Separator />
						<div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
							<form>
								<div className="relative">
									<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
									<Input placeholder="Search" className="pl-8" />
								</div>
							</form>
						</div>
						<TabsContent value="all" className="m-2">
							<IssuesList items={issues || []} />
						</TabsContent>
						<TabsContent value="unread" className="m-0">
							<IssuesList items={issues?.filter((item) => !item.hasIssue) || []} />
						</TabsContent>
					</Tabs>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
					{/*  <IssuesDisplay i={mails.find((item) => item.id === mail.id) || null} /> */}
					<IssueForm />
				</ResizablePanel>
			</ResizablePanelGroup>
		</TooltipProvider>
	);
}
