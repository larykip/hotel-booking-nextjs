import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { Separator } from "../ui/separator";
import SignInForm from "../authForms/SignInForm";

/**
 * SignInDialogue component that displays a dialog for user sign-in.
 * @returns {JSX.Element} The rendered SignInDialogue component.
 */
export function SignInDialogue() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Sign In</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Sign In</DialogTitle>
					<DialogDescription>Welcome back, sign in to your account</DialogDescription>
				</DialogHeader>

				<Separator />

				{/* Sign in form */}
				<SignInForm />

				<Separator />

				<DialogFooter className="gap-2 sm:items-center sm:justify-center">
					<DialogDescription className="justify-self-center">Not yet a member?</DialogDescription>

					<Link href="/join" className={buttonVariants({ variant: "outline" })}>
						Join Now
					</Link>

					{/* <Button variant="outline">
                        <Link href="/join">Join Now</Link>
                    </Button> */}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
