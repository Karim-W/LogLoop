import { Post } from "./post";
export class user {
    id?: number;
    createdAt?: string;
    updatedAt?: string;
    firstName?: string;
    lastName?: string;
    userName?: string;
    email?: string;
    password?: string;
    phone?: string;
    imgUrl?: string;
    posts?: Post[];
}