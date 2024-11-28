import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";

import { useAuthContext } from "@/context/auth-context";
import { Alert } from "../ui/alert";
import {
	Select,
	SelectItem,
	SelectTrigger,
	SelectContent,
	SelectValue,
	SelectGroup,
} from "../ui/select";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogHeader,
	DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";

export const description =
	"A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";

const FormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),

	roleId: z.number(),
	name: z.string(),
	agencyId: z.number(),
});

type FormValues = z.infer<typeof FormSchema>;

export function UserRegisterForm() {
	const [open, setOpen] = useState(false);

	const form = useForm<FormValues>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
			roleId: 2,
			name: "",
			agencyId: 1,
		},
	});

	const { register, isRegistering, registerError } = useAuthContext();

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		register(data.email, data.password, data.name, data.agencyId, data.roleId);
		if (!isRegistering && !registerError) setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">Crear usuario</Button>
			</DialogTrigger>

			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>Crear usuario</DialogTitle>
					<DialogDescription>Crea un nuevo usuario para la plataforma</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<div className="grid gap-4">
										<div className="grid gap-2">
											<Label htmlFor="email">Nombre Completo</Label>
											<FormControl>
												<Input {...field} id="name" type="text" required />
											</FormControl>
										</div>
										<FormMessage />
									</div>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<div className="grid gap-4">
										<div className="grid gap-2">
											<Label htmlFor="email">Email</Label>
											<FormControl>
												<Input
													{...field}
													id="email"
													type="email"
													placeholder="m@example.com"
													required
												/>
											</FormControl>
										</div>
										<FormMessage />
									</div>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<div className="grid gap-2">
										<Label htmlFor="password">Password</Label>
										<FormControl>
											<Input {...field} id="password" type="password" required />
										</FormControl>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="role"
							render={({ field }) => (
								<FormItem>
									<Select onValueChange={field.onChange}>
										<SelectTrigger>
											<SelectValue
												placeholder="Selecciona un rol"
												aria-placeholder="Selecciona un rol"
											/>
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectItem value="admin">Administrador</SelectItem>
												<SelectItem value="user">Usuario</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" className="w-full" disabled={isRegistering}>
							{isRegistering ? "Registrando..." : "Registrar"}
						</Button>

						{registerError && <Alert variant="destructive">{registerError}</Alert>}
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
