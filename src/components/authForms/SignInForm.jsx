"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// sign in form schema using zod
const formSchema = z.object({
    emailAddress: z.string().email(),
    password: z.string().min(6, { message: "Must be a minimum of 6 characters" }),
});

const SignInForm = () => {
    // form definition
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            emailAddress: "",
            password: "",
        }
    });

    // our submit handler
    const onSubmit = async(values) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                // Redirect to dashboard or home page
                window.location.href = '/';
            } else {
                const errorData = await response.json();
                setError(errorData.error);
            }
        } catch(error){
            console.error('Submit Error:', err);
            setError('An error occurred. Please try again.');
        }
    }

    return (
        <main className='flex flex-col min-h-full items-center justify-between my-5 '>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col max-w-full w-full gap-5">
                    {/* Start of Email address field */}
                    <FormField
                        control={form.control}
                        name="emailAddress"
                        render={({field}) => {
                            return <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email address" type="email" {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }}
                    />
                    {/* End of Email address field */}

                    {/* Start of password field */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => {
                            return <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Password" type="password" {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }}
                    />
                    {/* End of password field */}

                    <Button type="submit" className="w-full">Sign in with Email</Button>
                </form>
            </Form>
        </main>
    )
}

export default SignInForm