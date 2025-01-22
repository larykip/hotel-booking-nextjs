"use client";

import { useState } from "react";
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
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
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState({
        from: new Date(),
        to: new Date(),
    });
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        adults: 1,
        children: 0,
        specialRequests: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Helper fn to determine button state
    const getButtonState = () => {
        switch (room?.status) {
            case "AVAILABLE":
                return { text: "Book Now", variant: "default", onClick: () => handleBookNow() };
            case "BOOKED":
                return { text: "Check-in", variant: "default", onClick: () => handleCheckIn() };
            case "OCCUPIED":
                return { text: "Check-out", variant: "default", onClick: () => handleCheckOut() };
            default:
                return { text: "Not Available", variant: "secondary", onClick: () => {} };
        }
    }

    const validateDates = (checkIn, checkOut) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (checkIn < today) {
            throw new Error("Check-in date cannot be in the past");
        }
        if (checkOut <= checkIn) {
            throw new Error("Check-out date must be after check-in date");
        }
        
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        if (nights < 1) {
            throw new Error("Minimum stay is 1 night");
        }
    };

    const handleBookNow = async () => {
        if (!user) {
            toast.error("Please login to book a room");
            return;
        }

        if (!formData.firstName || !formData.lastName) {
            toast.error("Please enter guest details");
            return;
        }

        if (!date.from || !date.to) {
            toast.error("Please select check-in and check-out dates");
            return;
        }

        try {
            setIsLoading(true);
            validateDates(date.from, date.to);

            // Debug log
            console.log('Attempting to book room:', {
                roomId: room._id,
                roomNumber: room.roomNumber,
                status: room.status,
                dates: { from: date.from, to: date.to }
            });

            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    roomId: room._id,
                    customerId: user._id,
                    checkInDate: date.from,
                    checkOutDate: date.to,
                    totalCost: room.price * Math.ceil((date.to - date.from) / (1000 * 60 * 60 * 24)),
                    guestDetails: {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        adults: parseInt(formData.adults),
                        children: parseInt(formData.children),
                        specialRequests: formData.specialRequests
                    }
                })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Failed to create booking');
            }

            toast.success(data.message || "Room booked successfully");
            onClose();
            window.location.reload();
        } catch (error) {
            toast.error(error.message);
            console.error("Booking error details:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCheckIn = async () => {
        if (!user) {
            toast.error("Please login to perform this action");
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(`/api/rooms/${room._id}/checkin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    actualCheckIn: new Date(),
                })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error);

            toast.success("Check-in successful");
            onClose();
            window.location.reload();
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCheckOut = async () => {
        if (!user) {
            toast.error("Please login to perform this action");
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(`/api/rooms/${room._id}/checkout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    actualCheckOut: new Date(),
                })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error);

            toast.success("Check-out successful");
            onClose();
            window.location.reload();
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const buttonState = getButtonState();
  
    return (
    <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="sm:w-[90%] sm:max-w-[1000px] overflow-y-auto">
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
                <ScrollArea className='h-[calc(100vh-300px)] my-4 p-4 rounded-lg border border-stone-200'>
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
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="grid gap-2">
                                        <Label>Nights</Label>
                                        <Input type='number' defaultValue='1'/>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Adults</Label>
                                        <Input 
                                            name="adults"
                                            value={formData.adults}
                                            onChange={handleInputChange}
                                            type='number'
                                            defaultValue='2'
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Children</Label>
                                        <Input 
                                            name="children"
                                            value={formData.children}
                                            onChange={handleInputChange}
                                            type='number'
                                            defaultValue='0'
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label>First Name</Label>
                                        <Input 
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Last Name</Label>
                                        <Input 
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <div className="font-medium">Days of stay</div>
                                    <div className="overflow-x-auto">
                                        <Calendar
                                            mode='range'
                                            selected={date}
                                            onSelect={setDate}
                                            numberOfMonths={2}
                                            className='flex flex-col sm:flex-row rounded-lg border p-4'
                                            classNames={{
                                                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                                                head_cell: "w-9 font-normal text-xs",
                                                cell: "h-9 w-9 text-center text-sm p-0 relative hover:bg-stone-100 rounded-md",
                                                day: "h-9 w-9 p-0 font-normal",
                                            }}
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
                                name="specialRequests"
                                value={formData.specialRequests}
                                onChange={handleInputChange}
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

export default BookingSheet;