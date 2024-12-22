import { User } from "./user";

export interface Child {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    birthday: string;
    createdDate: string;
    modifiedDate: null;
    user: User;
}
