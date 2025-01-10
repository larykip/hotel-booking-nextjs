"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { Loader2 } from "lucide-react";

// sign in form schema using zod
const formSchema = z.object({
    emailAddress: z.string().email(),
    password: z.string().min(6, { message: "Must be a minimum of 6 characters" }),
});

const SignInForm = () => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

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
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                // Redirect to dashboard or home page
                router.push('/dashboard');
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch(error){
            console.error('Submit Error:', error);
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
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

                    {error && <p className="text-sm font-medium text-destructive p-2 rounded-md bg-red-100 border border-red-300">{error}</p>}

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="m-2 h-4 w-4 animate-spin" />
                                Signing in...
                            </>
                        ) : 'Sign in with Email' }
                        
                    </Button>
                </form>
            </Form>
        </main>
    )
}

export default SignInForm;