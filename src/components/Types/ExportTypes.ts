export interface Product {
    id: string
    name: string
    description: string
    price: number
    categoryId: string
    stock: number
    image: string
    rating: number
    reviews: Review[]
}
  
export interface Category {
    id: string
    name: string
}
  
export interface User {
    id: string
    username: string
    email: string
    firstName: string
    lastName: string
    address: string
    phone: string
    profilePicture: string
    reviews: Review[]
}
  
export interface Review {
    id: string
    productId: string
    userId: string
    rating: number
    comment: string
    createdAt: string
    product: Product
    user: User
}