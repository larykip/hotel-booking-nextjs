"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { ScrollArea } from "../ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { BedDouble, CreditCard, Hotel, Users } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { format } from "date-fns";

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
                    <TabsContent value='general' className='px-4 space-y-4'>
                        {room?.customer ? (
                            <div className="space-y-4">
                                <div className="font-semibold">
                                    <div className="flex items-center justify-between gap-2 p-2 border rounded-lg">
                                        <div className="px-5 gap-2">
                                            <p className="text-gray-500">Days of stay</p>
                                            <p>{format(new Date(room.customer.checkIn), 'MMM d, yyyy')} - {format(new Date(room.customer.checkOut), 'MMM d, yyyy')}</p>
                                        </div>
                                        <div className="px-5 gap-2 border-l border-stone-200">
                                            <p className="text-gray-500">Night</p>
                                            <p>#</p>
                                        </div>
                                        <div className="px-5 gap-2 border-l border-stone-200">
                                            <p className="text-gray-500">Adults</p>
                                            <p>#</p>
                                        </div>
                                        <div className="px-5  gap-2 border-l border-stone-200">
                                            <p className="text-gray-500">Children</p>
                                            <p>#</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex gap-4">
                                        <p>Guest name</p>
                                        <p className="font-semibold">{room.customer.name}</p>
                                    </div>
                                    
                                    {/* Add more customer details as needed */}
                                </div>
                            </div>                     
                        ) : (
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
                        )}
                        
                        
                    </TabsContent>
                    {/* - - - tabs 1 (general) end - - - - - - - - - - - - - - - - - - - - -  */}
                    
                    {/* - - - tabs 2 (order) start - - - - - - - - - - - - - - - - - - - - -  */}
                    <TabsContent value='order' className='px-4 space-y-4'>
                        <div className="space-y-4">
                            <div className="font-medium">Order Details</div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Item</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Total</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    <TableRow>
                                        <TableCell>Room {room?.number} ({room?.type || "Standard"})</TableCell>
                                        <TableCell>1 night</TableCell>
                                        <TableCell>KES {room?.price}</TableCell>
                                        <TableCell>KES {room?.price}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Extra Bed</TableCell>
                                        <TableCell>1</TableCell>
                                        <TableCell>KES 500</TableCell>
                                        <TableCell>KES 500</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Breakfast</TableCell>
                                        <TableCell>2</TableCell>
                                        <TableCell>KES 250</TableCell>
                                        <TableCell>KES 500</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                            {/* TODO: Replace this with table footer above. Also use array map for the table data */}
                            <div className="flex justify-between items-center font-medium">
                                <span>Total</span>
                                <span>KES {room?.price}</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="font-medium">Special Requests</div>
                            <textarea
                                className="w-full h-24 p-2 border rounded-md focus:outline focus:outline-black"
                                placeholder="Enter any special requests or notes here..."
                            ></textarea>
                        </div>
                    </TabsContent>
                    {/* - - - tabs 2 (order) end - - - - - - - - - - - - - - - - - - - - -  */}

                    {/* - - - tabs 3 (payment) start - - - - - - - - - - - - - - - - - - - - -  */}
                    <TabsContent value='payment' className='px-4 space-y-4'>
                        <div className="space-y-4">
                            <div className="font-medium">Payment Details</div>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label>Cardholder Name</Label>
                                    <Input />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Card Number</Label>
                                    <div className="relative">
                                        <Input />
                                        <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label>Expiry Date</Label>
                                        <Input placeholder='MM/YY'/>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>CVV</Label>
                                        <Input type="password" maxLength={3} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="font-medium">Billing Address</div>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label>Address</Label>
                                    <Input />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label>City</Label>
                                        <Input />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Postal Code</Label>
                                        <Input />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    {/* TODO: This should be a Select component */}
                                    <Label>Country</Label>
                                    <Input />
                                </div>
                            </div>
                        </div>
                    </TabsContent>
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
        case "BOOKED":
            return "bg-purple-500";
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