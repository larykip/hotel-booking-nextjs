import { weatherData, statsData, bookingGraphData, activityFeedData, calendarData, roomsData, guestsData, messagesData, documentsData, reportsData } from "./dummyData";

// Helper function to simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API calls
export const fetchWeatherData = async () => {
	await delay(300);
	return weatherData;
};

export const fetchStatsData = async () => {
	await delay(700);
	return statsData;
};

export const fetchBookingGraphData = async () => {
	await delay(600);
	return bookingGraphData;
};

export const fetchActivityFeedData = async () => {
	await delay(400);
	return activityFeedData;
};

export const fetchCalendarData = async () => {
	await delay(500);
	return calendarData;
};

export const fetchRoomsData = async () => {
	await delay(800);
	return roomsData;
};

export const fetchGuestsData = async () => {
	await delay(600);
	return guestsData;
};

export const fetchMessagesData = async () => {
	await delay(500);
	return messagesData;
};

export const fetchDocumentsData = async () => {
	await delay(400);
	return documentsData;
};

export const fetchReportsData = async () => {
	await delay(700);
	return reportsData;
};
