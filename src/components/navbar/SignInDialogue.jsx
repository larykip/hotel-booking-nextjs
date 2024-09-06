import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"
import { Separator } from "../ui/separator"
import SignInForm from "../authForms/SignInForm"

export function SignInDialogue() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Sign In</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Sign In</DialogTitle>
                    <DialogDescription>Welcome back, login to your account</DialogDescription>
                </DialogHeader>

                <Separator />

                {/* Sign in form */}
                <SignInForm/>

                <Separator />
                    
                <DialogFooter className="sm:justify-center sm:items-center gap-2">
                    <DialogDescription className="justify-self-center">Not yet a member?</DialogDescription>

                    <Link href="/join" className={buttonVariants({ variant: "outline" })}>Join Now</Link>

                    {/* <Button variant="outline">
                        <Link href="/join">Join Now</Link>
                    </Button> */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
