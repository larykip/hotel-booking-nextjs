// Dummy data for the hotel booking system

export const weatherData = {
	temperature: 22,
	condition: "Partly sunny",
};

export const statsData = {
	reservations: {
		inHouse: 20,
		arrival: 14,
		departure: 27,
	},
	occupancy: {
		vacant: 49,
		occupied: 34,
		notReady: 8,
	},
	revenue: {
		last30Days: 150000,
		yesterday: 3500,
	},
	housekeeping: {
		rentedDirty: 14,
		vacantDirty: 27,
	},
};

export const bookingGraphData = [
	{
		name: "Mon",
		occupancyRate: 65,
		bookingsCount: 18,
		revenue: 42000,
	},
	{
		name: "Tue",
		occupancyRate: 72,
		bookingsCount: 22,
		revenue: 51000,
	},
	{
		name: "Wed",
		occupancyRate: 85,
		bookingsCount: 28,
		revenue: 68000,
	},
	{
		name: "Thu",
		occupancyRate: 78,
		bookingsCount: 25,
		revenue: 58000,
	},
	{
		name: "Fri",
		occupancyRate: 92,
		bookingsCount: 32,
		revenue: 82000,
	},
	{
		name: "Sat",
		occupancyRate: 95,
		bookingsCount: 35,
		revenue: 95000,
	},
	{
		name: "Sun",
		occupancyRate: 88,
		bookingsCount: 30,
		revenue: 75000,
	},
];

export const activityFeedData = [
	{
		id: 1,
		user: "Faruk Ahmad",
		room: "Room #1420",
		date: "20/01/21 - 28/01/21",
		time: "1 min ago",
		avatar: "/placeholder.svg",
		type: "request",
		message: "requested for a coffee and water",
	},
	{
		id: 2,
		user: "Yasin Arafat",
		room: "Room #1430",
		date: "20/01/21 - 28/01/21",
		time: "9 min ago",
		avatar: "/placeholder.svg",
		type: "cleaning",
		message: "entered room for cleaning",
	},
	{
		id: 3,
		user: "Jamal Hossain",
		room: "Room #1422",
		date: "20/01/21 - 28/01/21",
		time: "21 min ago",
		avatar: "/placeholder.svg",
		type: "review",
		message: "provided a negative review",
		actions: ["Show empathy", "Call"],
	},
];

export const calendarData = {
	bookings: [
		{
			date: "13",
			day: "Wed",
			bookings: [
				{
					user: "Yasin Arafat",
					avatar: `https://api.dicebear.com/9.x/notionists/svg?seed=${Math.random().toString(36).substring(7)}`,
				},
			],
		},
		{
			date: "14",
			day: "Thu",
			bookings: [
				{
					user: "Yasin Arafat",
					avatar: `https://api.dicebear.com/9.x/notionists/svg?seed=${Math.random().toString(36).substring(7)}`,
				},
			],
		},
		{
			date: "15",
			day: "Fri",
			bookings: [
				{
					user: "Faruk Ahmad",
					avatar: `https://api.dicebear.com/9.x/notionists/svg?seed=${Math.random().toString(36).substring(7)}`,
				},
			],
		},
		{
			date: "16",
			day: "Sat",
			available: true,
		},
		{
			date: "17",
			day: "Sun",
			available: true,
		},
	],
	roomTypes: [
		{ name: "1 Bed", count: "9", id: "1bed" },
		{ name: "2 Beds", count: "12", id: "2beds" },
		{ name: "3 Beds", count: "15", id: "3beds" },
	],
};

