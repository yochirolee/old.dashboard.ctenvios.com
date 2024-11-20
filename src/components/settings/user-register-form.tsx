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

	const { register } = useAuthContext();

	const onSubmit = (data: z.infer<typeof FormSchema>) => {
		console.log(data);
		register(data.email, data.password, data.name, data.agencyId, data.roleId);
	};

	return (
		<Dialog>
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

						<Button type="submit" className="w-full" disabled={false}>
							{false ? "Registrando..." : "Registrar"}
						</Button>

						{false && <Alert variant="destructive">Usuario o contraseña incorrectos</Alert>}
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
