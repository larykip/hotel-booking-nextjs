import Image from "next/image";
import Link from "next/link";

/**
 * Logo component that displays the application logo.
 * @returns {JSX.Element} The rendered Logo component.
 */
const Logo = () => {
	return (
		<Link href="/" className="flex items-center">
			<Image src="/images/logo.jpg" width={100} height={100} alt="logo" priority className="rounded-b-lg" />
			{/* <h2>Metro Manor</h2> */}
		</Link>
	);
};

export default Logo;
