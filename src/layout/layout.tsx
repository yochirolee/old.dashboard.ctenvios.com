import React, { useState } from "react";

import {
	BadgeCheck,
	Bell,
	ChevronRight,
	ChevronsUpDown,
	CreditCard,
	File,
	Frame,
	GalleryVerticalEnd,
	Home,
	LogOut,
	Map,
	PieChart,
	Plus,
	Settings2,
	Sparkles,
	User,
	Warehouse,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarRail,
	SidebarTrigger,
} from "@/components/ui/sidebar";

import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ModeToggle } from "@/components/common/nav/mode-toggle";
import { Toaster } from "@/components/ui/toaster";
import { nav_links } from "@/data/data";
import { useAuth } from "@/context/auth-context";

export default function Layout({ children }: { children: ReactNode }) {
	const [activeTeam, setActiveTeam] = useState(nav_links.teams[0]);
	const [activeItem, setActiveItem] = useState("/"); // Default to Dashboard

	const handleItemClick = (url: string) => {
		setActiveItem(url);
	};
	const { logout, user } = useAuth();

	// Add role-based filtering for navigation items
	const filteredNavLinks = nav_links.navMain.filter((item) => {
		// If no roles specified, show to everyone
		if (!item.roles) return true;
		// Show if user's role is included in item's allowed roles
		return item.roles.includes(user?.role || "");
	});

	function generateBreadcrumbs() {
		const location = useLocation();
		const pathnames = location.pathname.split("/").filter((x) => x);

		return (
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<Link to="/">Home</Link>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					{pathnames.map((value, index) => {
						const to = `/${pathnames.slice(0, index + 1).join("/")}`;
						const isLast = index === pathnames.length - 1;

						return (
							<React.Fragment key={to}>
								<BreadcrumbItem>
									{isLast ? (
										<BreadcrumbPage>
											{value.charAt(0).toUpperCase() + value.slice(1)}
										</BreadcrumbPage>
									) : (
										<Link to={to}>{value.charAt(0).toUpperCase() + value.slice(1)}</Link>
									)}
								</BreadcrumbItem>
								{!isLast && <BreadcrumbSeparator />}
							</React.Fragment>
						);
					})}
				</BreadcrumbList>
			</Breadcrumb>
		);
	}

	return (
		<SidebarProvider>
			<Sidebar collapsible="icon">
				<SidebarHeader>
					<SidebarMenu>
						<SidebarMenuItem>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<SidebarMenuButton
										size="lg"
										className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
									>
										<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
											<activeTeam.logo className="size-4" />
										</div>
										<div className="grid flex-1 text-left text-sm leading-tight">
											<span className="truncate font-semibold">{activeTeam.name}</span>
											<span className="truncate text-xs">{activeTeam.plan}</span>
										</div>

										<ChevronsUpDown className="ml-auto" />
									</SidebarMenuButton>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
									align="start"
									side="bottom"
									sideOffset={4}
								>
									<DropdownMenuLabel className="text-xs text-muted-foreground">
										Teams
									</DropdownMenuLabel>
									{nav_links.teams.map((team, index) => (
										<DropdownMenuItem
											key={team.name}
											onClick={() => setActiveTeam(team)}
											className="gap-2 p-2"
										>
											<div className="flex size-6 items-center justify-center rounded-sm border">
												<team.logo className="size-4 shrink-0" />
											</div>
											{team.name}
											<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
										</DropdownMenuItem>
									))}
									<DropdownMenuSeparator />
									<DropdownMenuItem className="gap-2 p-2">
										<div className="flex size-6 items-center justify-center rounded-md border bg-background">
											<Plus className="size-4" />
										</div>
										<div className="font-medium text-muted-foreground">Add team</div>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupLabel>Agencia</SidebarGroupLabel>
						<SidebarMenu>
							{filteredNavLinks.map((item) =>
								item.items ? (
									<Collapsible
										key={item.title}
										asChild
										defaultOpen={item.url === activeItem}
										className="group/collapsible"
									>
										<SidebarMenuItem>
											<CollapsibleTrigger asChild>
												<SidebarMenuButton
													tooltip={item.title}
													onClick={() => handleItemClick(item.url)}
													className="my-1"
												>
													{item.icon && <item.icon />}
													<span className=" block  text-base font-semibold leading-7 text-gray-600   ">
														{item.title}
													</span>
													<ChevronRight className="ml-auto  transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
												</SidebarMenuButton>
											</CollapsibleTrigger>
											<CollapsibleContent>
												<SidebarMenuSub>
													{item.items
														.filter(
															(subItem) =>
																!subItem.roles || subItem.roles.includes(user?.role || ""),
														)
														.map((subItem) => (
															<SidebarMenuSubItem key={subItem.title}>
																<Link to={subItem.url}>
																	<SidebarMenuSubButton
																		asChild
																		isActive={subItem.url === activeItem}
																		onClick={() => handleItemClick(subItem.url)}
																	>
																		<span className="my-0.5 text-md">{subItem.title}</span>
																	</SidebarMenuSubButton>
																</Link>
															</SidebarMenuSubItem>
														))}
												</SidebarMenuSub>
											</CollapsibleContent>
										</SidebarMenuItem>
									</Collapsible>
								) : (
									<SidebarMenuItem key={item.title}>
										<Link to={item.url}>
											<SidebarMenuButton
												tooltip={item.title}
												isActive={item.url === activeItem}
												onClick={() => handleItemClick(item.url)}
											>
												{item.icon && <item.icon />}
												<span className=" block  text-base font-semibold leading-7 text-gray-600 ">
													{item.title}
												</span>
											</SidebarMenuButton>
										</Link>
									</SidebarMenuItem>
								),
							)}
						</SidebarMenu>
					</SidebarGroup>
				</SidebarContent>
				<SidebarFooter>
					<SidebarMenu>
						<SidebarMenuItem>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<SidebarMenuButton
										size="lg"
										className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
									>
										<Avatar className="h-8 w-8 rounded-lg">
											<AvatarImage src={nav_links.user.avatar} alt={nav_links.user.name} />
											<AvatarFallback className="rounded-lg">CN</AvatarFallback>
										</Avatar>
										<div className="grid flex-1 text-left text-sm leading-tight">
											<span className="truncate font-semibold">{user?.name}</span>
											<span className="truncate text-xs">{user?.email}</span>
										</div>
										<ChevronsUpDown className="ml-auto size-4" />
									</SidebarMenuButton>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
									side="bottom"
									align="end"
									sideOffset={4}
								>
									<DropdownMenuLabel className="p-0 font-normal">
										<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
											<Avatar className="h-8 w-8 rounded-lg">
												<AvatarImage src={nav_links.user.avatar} alt={nav_links.user.name} />
												<AvatarFallback className="rounded-lg">CN</AvatarFallback>
											</Avatar>
											<div className="grid flex-1 text-left text-sm leading-tight">
												<span className="truncate font-semibold">{user?.name}</span>
												<span className="truncate text-xs">{user?.email}</span>
											</div>
										</div>
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuGroup>
										<DropdownMenuItem>
											<User />
											{user?.role}
										</DropdownMenuItem>
									</DropdownMenuGroup>
									<DropdownMenuSeparator />
									<DropdownMenuGroup>
										<DropdownMenuItem>
											<BadgeCheck />
											Account
										</DropdownMenuItem>
										<DropdownMenuItem>
											<CreditCard />
											Billing
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Bell />
											Notifications
										</DropdownMenuItem>
									</DropdownMenuGroup>
									<DropdownMenuSeparator />
									<DropdownMenuItem onClick={logout}>
										<LogOut />
										Log out
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>
				<SidebarRail />
			</Sidebar>
			<SidebarInset className="relative overflow-auto  shrink-1">
				<header className="flex z-10 sticky top-0 bg-background h-16 shrink-0 border-b items-center gap-2 px-2 md:px-4">
					<SidebarTrigger className="md:-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<div className="flex flex-1 justify-between items-center ">
						{generateBreadcrumbs()}
						<ModeToggle />
					</div>
				</header>

				<div className=" flex-1 md:p-4 p-2 mt-2">{children}</div>
				<Toaster />
			</SidebarInset>
		</SidebarProvider>
	);
}
