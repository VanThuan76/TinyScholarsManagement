import { Room } from "./room";

export interface Campus {
    id: number;
    name: string;
    address: string;
    campusEmail: string;
    campusPhoneNumber: string;
    rooms: Room[];
}
