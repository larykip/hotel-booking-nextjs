"use client";

import { useEffect, useState } from 'react';
import { SidebarTrigger } from '../ui/sidebar'
import { Button } from '../ui/button'
import { Bell, ChevronDown, LogOut, PencilLine, Sun, Moon, Cloud, CloudRain, CloudSnow, CloudLightning, CloudSun, CloudMoon } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth';
import { fetchWeather } from '@/lib/weather';
import { getGreeting } from '@/utils/greeting';

const getWeatherIcon = (condition) => {
  const iconMap = {
    'clear': Sun,
    'cloudy': Cloud,
    'partly-cloudy': CloudSun,
    'rain': CloudRain,
    'snow': CloudSnow,
    'thunderstorm': CloudLightning,
    'fog': Cloud
  };

  const IconComponent = iconMap[condition] || Sun;
  return <IconComponent className="w-5 h-5" />;
};

const DashHeader = () => {
  const { user, handleLogout, loading } = useAuth();
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  useEffect(() => {
    const getWeather = async () => {
      const data = await fetchWeather();
      setWeather(data);
      setWeatherLoading(false);
    };

    getWeather();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center w-full h-16">Loading...</div>;
  }

  return (
    <header className='flex'>
        <div className='flex items-center justify-between px-2 py-4 w-full' >
            <div className='flex items-center gap-4'>
                <SidebarTrigger/> {/* Opens/Closes the sidebar */}
                <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            
            <div className='flex items-center gap-4'> 
                <div className='flex items-center gap-2 text-sm'>
                    <span>{getGreeting()},</span>
                    <span className='font-bold'>{user?.firstName || 'User'}!</span>
                </div>
                {/* TODO: Could also be changed to a date instead */}
                <div className='flex items-center gap-2 text-sm'>
                    {weatherLoading ? (
                      <span>Loading weather...</span>
                    ) : weather && (
                      <>
                        {getWeatherIcon(weather.icon)}
                        <span>{weather.temperature}°C</span>
                        <span className='font-bold'>{weather.condition}</span>
                      </>
                    )}
                </div>

                <Button className="gap-2">
                    <PencilLine className="w-4 h-4"/>
                    New Reservation
                </Button>

                <Button variant="ghost" size="icon">
                    <Bell className="w-5 h-5"/>
                </Button>

                {/* Account dropdown menu start here */}
                <DropdownMenu>
                    {/* Dropdown menu button */}
                    <DropdownMenuTrigger asChild className="rounded-full hover:cursor-pointer border-black">
                        <div className='flex items-center gap-1'>
                            <Image
                                width={40}
                                height={40}
                                // fetch random avatar if user has no avatar
                                src={user?.avatar || `https://api.dicebear.com/9.x/glass/svg?seed=${Math.random().toString(36).substring(7)}`}
                                alt="avatar"
                                unoptimized={true}
                                className="rounded-full"
                            />
                            <ChevronDown/>
                        </div>
                                
                    </DropdownMenuTrigger>
                    
                    {/* Menu Starts here */}
                    <DropdownMenuContent className="w-56 mr-5">
                        <DropdownMenuLabel>{user?.firstName || ''} {user?.lastName || ''}</DropdownMenuLabel>
                        
                        {/* Sign out button */}
                        <DropdownMenuItem>
                            <button onClick={handleLogout} className="flex items-center gap-2 w-full text-left"> <LogOut className="h-4 w-4" />Sign out</button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    {/* Menu Ends here */}
                
                </DropdownMenu>

                {/* Account dropdown menu ends here */}
            </div>
        </div>
    </header>
  )
}

export default DashHeader