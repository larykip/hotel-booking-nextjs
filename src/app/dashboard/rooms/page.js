"use client";

import BookingSheet from '@/components/dash/rooms/BookingSheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, Check, HousePlus, Plus, SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getStatusColors } from '@/lib/roomStatusColors';

const RoomCard = ({ room, onBookNow }) => {
  const statusColors = getStatusColors(room.status, room.secondaryStatus);
  
  return (
    <div className={`border rounded-lg p-4 relative overflow-hidden ${statusColors.primary}/10`}>
      {/* Primary status indicator */}
      <div className={`absolute top-0 left-0 w-1 h-full ${statusColors.primary}`} />
      
      {/* Secondary status indicator */}
      {statusColors.secondary && (
        <div className={`absolute top-0 left-1 w-1 h-full ${statusColors.secondary} opacity-50`} />
      )}
      
      <div className='mb-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='font-semibold'>Room {room.roomNumber}</h3>
            <div className='text-sm text-gray-500'>
              {room.MaxGuests} Guests • {room.floorNumber}
            </div>
          </div>
          <Badge className={`${statusColors.primary} bg-opacity-90`}>
            {statusColors.text}
          </Badge>
        </div>
      </div>

      {/* Customer Display section */}
      <div className="flex justify-center mb-4 h-16">
        {room.status === "AVAILABLE" ? (
          <h2 className='flex flex-col items-center text-gray-400 font-semibold'>
            <HousePlus className='w-10 h-10' />
            Room Available
          </h2>
        ) : (
          room.guest && (
            <div className="flex flex-col justify-center text-center h-16 w-full">
              <p className="font-semibold">{room.guest.name}</p>
              {room.guest.checkIn && room.guest.checkOut && (
                <p className="text-sm text-gray-500">
                  {format(new Date(room.guest.checkIn), 'MMM d, yyyy')} - 
                  {format(new Date(room.guest.checkOut), 'MMM d, yyyy')}
                </p>
              )}
            </div>
          )
        )}
      </div>

      {/* Bottom section */}
      <div className='flex bottom-0 items-center justify-between border-t-2 border-stone-200'>
        <Button
          variant='link'
          className='text-teal-500 px-0'
          onClick={() => onBookNow(room)}
        >
          {room.status === "AVAILABLE" ? "Book now" : "View details"}
        </Button>
        <div className='flex items-center text-right gap-1'>
          <div className='text-sm text-gray-500'>KES</div>
          <div className='font-semibold'>{room.price}</div>
        </div>
      </div>
    </div>
  );
};