export const roomsData = [
	{
		name: "Standard Rooms",
		rooms: [
			{ id: 101, number: "101", floor: "1st Floor", guests: 2, price: 2000, status: "AVAILABLE" },
			{ id: 102, number: "102", floor: "1st Floor", guests: 2, price: 2000, status: "AVAILABLE" },
			{
				id: 103,
				number: "103",
				floor: "1st Floor",
				guests: 2,
				price: 2000,
				status: "OCCUPIED",
				customer: { name: "Kwame Osei", checkIn: "2024-05-15", checkOut: "2024-05-20" },
			},
			{ id: 104, number: "104", floor: "1st Floor", guests: 2, price: 2000, status: "CLEANING" },
			{
				id: 105,
				number: "105",
				floor: "1st Floor",
				guests: 2,
				price: 2000,
				status: "OCCUPIED",
				customer: { name: "Amara Kimani", checkIn: "2024-05-14", checkOut: "2024-05-18" },
			},
			{
				id: 106,
				number: "106",
				floor: "1st Floor",
				guests: 2,
				price: 2000,
				status: "BOOKED",
				customer: { name: "Chibueze Adebayo", checkIn: "2024-05-25", checkOut: "2024-05-30" },
			},
		],
	},
	{
		name: "Junior Suites",
		rooms: [
			{ id: 110, number: "110", floor: "1st Floor", guests: 4, price: 1000, status: "AVAILABLE" },
			{
				id: 111,
				number: "111",
				floor: "1st Floor",
				guests: 4,
				price: 1000,
				status: "OCCUPIED",
				customer: { name: "Zainab Mwangi", checkIn: "2024-05-12", checkOut: "2024-05-22" },
			},
			{ id: 112, number: "112", floor: "1st Floor", guests: 4, price: 1000, status: "CLEANING" },
			{ id: 113, number: "113", floor: "1st Floor", guests: 4, price: 1000, status: "MAINTENANCE" },
			{ id: 114, number: "114", floor: "1st Floor", guests: 4, price: 1000, status: "CLEANING" },
			{
				id: 115,
				number: "115",
				floor: "1st Floor",
				guests: 4,
				price: 1000,
				status: "BOOKED",
				customer: { name: "Olayinka Ndlovu", checkIn: "2024-05-28", checkOut: "2024-06-02" },
			},
		],
	},
	{
		name: "Deluxe",
		rooms: [
			{ id: 201, number: "201", floor: "2nd Floor", guests: 4, price: 5000, status: "CLEANING" },
			{
				id: 202,
				number: "202",
				floor: "2nd Floor",
				guests: 4,
				price: 5000,
				status: "OCCUPIED",
				customer: { name: "Aisha Okafor", checkIn: "2024-05-13", checkOut: "2024-05-20" },
			},
			{
				id: 203,
				number: "203",
				floor: "2nd Floor",
				guests: 4,
				price: 5000,
				status: "BOOKED",
				customer: { name: "Tendai Mutasa", checkIn: "2024-05-25", checkOut: "2024-05-30" },
			},
			{ id: 204, number: "204", floor: "2nd Floor", guests: 4, price: 5000, status: "AVAILABLE" },
		],
	},
	{
		name: "Executive Suites",
		rooms: [
			{ id: 301, number: "301", floor: "3rd Floor", guests: 2, price: 10000, status: "AVAILABLE" },
			{
				id: 302,
				number: "302",
				floor: "3rd Floor",
				guests: 2,
				price: 10000,
				status: "OCCUPIED",
				customer: { name: "Babajide Oluwa", checkIn: "2024-05-14", checkOut: "2024-05-21" },
			},
			{ id: 303, number: "303", floor: "3rd Floor", guests: 4, price: 12000, status: "AVAILABLE" },
			{ id: 304, number: "304", floor: "3rd Floor", guests: 4, price: 12000, status: "MAINTENANCE" },
			{
				id: 305,
				number: "305",
				floor: "3rd Floor",
				guests: 2,
				price: 10000,
				status: "BOOKED",
				customer: { name: "Folami Okoro", checkIn: "2024-06-01", checkOut: "2024-06-06" },
			},
		],
	},
	{
		name: "Presidential Suites",
		rooms: [
			{ id: 401, number: "401", floor: "4th Floor", guests: 2, price: 200000, status: "AVAILABLE" },
			{
				id: 402,
				number: "402",
				floor: "4th Floor",
				guests: 4,
				price: 200000,
				status: "BOOKED",
				customer: { name: "Nnamdi Azikiwe", checkIn: "2024-06-10", checkOut: "2024-06-20" },
			},
		],
	},
];

