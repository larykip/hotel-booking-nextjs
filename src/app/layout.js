import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollButton from "@/components/ui/ScrollButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Metro Manor",
	description: "City living, refined.",
};

/**
 * RootLayout component that wraps the entire application.
 * @param {Object} props - The component props.
 * @param {JSX.Element} props.children - The child components to render.
 * @returns {JSX.Element} The rendered RootLayout component.
 */
export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				{children}
				<Analytics /> {/*  Vercel Analytics */}
				<SpeedInsights /> {/*  Vercel Speed Insights */}
				<ScrollButton />
			</body>
		</html>
	);
}
