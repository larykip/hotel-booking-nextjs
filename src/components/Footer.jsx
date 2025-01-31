"use client";

import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
	return (
		<div className="bg-pattern-4ps mt-4 flex w-full flex-col items-center gap-y-2 bg-gray-200 pt-4">
			<section>
				{/* Back to top button */}
				<Button
					className="flex items-center"
					onClick={() => {
						window.scrollTo({ top: 0, behavior: "smooth" });
					}}
				>
					<ChevronUp className="mr-2 h-4 w-4" />
					Back to top
				</Button>
				{/* <button className='bg-black text-white py-2 px-3 rounded-2xl'>Back to Top</button> */}
			</section>

			<section className="flex w-full justify-around px-4 text-sm">
				<div>
					<h2 className="m-2 ml-0 font-bold">Support</h2>
					<ul className="space-y-2">
						<li>
							<a>Help Center</a>
						</li>
						<li>
							Disability Support<a></a>
						</li>
						<li>
							<a>Cancellation Options</a>
						</li>
						<li>
							<a>Anti-Discrimination</a>
						</li>
					</ul>
				</div>
				<div>
					<h2 className="m-2 ml-0 font-bold">Legal</h2>
					<ul className="space-y-2">
						<li>
							<a>Terms of Service</a>
						</li>
						<li>
							<a>Privacy Policy</a>
						</li>
						<li>
							Cookie Policy<a></a>
						</li>
						<li>
							<a>Contact Us</a>
						</li>
					</ul>
				</div>
				<div>
					<h2 className="m-2 ml-0 font-bold">About Us</h2>
					<ul className="space-y-2">
						<li>
							<Link href="/about">About Us</Link>
						</li>
						<li>
							<a>Our Story</a>
						</li>
						<li>
							Careers<a></a>
						</li>
						<li>
							<a>Press</a>
						</li>
					</ul>
				</div>
			</section>

			<section className="flex w-full flex-col items-center border-t-2 border-white p-1 md:flex-row md:justify-around">
				<div className="flex space-x-2">
					<p>All Rights Reserved ©️ 2024</p>
				</div>
				<div className="flex flex-col items-center gap-x-2 md:w-auto md:flex-row">
					<Image src="images/icons8-twitterx.svg" width={25} height={25} alt="Twitter logo" />
					<p>@MetroManor</p>

					<Image src="images/icons8-instagram.svg" width={25} height={25} alt="Instagram logo" />
					<p>@MetroManor</p>

					<Image src="images/icons8-tiktok.svg" width={25} height={25} alt="TikTok logo" />
					<p>@MetroManor</p>
				</div>
			</section>
		</div>
	);
};

export default Footer;
