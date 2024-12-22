import { Campus } from "./campus";
import { Child } from "./child";

export interface Booking {
    id: number;
    roomName: string;
    bookedDate: string;
    bookTimeFrom: string;
    bookTimeTo: string;
    campus: Campus;
    child: Child;
}
