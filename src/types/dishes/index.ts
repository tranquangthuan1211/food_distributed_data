export interface Dish {
    id: string;
    name: string;
    desc: string;
    price: number;
    img: string;
    category: string;
    rating: number;
    hot?: boolean;
}