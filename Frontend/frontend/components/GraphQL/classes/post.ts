import { user } from "./user";

export class Post {
    id?: number;
    createdAt?: string;
    updatedAt? :string;
    title?: string;
    content?: string;
    user?: user;
}