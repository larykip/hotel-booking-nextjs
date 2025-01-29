import ReviewCards from "./ReviewCards";

/**
 * ReviewsSection component that displays the testimonials section.
 * @returns {JSX.Element} The rendered ReviewsSection component.
 */
const ReviewsSection = () => {
	return (
		<section className="mx-auto flex max-w-full flex-col px-4 sm:px-6 lg:px-8 text-center">
			<h1 className="my-4 text-xl font-bold text-blue-700 md:text-3xl">Testimonials</h1>
				<div className="flex justify-center">
				<ReviewCards />
			</div>
		</section>
	);
};

export default ReviewsSection;
