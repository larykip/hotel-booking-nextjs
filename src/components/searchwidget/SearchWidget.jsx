import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { DatePickerWithRange } from "./DatePickerWithRange";
import GuestPicker from "./GuestPicker";

/**
 * SearchWidget component that provides a search interface for booking.
 * @returns {JSX.Element} The rendered SearchWidget component.
 */
const SearchWidget = () => {
	return (
		<section className="my-5 flex w-full flex-col items-center justify-center gap-2 p-2 sm:h-full md:h-[80px] md:flex-row md:gap-6 md:p-0">
			{/* Date range picker */}
			<div className="flex flex-col items-center gap-2 md:flex-row">
				<h2>Select dates for your stay</h2>
				<DatePickerWithRange />
			</div>

			{/* Guest Picker */}
			<div>
				<GuestPicker />
			</div>

			{/* Search Button */}
			<div>
				<Button>
					<Search className="mr-2 h-4 w-4" />
					Search
				</Button>
			</div>
		</section>
	);
};

export default SearchWidget;
