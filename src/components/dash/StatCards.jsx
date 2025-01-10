import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import ActivityGraph from './ActivityGraph'
import { ArrowDownRight, ArrowUpRight, Dam, HousePlus, School } from 'lucide-react';
import { Button } from '../ui/button';

export const StatCards = ({ stats }) => {
  const totalRooms = stats.occupancy.vacant + stats.occupancy.occupied + stats.occupancy.notReady;
  const vacantPercentage = (stats.occupancy.vacant / totalRooms) * 100;
  const occupiedPercentage = (stats.occupancy.occupied / totalRooms) * 100;
  const notReadyPercentage = (stats.occupancy.notReady / totalRooms) * 100;

  return (
  <div className='grid grid-cols-3 gap-3'>
    <Card className='hover:bg-stone-200'>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Reservation</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-4">
        <div className='flex items-center gap-2'>
          <div>
            <HousePlus className="h-4 w-4 ml-1"/>
          </div>
          <div>
            <p className="text-sm text-gray-500">In house</p>
            <p className="text-2xl font-bold flex items-center">
              {stats.reservations.inHouse}
            </p>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <div>
          <ArrowUpRight className="h-4 w-4 ml-1 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Arrival</p>
            <p className="text-2xl font-bold flex items-center text-green-600">
              {stats.reservations.arrival}
            </p>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <div>
            <ArrowDownRight className="h-4 w-4 ml-1 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Arrival</p>
            <p className="text-2xl font-bold flex items-center text-red-600">
            {stats.reservations.departure}
          </p>
          </div>
        </div>
      </CardContent>
      <CardHeader>
        <CardTitle className="text-sm font-medium">House Keeping</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div className='flex items-center gap-2'>
          <div>
            <School className="h-4 w-4 ml-1" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Rented & dirty</p>
            <p className="text-2xl font-bold">18</p>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <div>
            <Dam className="h-4 w-4 ml-1" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Vacant & dirty</p>
            <p className="text-2xl font-bold">27</p>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card className='hover:bg-stone-200'>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Occupancy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Vacant</p>
            <p className="text-2xl font-bold">{stats.occupancy.vacant}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Occupied</p>
            <p className="text-2xl font-bold">{stats.occupancy.occupied}</p>
          </div>
          <div>
          <p className="text-sm text-gray-500">Not ready</p>
            <p className="text-2xl font-bold">{stats.occupancy.notReady}</p>
          </div>
          </div>
          <div className="flex h-24 w-full overflow-hidden mt-4">
            <div className="bg-green-800 rounded-lg" style={{ width: `${vacantPercentage}%` }} />
            <div className="bg-green-500 rounded-lg" style={{ width: `${occupiedPercentage}%` }} />
            <div className="bg-green-200 rounded-lg" style={{ width: `${notReadyPercentage}%` }} />
          </div>
        </CardContent>
      </Card>
      <Card className='hover:bg-stone-200'>
        <CardHeader className="flex">
          <CardTitle className="text-sm font-medium flex items-center justify-between">Revenue <Button className='text-gray-400' variant='link'>Details</Button></CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Last 30 days</p>
            <span className='flex text-2xl gap-2'>Ksh <p className="text-2xl font-bold">49</p></span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Yesterday</p>
            <span className='flex text-2xl gap-2'>Ksh <p className="text-2xl font-bold">49</p></span>
          </div>
        </CardContent>
      </Card>
  </div>
  )
}