export const guestsData = [
	{
		id: 1,
		name: "John Doe",
		email: "john@example.com",
		avatar: "/avatars/01.png",
		room: "101",
		checkIn: "2023-07-01",
		checkOut: "2023-07-05",
		status: "Checked In",
		totalBill: 1200,
	},
	{
		id: 2,
		name: "Jane Smith",
		email: "jane@example.com",
		avatar: "/avatars/02.png",
		room: "202",
		checkIn: "2023-07-02",
		checkOut: "2023-07-07",
		status: "Reserved",
		totalBill: 1500,
	},
	{
		id: 3,
		name: "Bob Johnson",
		email: "bob@example.com",
		avatar: "/avatars/03.png",
		room: "303",
		checkIn: "2023-06-28",
		checkOut: "2023-07-03",
		status: "Checked Out",
		totalBill: 950,
	},
	{
		id: 4,
		name: "Alice Brown",
		email: "alice@example.com",
		avatar: "/avatars/04.png",
		room: "404",
		checkIn: "2023-07-04",
		checkOut: "2023-07-08",
		status: "Checked In",
		totalBill: 1100,
	},
	{
		id: 5,
		name: "Charlie Wilson",
		email: "charlie@example.com",
		avatar: "/avatars/05.png",
		room: "505",
		checkIn: "2023-07-05",
		checkOut: "2023-07-10",
		status: "Reserved",
		totalBill: 1800,
	},
];

export const messagesData = [
	{
		id: 1,
		sender: "Alberto Campbell",
		email: "albertocamp@gmail.com",
		subject: "Ask for Room",
		preview: "Hi there, I would like to ask the availability of the deluxe room for...",
		time: "09:02AM",
		avatar: "/placeholder.svg",
		body: `
      <p>Hi there,</p>
      <p>I would like to ask the availability of the deluxe room for <span style="color: blue;">Tuesday 13th March 2023</span> to <span style="color: blue;">Saturday 17th March 2023</span>. With 2 adult guests.</p>
      <p>and can I use the voucher that I got from Superindo? (Attached)</p>
      <p>Thank You.</p>
    `,
		attachments: [
			{ name: "Superindo Voucher.jpg", size: "1.3 MB" },
			{ name: "KTP.jpg", size: "1.2 MB" },
		],
		starred: false,
		archived: false,
		read: true,
	},
	{
		id: 2,
		sender: "Alfonso De Katalaire",
		email: "alfonso@example.com",
		subject: "Request for Best Price",
		preview: "Hi there, could you please send me price list for all rooms...",
		time: "09:02AM",
		avatar: "/placeholder.svg",
		body: `
      <p>Hi there,</p>
      <p>Could you please send me the price list for all room types? I'm planning a stay for next month and would like to compare options.</p>
      <p>Also, do you offer any discounts for extended stays?</p>
      <p>Thank you in advance.</p>
    `,
		starred: false,
		archived: false,
		read: false,
	},
	{
		id: 3,
		sender: "Rolando Floyd",
		email: "rolando@example.com",
		subject: "A collection of textile samples lay spread",
		preview: "Hi there, could you please send me price list for all rooms...",
		time: "09:02AM",
		avatar: "/placeholder.svg",
		body: `
      <p>Hello,</p>
      <p>I'm reaching out regarding the textile samples we discussed earlier. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.</p>
      <p>Could we arrange a meeting to go over these in detail?</p>
      <p>Best regards,<br>Rolando</p>
    `,
		starred: true,
		archived: false,
		read: true,
	},
];

export const documentsData = [
	{ id: 1, name: "Hotel Policy.pdf", type: "PDF", size: "1.2 MB", lastModified: "2023-07-01" },
	{ id: 2, name: "Employee Handbook.docx", type: "Word", size: "2.5 MB", lastModified: "2023-06-15" },
	{ id: 3, name: "Monthly Report.xlsx", type: "Excel", size: "3.7 MB", lastModified: "2023-07-05" },
	{ id: 4, name: "Guest Agreement.pdf", type: "PDF", size: "0.8 MB", lastModified: "2023-06-30" },
	{ id: 5, name: "Marketing Plan.pptx", type: "PowerPoint", size: "5.1 MB", lastModified: "2023-07-10" },
];

export const reportsData = {
	occupancyRate: {
		current: 78,
		change: 2,
	},
	revenue: {
		current: 24345,
		change: 5.2,
	},
};
