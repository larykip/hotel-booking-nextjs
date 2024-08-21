import { Search } from "lucide-react"
import { Button } from "../ui/button"
import { DatePickerWithRange } from "./DatePickerWithRange"
import GuestPicker from "./GuestPicker"


const SearchWidget = () => {
  return (
    <section className="flex my-5 justify-center gap-6 items-center w-full h-[80px]">
        {/* Date range picker */}
        <div className="flex items-center gap-2">
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