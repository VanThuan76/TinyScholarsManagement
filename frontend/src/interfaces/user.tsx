import { Child } from "./child";

export interface User {
    id: number;
    role: string;
    email: string;
    firstName: null;
    lastName: null;
    relationship: null;
    createdDate: string;
    modifiedDate: string;
    accessToken: null;
    children: Child[];
    signs: Sign[];
}

interface Sign {
    id: number;
    type: string;
    signTime: string;
    signature: string;
    createdDate: string;
    modifiedDate: string;
    user: User;
    booking: Booking;
}

interface Booking {
    id: number;
    child: Child2;
    campus: Campus;
    roomName: string;
    bookedDate: string;
    bookTimeFrom: string;
    bookTimeTo: string;
    createdDate: string;
    modifiedDate: null;
    isDeleted: boolean;
}

interface Campus {
    id: number;
    name: string;
    address: string;
    campusEmail: string;
    campusPhoneNumber: string;
}

interface Child2 {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    birthday: string;
    createdDate: string;
    modifiedDate: string;
    isDeleted: boolean;
    user: User;
}
