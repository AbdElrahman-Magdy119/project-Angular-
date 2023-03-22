import { author } from "./authors";
import { catagory } from "./category";

export interface book {
  _id: string; 
  title: string;
    description: string;
    categoryId:catagory;
    authorId:author;
    image: string;
    reviewId:string;
  }