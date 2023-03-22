import { user } from "./user";

export interface Review {
    _id?: string;
    userId?:String | user;
    bookId?:String;
    rating:number;
    review?:String;
    status?:String;
}
