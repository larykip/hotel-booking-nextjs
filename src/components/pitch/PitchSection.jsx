import PitchCarousel from "./PitchCarousel";

/**
 * PitchSection component that displays the offerings of the hotel.
 * @returns {JSX.Element} The rendered PitchSection component.
 */
const PitchSection = () => {
	return (
		<section className="mx-auto my-16 flex max-w-[1200px] flex-col px-8 text-center md:text-left">
			<h1 className="my-4 text-xl font-bold text-blue-700 md:text-3xl">What we Offer</h1>
			<p>
				From cozy single rooms perfect for solo adventurers to spacious suites ideal for families or those seeking extra space and elegance, we have it all. Whether you're
				looking for a room with a view, a relaxing jacuzzi, or a cozy fireplace, we have the perfect room for you.
			</p>
			<div className="flex justify-center">
				<PitchCarousel />
			</div>
		</section>
	);
};

export default PitchSection;
