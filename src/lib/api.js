import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const fetchGuests = () => api.get('/guests');
export const fetchRooms = () => api.get('/rooms');
export const fetchAllUsers = () => api.get('/allusers');


// Add more API calls as needed

