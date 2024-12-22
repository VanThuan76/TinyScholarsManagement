export const BACKEND_API_URL =
    import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:8080/api';

export const apiRoutes = {
    register: `${BACKEND_API_URL}/users/signup`,
    login: `${BACKEND_API_URL}/users/signin`,
    logout: `${BACKEND_API_URL}/users/logout`,
    users: `${BACKEND_API_URL}/users`,
    children: `${BACKEND_API_URL}/children`,
    campuses: `${BACKEND_API_URL}/campuses`,
    rooms: `${BACKEND_API_URL}/rooms`,
    bookings: `${BACKEND_API_URL}/bookings`,
    signs: `${BACKEND_API_URL}/signs`,
    reviews: `${BACKEND_API_URL}/unknown`,
};