const RoomsPage = () => {
  const [date, setDate] = useState(new Date());
  const [status, setStatus] = useState("ALL");
  const [roomType, setRoomType] = useState("ALL");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [roomTypes, setRoomTypes] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('/api/rooms');
        if (!response.ok) {
          throw new Error('Failed to fetch rooms');
        }
        const data = await response.json();
        setRoomTypes(data);
        setFilteredRooms(data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    }
    fetchRooms()
  }, [])

  const handleBookNow = (room) => {
    // Transform the room data to match the expected format
    const transformedRoom = {
        _id: room.id,
        number: room.roomNumber,
        type: room.type,
        floor: room.floorNumber,
        price: room.price,
        status: room.status,
        secondaryStatus: room.secondaryStatus || 'NONE', // Add this line
        MaxGuests: room.MaxGuests,
        guest: room.guest,
        description: room.description,
        amenities: room.amenities
    };
    setSelectedRoom(transformedRoom);
    setIsBookingOpen(true);
  }

  const applyFilters = () => {
    const filtered = roomTypes.map(type => ({
      ...type,
      rooms: type.rooms.filter(room => {
        return (
          (status !== 'ALL' ? room.status === status : true) &&
          (roomType !== 'ALL' ? room.type === roomType : true)
        );
      })
    }));
    setFilteredRooms(filtered);
  };

  return (
    <section className='bg-stone-200 p-2 h-full'>
      <div className='bg-white rounded-lg w-full mx-auto p-8'>
        {/* - - - Title Bar Start - - - - - - - - - - - - - - - - - - - - -  */}
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-3xl font-bold'>Room booking</h1>
          <div className='flex items-center gap-4'>
            {/* Search bar */}
            <div className='rounded-md flex items-center px-2 py-1.5 text-sm bg-stone-200'>
              <SearchIcon className='mr-2'/>
              <input
                type='text'
                placeholder='Search Rooms'
                className='w-full bg-transparent placeholder:text-stone-400 focus:outline-none'
              />
            </div>
            {/* Add new room button */}
            <Button><Plus className='h-4 w-4'/> New Room</Button>
          </div>
        </div>
        {/* - - - Title Bar End - - - - - - - - - - - - - - - - - - - - -  */}

        {/* - - - Fitler bar start - - - - - - - - - - - - - - - - - - - - -  */}
        <div className='flex items-center gap-4 mb-8'>
          <div className='text-sm text-gray-500'>Filter by:</div>

          {/* --- Date filter start --- */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-[200px] justify-start text-left font-normal",)}
              >
                <CalendarIcon className='mr-2 h-4 w-4'/>
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>

            <PopoverContent className='w-auto p-0'>
              <Calendar
                mode='single'
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {/* --- Date filter end --- */}

          {/* --- Status filter start --- */}
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder='Status'/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='ALL'>All</SelectItem>
              <SelectItem value='AVAILABLE'>Available</SelectItem>
              <SelectItem value='OCCUPIED'>Occupied</SelectItem>
              <SelectItem value='MAINTENANCE'>Maintenance</SelectItem>
              <SelectItem value='CLEANING'>Cleaning</SelectItem>
            </SelectContent>
          </Select>
          {/* --- Status filter end --- */}

          {/* --- Room type filter start --- */}
          <Select value={roomType} onValueChange={setRoomType}>
            <SelectTrigger className='w-[200px]'>
              <SelectValue placeholder='Room type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='ALL'>All</SelectItem>
              {roomTypes.map((type) => (
                <SelectItem key={type.name} value={type.name}>{type.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* --- Room type filter end --- */}

          {/* --- Apply filter button --- */}
          <Button variant='outline' onClick={applyFilters}>
            <Check className='w-4 h-4'/> Apply filters
          </Button>

        </div>
        {/* - - - Fitler bar end - - - - - - - - - - - - - - - - - - - - -  */}

        {/* - - - Room Listing start - - - - - - - - - - - - - - - - - - - - -  */}
        <div className='space-y-8'>
          {filteredRooms.map((type) => (
            <div key={type.name}>
              <div className='flex items-center gap-2 mb-4'>
                <h2 className='text-lg font-semibold'>{type.name}</h2>
                <Badge variant='secondary' className='bg-gray-100'>
                  {type.rooms.filter(room => room.status === 'AVAILABLE').length} Available / {type.rooms.length} Total
                </Badge>
              </div>

              <div className='relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {type.rooms.map((room) => (
                  <RoomCard 
                    key={room.id} 
                    room={room} 
                    onBookNow={handleBookNow}
                  />
                ))}
              </div>

            </div>
          ))}
        </div>
        {/* - - - Room Listing end - - - - - - - - - - - - - - - - - - - - -  */}

        <BookingSheet
          room={selectedRoom}
          isOpen={isBookingOpen}
          onClose={() => {
            setIsBookingOpen(false);
            setSelectedRoom(null);
          }}
        />

      </div>
      
    </section>
  )
}

