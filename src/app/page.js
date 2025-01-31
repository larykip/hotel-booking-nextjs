import Footer from "@/components/Footer";
import HeroSection from "@/components/hero/HeroSection";
import Navbar from "@/components/navbar/Navbar";
import PitchSection from "@/components/pitch/PitchSection";
import ReviewsSection from "@/components/reviews/ReviewsSection";
import SearchWidget from "@/components/searchwidget/SearchWidget";

/**
 * Home component that displays the main landing page of the application.
 * @returns {JSX.Element} The rendered Home component.
 */
export default function Home() {
	return (
		<main className="flex min-h-screen flex-col">
			<Navbar />
			<SearchWidget />
			<HeroSection />
			<PitchSection />
			<ReviewsSection />
			<Footer />
		</main>
	);
}
