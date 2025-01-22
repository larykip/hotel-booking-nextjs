"use client";

import { Command } from 'cmdk';
import { useEffect, useState } from 'react';
import { Bed, FileText, Mail, MessageCircle, Plus, SearchIcon, Settings, Users } from 'lucide-react';
import Link from 'next/link';

/**
 * Search component that provides a search functionality within the sidebar.
 * @returns {JSX.Element} The rendered Search component.
 */
const Search = () => {
    const [open, setOpen] = useState(false);

  return (
    <>
        <div className='bg-stone-200 mb-4 relative rounded-md flex items-center px-2 py-1.5 text-sm'>
          <SearchIcon className='mr-2'/>
          {/* TODO: Consider removing the input and keeping only the search icon as a button */}
          <input
            onFocus={(e) => {
              e.target.blur();
              setOpen(true);
            }}
            type='text'
            placeholder='Search'
            className='w-full bg-transparent placeholder:text-stone-400 focus:outline-none'
          />

          <span className='p-1 text-xs flex gap-0.5 items-center shadow bg-stone-50 rounded-md whitespace-nowrap absolute right-1.5 top-1/2 -translate-y-1/2'>
            CTRL K
          </span>
        </div>

        <CommandMenu open={open} setOpen={setOpen}/>
    </>
  )
};

const CommandMenu = ({open, setOpen}) => {
  const [value, setvalue] = useState("")

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Global Command Menu"
      className='fixed inset-0 bg-stone-950/50 z-50'
      onClick={() => setOpen(false)}
    >
      <div onClick={(e) => e.stopPropagation()}
          className='bg-white rounded-lg shadow-xl border border-stone-300 overflow-hidden w-full max-w-lg mx-auto mt-12'
      >
        <Command.Input
          value={value}
          onValueChange={setvalue}
          placeholder='What do you need?' 
          className='relative border-b border-stone-300 p-3 text-lg w-full placeholder:text-stone-400 focus:outline-none'
        />
        <Command.List className='p-3'>
          <Command.Empty>
            No results found for{" "}
            <span className='text-gray-500'>"{value}"</span>
          </Command.Empty>
          {/* TODO: The groupings & items below are subject to change with app functionality and user permissions */}
          {/* Rooms group */}
          <Command.Group heading="Rooms and Bookings" className='text-sm mb-3 text-stone-400'>
            <Link href='/dashboard/rooms/new' passHref>
              <Command.Item
                className='flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded-md items-center gap-2'
                onSelect={() => setOpen(false)}
              >
                <Plus/> New Reservation...
              </Command.Item>
            </Link>
            <Link href='/dashboard/rooms' passHref>
              <Command.Item
                className='flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded-md items-center gap-2'
                onSelect={() => setOpen(false)}
              >
                <Bed /> Manage Rooms...
              </Command.Item>
            </Link>
          </Command.Group>

          {/* Users group */}
          <Command.Group heading="Users" className='text-sm mb-3 text-stone-400'>
            <Link href='/dashboard/users' passHref>
              <Command.Item
                className='flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded-md items-center gap-2'
                onSelect={() => setOpen(false)}
              >
                <Users/> Manage Users
              </Command.Item>
            </Link>
          </Command.Group>

          {/* Settings group */}
          <Command.Group heading="Settings" className='text-sm mb-3 text-stone-400'>
            <Link href='/dashboard/settings' passHref>
              <Command.Item
                className='flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded-md items-center gap-2'
                onSelect={() => setOpen(false)}
              >
                <Settings /> Update username...
              </Command.Item>
            </Link>
            <Link href='/dashboard/settings' passHref>
              <Command.Item
                className='flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded-md items-center gap-2'
                onSelect={() => setOpen(false)}
              >
                <Settings /> Update email & password...
              </Command.Item>
            </Link>
            <Link href='/dashboard/settings' passHref>
              <Command.Item
                className='flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded-md items-center gap-2'
                onSelect={() => setOpen(false)}
              >
                <Settings /> Update avatar...
              </Command.Item>
            </Link>
          </Command.Group>

          {/* Help group */}
          <Command.Group heading="Help" className='text-sm mb-3 text-stone-400'>
            <Link href='/dashboard/help' passHref>
              <Command.Item
                className='flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded-md items-center gap-2'
                onSelect={() => setOpen(false)}
              >
                <Mail /> Contact Support...
              </Command.Item>
            </Link>
            <Link href='/docs' passHref>
              <Command.Item
                className='flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded-md items-center gap-2'
                onSelect={() => setOpen(false)}
              >
                <FileText /> Search docs...
              </Command.Item>
            </Link>
            <Link href='/feedback' passHref>
              <Command.Item
                className='flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded-md items-center gap-2'
                onSelect={() => setOpen(false)}
              >
                <MessageCircle /> Send Feedback...
              </Command.Item>
            </Link>
          </Command.Group>

          
        </Command.List>
      </div>
    </Command.Dialog>
  )
};

export default Search;
