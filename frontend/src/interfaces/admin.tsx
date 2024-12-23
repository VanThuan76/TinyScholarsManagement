export interface Admin {
    id: number;
    role: string;
    firstName: string;
    lastName: string;
    relationship: string;
    createdDate: string;
    modifiedDate: string;
    accessToken: string;
    children: any[];
    signs: any[];
}
