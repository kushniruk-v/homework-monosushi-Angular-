import { ICategoryResponse } from "../category/category-interface";

export interface ITovaryRequest{
    category: ICategoryResponse;
    name: string;
    path: string;
    description: string;
    weight: string;
    price: number;
    imagePath: string;
    count:number;
}

export interface ITovaryResponse extends ITovaryRequest{
    id:number | string;
    
}