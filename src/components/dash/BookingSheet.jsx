"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { ScrollArea } from "../ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { BedDouble, Hotel, Users } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const BookingSheet = ({ room, isOpen, onClose }) => {
    const [date, setDate] = useState({
        from: new Date(),
        to: new Date(),
    })

    // Helper fn to determine button state
    const getButtonState = () => {
        switch (room?.status) {
            case "AVAILABLE":
                return { text: "Book Now", variant: "default", onClick: handleBookNow };
            case "BOOKED":
                return { text: "Check-in", variant: "default", onClick: handleCheckIn };
            case "OCCUPIED":
                return { text: "Check-out", variant: "default", onClick: handleCheckOut };
            default:
                return { text: "Not Available", variant: "secondary", onClick: () => {} };
        }
    }

    const buttonState = getButtonState();
  
    return (
    <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="sm:w-[90%] sm:max-w-[1000px]">
            {/* - - - header section start - - - - - - - - - - - - - - - - - - - - -  */}
            <SheetHeader className='space-y-4 pb-4 border-b'>
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-sm text-muted-foreground">{room?.type || "Standard"}</div>
                        <SheetTitle>Room {room?.number}</SheetTitle>
                    </div>
                    <div className="flex gap-2">
                        <Badge className={`${getStatusColor(room?.status)} bg-opacity-90 hover:${getStatusColor(room?.status)}`}>
                          {room?.status}
                        </Badge>
                    </div>
                </div>

                <div className="flex gap-8">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <BedDouble className="w-5 h-5 text-blue-500"/>
                        </div>
                        <div>
                            <div className="text-sm text-muted-foreground">Type</div>
                            <div>{room?.type || "Standard Room"}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <Users className="w-5 h-5 text-blue-500"/>
                        </div>
                        <div>
                            <div className="text-sm text-muted-foreground">People</div>
                            <div>{room?.guests} Guests</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <Hotel className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                            <div className="text-sm text-muted-foreground">Floor</div>
                            <div>{room?.floor}</div>
                        </div>
                    </div>
                </div>
            </SheetHeader>
            {/* - - - header section end - - - - - - - - - - - - - - - - - - - - -  */}

            {/* - - - tabs section start - - - - - - - - - - - - - - - - - - - - -  */}
            <Tabs defaultValue="general" className="mt-4">
                <TabsList className='grid w-full grid-cols-3 bg-stone-200'>
                    <TabsTrigger value='general'>General</TabsTrigger>
                    <TabsTrigger value='order'>Order</TabsTrigger>
                    <TabsTrigger value='payment'>Payment</TabsTrigger>
                </TabsList>

                {/* TODO: Scroll area doesn't work as intended when viewable height is much smaller than the specified height */}
                <ScrollArea className='h-[600px] my-4 p-4 rounded-lg border border-stone-200'>
                    {/* - - - tabs 1 (general) start - - - - - - - - - - - - - - - - - - - - -  */}
                    <TabsContent value='general' className='space-y-4'>
                        <div className="grid gap-4">                            
                            <div className="grid grid-cols-3 gap-4">
                                <div className="grid gap-2">
                                    <Label>Nights</Label>
                                    <Input type='number' defaultValue='1'/>
                                </div>
                                <div className="grid gap-2">
                                    <Label>Adults</Label>
                                    <Input type='number' defaultValue='2'/>
                                </div>
                                <div className="grid gap-2">
                                    <Label>Children</Label>
                                    <Input type='number' defaultValue='0'/>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label>First Name</Label>
                                    <Input />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Last Name</Label>
                                    <Input />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <div className="font-medium">Days of stay</div>
                                <div className="">
                                    <Calendar
                                        mode='range'
                                        selected={date}
                                        onSelect={setDate}
                                        numberOfMonths={2}
                                        className='flex rounded-lg border'
                                    />
                                </div>
                            </div>

                        </div>
                    </TabsContent>
                    {/* - - - tabs 1 (general) end - - - - - - - - - - - - - - - - - - - - -  */}

                    {/* - - - tabs 2 (order) start - - - - - - - - - - - - - - - - - - - - -  */}

                    {/* - - - tabs 2 (order) end - - - - - - - - - - - - - - - - - - - - -  */}

                    {/* - - - tabs 3 (payment) start - - - - - - - - - - - - - - - - - - - - -  */}

                    {/* - - - tabs 3 (payment) end - - - - - - - - - - - - - - - - - - - - -  */}

                </ScrollArea>

            </Tabs>

            {/* - - - tabs section end - - - - - - - - - - - - - - - - - - - - -  */}

            {/* - - - footer section start - - - - - - - - - - - - - - - - - - - - -  */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-sm text-muted-foreground">Total Amount</div>
                        <div className="text-2xl font-semibold">KES {room?.price}</div>
                        {room?.status === 'OCCUPIED' && <Badge variant='outline' className='mt-1'>Paid</Badge>}
                    </div>

                    <div className="flex gap-2">
                        {room?.status !== 'AVAILABLE' && (
                            <Button variant='outline' className='text-red-500'>
                                Cancel reservation
                            </Button>
                        )}

                        <Button 
                            className={buttonState.variant === "default" ? "bg-teal-500 hover:bg-teal-600" : ""}
                            variant={buttonState.variant}
                            onClick={buttonState.onClick}
                        >
                            {buttonState.text}
                        </Button>
                    </div>
                </div>
            </div>
            {/* - - - footer section end - - - - - - - - - - - - - - - - - - - - -  */}
        </SheetContent>
    </Sheet>
  )
}

function getStatusColor(status) {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-500";
      case "OCCUPIED":
        return "bg-red-500";
      case "MAINTENANCE":
        return "bg-yellow-500";
      case "CLEANING":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
}

// Placeholder functions for booking actions
const handleBookNow = () => {
// Implement booking logic
    console.log("Booking room", room.number);
}

const handleCheckIn = () => {
// Implement check-in logic
    console.log("Checking in room", room.number);
}

const handleCheckOut = () => {
// Implement check-out logic
    console.log("Checking out room", room.number);
}

export default BookingSheet;