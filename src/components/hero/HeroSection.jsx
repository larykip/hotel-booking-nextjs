import Image from "next/image";
import { Button } from "@/components/ui/button";

// export const dynamic = 'force-dynamic'

/**
 * HeroSection component that displays the hero image and text on the landing page.
 * @returns {JSX.Element} The rendered HeroSection component.
 */
const HeroSection = () => {
	return (
		<section className="mx-auto flex max-w-[1200px] flex-col justify-between px-8 md:flex-row">
			{/* Hero Image */}
			<div className="relative h-[200px] w-full md:h-[500px] md:w-[500px] md:basis-1/2">
				<Image
					className="rounded-lg object-cover"
					src="https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					fill
					alt="hero"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
				/>
			</div>

			{/* Hero Text */}
			<div className="m-4 flex basis-1/2 flex-col items-center justify-center text-center">
				<h1 className="m-3 text-xl font-bold text-blue-700 md:text-3xl">Looking for comfort & luxury in your next getaway?</h1>
				<h2 className="mb-3 text-sm md:text-lg">We offer a variety of room options to suit every traveler's needs.</h2>
				<Button className="">Explore</Button>
			</div>
		</section>
	);
};

export default HeroSection;
