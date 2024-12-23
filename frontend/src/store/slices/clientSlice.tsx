import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/interfaces/user';
import { Booking } from '@/interfaces/booking';

export type ClientState = {
    user: User | null;
    bookings: Booking[];
};

const initialState: ClientState = {
    user: null,
    bookings: [],
};

export const clientSlice = createSlice({
    name: 'client',
    initialState: initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.bookings = [];
        },
        addBooking: (state, action: PayloadAction<Booking>) => {
            state.bookings.push(action.payload);
        },
    },
});

export const { login, logout, addBooking } = clientSlice.actions;

export default clientSlice.reducer;
