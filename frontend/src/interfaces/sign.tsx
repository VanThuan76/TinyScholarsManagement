import { Booking } from "./booking";
import { User } from "./user";

export interface Sign {
    id: number;
    type: string;
    signTime: string;
    signature: string;
    createdDate: string;
    modifiedDate: null;
    user: User;
    booking: Booking;
}
