import ReviewCards from "./ReviewCards";

/**
 * ReviewsSection component that displays the testimonials section.
 * @returns {JSX.Element} The rendered ReviewsSection component.
 */
const ReviewsSection = () => {
	return (
		<section className="mx-auto flex max-w-[1200px] flex-col px-8 text-center md:text-left">
			<h1 className="my-4 text-xl font-bold text-blue-700 md:text-3xl">Testimonials</h1>
			<div>
				<ReviewCards />
			</div>
		</section>
	);
};

export default ReviewsSection;
