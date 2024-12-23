import { Room } from "./room";

export interface Campus {
    id: number;
    name: string;
    address: string;
    campusEmail: string;
    imgUrl: string;
    campusPhoneNumber: string;
    rooms: Room[];
}
