import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInDialogue } from "./SignInDialogue";

/**
 * SignUp component that displays sign-up options for users.
 * @returns {JSX.Element} The rendered SignUp component.
 */
const SignUp = () => {
	return (
		<div className="flex space-x-2">
			<Button variant="ghost">
				<Link href="/join">Join</Link>
			</Button>

			<SignInDialogue />
		</div>
	);
};

export default SignUp;
