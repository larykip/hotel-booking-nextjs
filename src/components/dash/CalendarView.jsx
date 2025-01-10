import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from '../ui/button'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'

const CalendarView = ({ bookings, roomTypes }) => {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">Calendar</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-4 w-4"/>
          </Button>
          <span className="text-sm">December</span>
          <Button variant="ghost" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
      <div className="flex gap-2 mb-4">
          {roomTypes.map((type) => (
            <Button
              key={type.id}
              variant="outline"
              className="text-xs"
            >
              {type.name} ({type.count})
            </Button>
          ))}
        </div>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.date} className="flex items-center gap-4">
              <div className="w-16 text-sm">
                <div className="font-medium">{booking.date}</div>
                <div className="text-gray-500">{booking.day}</div>
              </div>
              {booking.available ? (
                <Button variant="outline" className="w-full justify-start text-green-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Available for booking
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  {booking.bookings.map((guest, i) => (
                    <Avatar key={i}>
                      <AvatarImage src={guest.avatar} />
                      <AvatarFallback>{guest.user[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default CalendarView