"use client";

import { z } from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


// join form schema using zod
const formSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    emailAddress: z.string().email(),
    password: z.string().min(6),
    passwordConfirm: z.string(),
    gender: z.enum(["male", "female"]),
}).refine((data) => { // validates password confirmation field
    return data.password === data.passwordConfirm
}, { 
    message: "Passwords do not match", // custom error message if form is invalid
    path: ["passwordConfirm"] // field the error above belongs to
});

const JoinForm = () => {
    // form definition
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            emailAddress: "",
            password: "",
            passwordConfirm: "",
        }
    });

    // our submit handler
    const onSubmit = (values) => {
        console.log({values});
    }

    return (
        <main className='flex flex-col min-h-full items-center justify-between my-5 '>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col max-w-full w-full gap-5">
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Start of first name field */}
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({field}) => {
                                return <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="First Name" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }}
                        />
                        {/* End of first name field */}

                        {/* Start of last name field */}
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({field}) => {
                                return <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Last Name" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }}
                        />
                        {/* End of last name field */}
                    </div>

                    {/* Start of gender select */}
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({field}) => {
                            return <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <Select onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose your gender"/>
                                        </SelectTrigger>
                                    </FormControl>

                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                    </SelectContent>
                                </Select>
                                
                                <FormMessage />
                            </FormItem>
                        }}
                    />
                    {/* End of gender select */}
                    
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

                    {/* Start of passwordConfirm field */}
                    <FormField
                        control={form.control}
                        name="passwordConfirm"
                        render={({field}) => {
                            return <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Confirm Password" type="password" {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }}
                    />
                    {/* End of passwordConfirm field */}

                    <Button type="submit" className="w-full">Create account</Button>
                </form>

            </Form>
        </main>
  )
}

export default JoinForm