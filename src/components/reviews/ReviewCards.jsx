import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { testimonials } from "./Reviews";

/**
 * ReviewCards component that displays testimonials from users.
 * @returns {JSX.Element} The rendered ReviewCards component.
 */
const ReviewCards = () => {
	return (
		<div className="dark:bg-grid-white/[0.05] relative flex flex-col items-center justify-center overflow-hidden rounded-md bg-white antialiased dark:bg-black">
			<InfiniteMovingCards items={testimonials} direction="left" speed="slow" />
		</div>
	);
};

export default ReviewCards;
