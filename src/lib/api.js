import axios from "axios";

const api = axios.create({
	baseURL: "/api",
});

export const fetchGuests = () => api.get("/guests"); // Fetches all guest data
export const fetchRooms = () => api.get("/rooms"); // Fetches all room data
export const fetchAllUsers = () => api.get("/allusers"); // Fetches all user data

// Add more API calls as needed
