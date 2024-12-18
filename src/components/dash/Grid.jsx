import React from 'react'
import { StatCards } from './StatCards'
import ActivityGraph from './ActivityGraph'
import CalendarView from './CalendarView'
import ActivityFeed from './ActivityFeed'


async function fetchDashboardData() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    weather: {
      temperature: 22,
      condition: "Partly sunny"
    },
    stats: {
      reservations: {
        inHouse: 20,
        arrival: 14,
        departure: 27
      },
      occupancy: {
        vacant: 49,
        occupied: 34,
        notReady: 8
      },
      revenue: {
        last30Days: 1500,
        yesterday: 350
      }
    },
    bookingGraph: {
      data: [
        { date: '01-Mar', value: 40 },
        { date: '02-Mar', value: 30 },
        { date: '03-Mar', value: 20 },
        { date: '04-Mar', value: 50 },
        { date: '05-Mar', value: 40 },
        { date: '06-Mar', value: 25 },
        { date: '07-Mar', value: 45 },
      ]
    },
    activities: [
      {
        user: "Faruk ahmad",
        room: "Room #1420",
        date: "20/01/21 - 28/01/21",
        time: "1 min",
        avatar: "/placeholder.svg",
        type: "request",
        message: "requested for a coffee and water"
      },
      {
        user: "Yasin arafat",
        room: "Room #1430",
        date: "20/01/21 - 28/01/21",
        time: "9 min",
        avatar: "/placeholder.svg",
        type: "cleaning",
        message: "entered room for cleaning"
      },
      {
        user: "Jamal hossain",
        room: "Room #1422",
        date: "20/01/21 - 28/01/21",
        time: "21 min",
        avatar: "/placeholder.svg",
        type: "review",
        message: "provided a negative review",
        actions: ["Show empathy", "Call"]
      },
    ],
    calendar: {
      bookings: [
        {
          date: "13",
          day: "Wed",
          bookings: [
            {
              user: "Yasin arafat",
              avatar: "/placeholder.svg",
            }
          ]
        },
        {
          date: "14",
          day: "Thu",
          bookings: [
            {
              user: "Yasin arafat",
              avatar: "/placeholder.svg",
            }
          ]
        },
        {
          date: "15",
          day: "Fri",
          bookings: [
            {
              user: "Faruk ahmad",
              avatar: "/placeholder.svg",
            }
          ]
        },
        {
          date: "16",
          day: "Sat",
          available: true
        },
        {
          date: "17",
          day: "Sun",
          available: true
        },
      ],
      roomTypes: [
        { name: "1 Bed", count: "9", id: "1bed" },
        { name: "2 Beds", count: "12", id: "2beds" },
        { name: "3 Beds", count: "15", id: "3beds" },
      ]
    }
  };
}

const Grid = async() => {
  const dashboardData = await fetchDashboardData();

  // Calculate percentages for the divs
  const totalRooms = dashboardData.stats.occupancy.vacant + dashboardData.stats.occupancy.occupied + dashboardData.stats.occupancy.notReady;
  const vacantPercentage = (dashboardData.stats.occupancy.vacant / totalRooms) * 100;
  const occupiedPercentage = (dashboardData.stats.occupancy.occupied / totalRooms) * 100;
  const notReadyPercentage = (dashboardData.stats.occupancy.notReady / totalRooms) * 100;

  return (
    <div className='grid grid-cols-12 gap-3 py-3'>
        <div className='col-span-8 space-y-3'>
            <ActivityGraph/>
            <ActivityFeed activities={dashboardData.activities}/>
        </div>
        <div className='col-span-4 bg-white rounded-lg border'>
            <CalendarView bookings={dashboardData.calendar.bookings} roomTypes={dashboardData.calendar.roomTypes} />
        </div>
    </div>
  )
}

export default Grid