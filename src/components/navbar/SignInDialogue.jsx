import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export function SignInDialogue() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Sign In</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Sign In to your account</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                        Email
                        </Label>
                        <Input
                        id="email"
                        type="email"
                        defaultValue="email@example.com"
                        className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                        Password
                        </Label>
                        <Input
                        id="password"
                        type="password"
                        defaultValue="password@123"
                        className="col-span-3"
                        />
                    </div>
                </div>
                    
                <DialogFooter>
                    <Button>
                        <Link href="/signin">Sign In</Link>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