const roomTypes = [
  { name: "Standard Rooms", rooms: [
    { id: 101, number: "101", floor: "1st Floor", guests: 2, price: 2000, status: "AVAILABLE" },
    { id: 102, number: "102", floor: "1st Floor", guests: 2, price: 2000, status: "AVAILABLE" },
    { id: 103, number: "103", floor: "1st Floor", guests: 2, price: 2000, status: "OCCUPIED", customer: { name: "Kwame Osei", checkIn: "2024-05-15", checkOut: "2024-05-20" } },
    { id: 104, number: "104", floor: "1st Floor", guests: 2, price: 2000, status: "CLEANING" },
    { id: 105, number: "105", floor: "1st Floor", guests: 2, price: 2000, status: "OCCUPIED", customer: { name: "Amara Kimani", checkIn: "2024-05-14", checkOut: "2024-05-18" } },
    { id: 106, number: "106", floor: "1st Floor", guests: 2, price: 2000, status: "BOOKED", customer: { name: "Chibueze Adebayo", checkIn: "2024-05-25", checkOut: "2024-05-30" } }
  ]},
  { name: "Junior Suites", rooms: [
    { id: 110, number: "110", floor: "1st Floor", guests: 4, price: 1000, status: "AVAILABLE" },
    { id: 111, number: "111", floor: "1st Floor", guests: 4, price: 1000, status: "OCCUPIED", customer: { name: "Zainab Mwangi", checkIn: "2024-05-12", checkOut: "2024-05-22" } },
    { id: 112, number: "112", floor: "1st Floor", guests: 4, price: 1000, status: "CLEANING" },
    { id: 113, number: "113", floor: "1st Floor", guests: 4, price: 1000, status: "MAINTENANCE" },
    { id: 114, number: "114", floor: "1st Floor", guests: 4, price: 1000, status: "CLEANING" },
    { id: 115, number: "115", floor: "1st Floor", guests: 4, price: 1000, status: "BOOKED", customer: { name: "Olayinka Ndlovu", checkIn: "2024-05-28", checkOut: "2024-06-02" } }
  ]},
  { name: "Deluxe", rooms: [
    { id: 201, number: "201", floor: "2nd Floor", guests: 4, price: 5000, status: "CLEANING" },
    { id: 202, number: "202", floor: "2nd Floor", guests: 4, price: 5000, status: "OCCUPIED", customer: { name: "Aisha Okafor", checkIn: "2024-05-13", checkOut: "2024-05-20" } },
    { id: 203, number: "203", floor: "2nd Floor", guests: 4, price: 5000, status: "BOOKED", customer: { name: "Tendai Mutasa", checkIn: "2024-05-25", checkOut: "2024-05-30" } },
    { id: 204, number: "204", floor: "2nd Floor", guests: 4, price: 5000, status: "AVAILABLE" }
  ]},
  { name: "Executive Suites", rooms: [
    { id: 301, number: "301", floor: "3rd Floor", guests: 2, price: 10000, status: "AVAILABLE" },
    { id: 302, number: "302", floor: "3rd Floor", guests: 2, price: 10000, status: "OCCUPIED", customer: { name: "Babajide Oluwa", checkIn: "2024-05-14", checkOut: "2024-05-21" } },
    { id: 303, number: "303", floor: "3rd Floor", guests: 4, price: 12000, status: "AVAILABLE" },
    { id: 304, number: "304", floor: "3rd Floor", guests: 4, price: 12000, status: "MAINTENANCE" },
    { id: 305, number: "305", floor: "3rd Floor", guests: 2, price: 10000, status: "BOOKED", customer: { name: "Folami Okoro", checkIn: "2024-06-01", checkOut: "2024-06-06" } }
  ]},
  { name: "Presidential Suites", rooms: [
    { id: 401, number: "401", floor: "4th Floor", guests: 2, price: 200000, status: "AVAILABLE" },
    { id: 402, number: "402", floor: "4th Floor", guests: 4, price: 200000, status: "BOOKED", customer: { name: "Nnamdi Azikiwe", checkIn: "2024-06-10", checkOut: "2024-06-20" } }
  ]},
]


export default RoomsPage;
