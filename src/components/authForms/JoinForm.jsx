"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

// join form schema using zod
export const formSchema = z
	.object({
		firstName: z.string().min(1, { message: "Must be 1 or more characters long" }),
		lastName: z.string().min(1, { message: "Must be 1 or more characters long" }),
		emailAddress: z.string().email(),
		password: z.string().min(6, { message: "Must be a minimum of 6 characters" }),
		passwordConfirm: z.string(),
		gender: z.enum(["male", "female"]),
	})
	.refine(
		(data) => {
			// validates password confirmation field
			return data.password === data.passwordConfirm;
		},
		{
			message: "Passwords do not match", // custom error message if form is invalid
			path: ["passwordConfirm"], // field the error above belongs to
		},
	);

/**
 * JoinForm component that handles user registration.
 * @returns {JSX.Element} The rendered JoinForm component.
 */
const JoinForm = () => {
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	// form definition
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			emailAddress: "",
			password: "",
			passwordConfirm: "",
			gender: "",
		},
	});

	// our submit handler
	const onSubmit = async (values) => {
		setIsLoading(true);
		setError("");

		try {
			const response = await fetch("/api/auth/join", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			});

			if (response.ok) {
				// Redirect to dashboard or home page
				router.push("/");
			} else {
				const errorData = await response.json();
				setError(errorData.message);
			}
		} catch (error) {
			console.error("Submit Error:", error);
			setError("An error occurred. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main className="my-5 flex min-h-full flex-col items-center justify-between">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full max-w-full flex-col gap-5">
					<div className="flex flex-col gap-4 sm:flex-row">
						{/* Start of first name field */}
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>First Name</FormLabel>
										<FormControl>
											<Input placeholder="First Name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						{/* End of first name field */}

						{/* Start of last name field */}
						<FormField
							control={form.control}
							name="lastName"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Last Name</FormLabel>
										<FormControl>
											<Input placeholder="Last Name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						{/* End of last name field */}
					</div>

					{/* Start of gender select */}
					<FormField
						control={form.control}
						name="gender"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Gender</FormLabel>
									<Select onValueChange={field.onChange} value={field.value || ""}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Choose your gender" />
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											<SelectItem value="male">Male</SelectItem>
											<SelectItem value="female">Female</SelectItem>
										</SelectContent>
									</Select>

									<FormMessage />
								</FormItem>
							);
						}}
					/>
					{/* End of gender select */}

					{/* Start of Email address field */}
					<FormField
						control={form.control}
						name="emailAddress"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Email Address</FormLabel>
									<FormControl>
										<Input placeholder="Email address" type="email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					{/* End of Email address field */}

					{/* Start of password field */}
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input placeholder="Password" type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					{/* End of password field */}

					{/* Start of passwordConfirm field */}
					<FormField
						control={form.control}
						name="passwordConfirm"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<Input placeholder="Confirm Password" type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					{/* End of passwordConfirm field */}

					{error && <p className="rounded-md border border-red-300 bg-red-100 p-2 text-sm font-medium text-destructive">{error}</p>}

					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? (
							<>
								<Loader2 className="m-2 h-4 w-4 animate-spin" />
								Creating account...
							</>
						) : (
							"Create account"
						)}
					</Button>
				</form>
			</Form>
		</main>
	);
};

export default JoinForm;
