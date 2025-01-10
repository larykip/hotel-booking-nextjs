import { Search } from "lucide-react"
import { Button } from "../ui/button"
import { DatePickerWithRange } from "./DatePickerWithRange"
import GuestPicker from "./GuestPicker"


const SearchWidget = () => {
  return (
    <section className="flex flex-col md:flex-row p-2 md:p-0 my-5 justify-center gap-2 md:gap-6 items-center w-full sm:h-full md:h-[80px]">
        {/* Date range picker */}
        <div className="flex flex-col md:flex-row items-center gap-2">
            <h2>Select dates for your stay</h2>
            <DatePickerWithRange />
        </div>

        {/* Guest Picker */}
        <div>
            <GuestPicker/>
        </div>

        {/* Search Button */}
        <div>
            <Button>
                <Search className="h-4 w-4 mr-2" />
                Search
            </Button>
        </div>
    </section>
  )
}

export default SearchWidget