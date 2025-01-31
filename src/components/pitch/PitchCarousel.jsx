import Image from "next/image";

const PITCH = [
	{
		id: 1,
		title: "Standard double room",
		image: "/images/room1.jpg",
	},
	{
		id: 2,
		title: "Junior suite",
		image: "/images/room2.jpg",
	},
	{
		id: 3,
		title: "Executive suite",
		image: "/images/room3.jpg",
	},
	{
		id: 4,
		title: "Presidential suite",
		image: "/images/room4.jpg",
	},
	{
		id: 5,
		title: "Fine dining restaurant",
		image: "/images/restaurant.jpg",
	},
	{
		id: 6,
		title: "Beachfront pool",
		image: "/images/pool.jpg",
	},
];

/**
 * PitchCarousel component that displays a carousel of room options.
 * @returns {JSX.Element} The rendered PitchCarousel component.
 */
const PitchCarousel = () => {
	return (
		<section className="flex w-full flex-wrap items-center justify-center">
			{PITCH.map((item) => (
				<div key={item.id} className="group relative m-4 flex h-[400px] w-[250px] min-w-[250px]">
					<Image className="rounded-lg" src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
					<div className="absolute bottom-0 z-10 my-2 w-full bg-black/50 py-2 text-center font-bold text-white opacity-100 transition-opacity duration-300 ease-in-out group-hover:opacity-0">
						<h2 className="translate-y-0 transform transition-transform duration-300 ease-in-out group-hover:translate-y-2">{item.title}</h2>
					</div>
				</div>
			))}
		</section>
	);
};

export default PitchCarousel;
