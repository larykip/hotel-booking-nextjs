"use client";

import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { Bed, FileText, Mail, MessageCircle, Plus, SearchIcon, Settings, Users } from "lucide-react";
import Link from "next/link";

/**
 * Search component that provides a search functionality within the sidebar.
 * @returns {JSX.Element} The rendered Search component.
 */
const Search = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			{/* Full search bar, hidden in collapsed mode */}
			<div className="group-data-[collapsible=icon]:hidden">
				<div className="relative mb-4 flex items-center rounded-md bg-stone-200 px-2 py-1.5 text-sm">
					<SearchIcon className="mr-2" />
					<input
						onFocus={(e) => {
							e.target.blur();
							setOpen(true);
						}}
						type="text"
						placeholder="Search"
						className="w-full bg-transparent placeholder:text-stone-400 focus:outline-none"
					/>

					<span className="absolute right-1.5 top-1/2 flex -translate-y-1/2 items-center gap-0.5 whitespace-nowrap rounded-md bg-stone-50 p-1 text-xs shadow">
						CTRL K
					</span>
				</div>
			</div>

			{/* Display only search icon in collapsed mode */}
			<button className="hidden items-center p-2 group-data-[collapsible=icon]:flex" onClick={() => setOpen(true)}>
				<SearchIcon />
			</button>

			<CommandMenu open={open} setOpen={setOpen} />
		</>
	);
};

const CommandMenu = ({ open, setOpen }) => {
	const [value, setvalue] = useState("");

	// Toggle the menu when ⌘K is pressed
	useEffect(() => {
		const down = (e) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, [setOpen]);

	return (
		<Command.Dialog open={open} onOpenChange={setOpen} label="Global Command Menu" className="fixed inset-0 z-50 bg-stone-950/50" onClick={() => setOpen(false)}>
			<div onClick={(e) => e.stopPropagation()} className="mx-auto mt-12 w-full max-w-lg overflow-hidden rounded-lg border border-stone-300 bg-white shadow-xl">
				<Command.Input
					value={value}
					onValueChange={setvalue}
					placeholder="What do you need?"
					className="relative w-full border-b border-stone-300 p-3 text-lg placeholder:text-stone-400 focus:outline-none"
				/>
				<Command.List className="p-3">
					<Command.Empty>
						No results found for <span className="text-gray-500">"{value}"</span>
					</Command.Empty>
					{/* TODO: The groupings & items below are subject to change with app functionality and user permissions */}
					{/* Rooms group */}
					<Command.Group heading="Rooms and Bookings" className="mb-3 text-sm text-stone-400">
						<Link href="/dashboard/rooms/new" passHref>
							<Command.Item
								className="flex cursor-pointer items-center gap-2 rounded-md p-2 text-sm text-stone-950 transition-colors hover:bg-stone-200"
								onSelect={() => setOpen(false)}
							>
								<Plus /> New Reservation...
							</Command.Item>
						</Link>
						<Link href="/dashboard/rooms" passHref>
							<Command.Item
								className="flex cursor-pointer items-center gap-2 rounded-md p-2 text-sm text-stone-950 transition-colors hover:bg-stone-200"
								onSelect={() => setOpen(false)}
							>
								<Bed /> Manage Rooms...
							</Command.Item>
						</Link>
					</Command.Group>

					{/* Users group */}
					<Command.Group heading="Users" className="mb-3 text-sm text-stone-400">
						<Link href="/dashboard/users" passHref>
							<Command.Item
								className="flex cursor-pointer items-center gap-2 rounded-md p-2 text-sm text-stone-950 transition-colors hover:bg-stone-200"
								onSelect={() => setOpen(false)}
							>
								<Users /> Manage Users
							</Command.Item>
						</Link>
					</Command.Group>

					{/* Settings group */}
					<Command.Group heading="Settings" className="mb-3 text-sm text-stone-400">
						<Link href="/dashboard/settings" passHref>
							<Command.Item
								className="flex cursor-pointer items-center gap-2 rounded-md p-2 text-sm text-stone-950 transition-colors hover:bg-stone-200"
								onSelect={() => setOpen(false)}
							>
								<Settings /> Update username...
							</Command.Item>
						</Link>
						<Link href="/dashboard/settings" passHref>
							<Command.Item
								className="flex cursor-pointer items-center gap-2 rounded-md p-2 text-sm text-stone-950 transition-colors hover:bg-stone-200"
								onSelect={() => setOpen(false)}
							>
								<Settings /> Update email & password...
							</Command.Item>
						</Link>
						<Link href="/dashboard/settings" passHref>
							<Command.Item
								className="flex cursor-pointer items-center gap-2 rounded-md p-2 text-sm text-stone-950 transition-colors hover:bg-stone-200"
								onSelect={() => setOpen(false)}
							>
								<Settings /> Update avatar...
							</Command.Item>
						</Link>
					</Command.Group>

					{/* Help group */}
					<Command.Group heading="Help" className="mb-3 text-sm text-stone-400">
						<Link href="/dashboard/help" passHref>
							<Command.Item
								className="flex cursor-pointer items-center gap-2 rounded-md p-2 text-sm text-stone-950 transition-colors hover:bg-stone-200"
								onSelect={() => setOpen(false)}
							>
								<Mail /> Contact Support...
							</Command.Item>
						</Link>
						<Link href="/docs" passHref>
							<Command.Item
								className="flex cursor-pointer items-center gap-2 rounded-md p-2 text-sm text-stone-950 transition-colors hover:bg-stone-200"
								onSelect={() => setOpen(false)}
							>
								<FileText /> Search docs...
							</Command.Item>
						</Link>
						<Link href="/feedback" passHref>
							<Command.Item
								className="flex cursor-pointer items-center gap-2 rounded-md p-2 text-sm text-stone-950 transition-colors hover:bg-stone-200"
								onSelect={() => setOpen(false)}
							>
								<MessageCircle /> Send Feedback...
							</Command.Item>
						</Link>
					</Command.Group>
				</Command.List>
			</div>
		</Command.Dialog>
	);
};

export default Search;
