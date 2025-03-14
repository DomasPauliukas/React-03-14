import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { API_URL } from '../API_URL';
import { Category, Product, Review, User } from '../Types/ExportTypes';

interface ReactContextType {
  users: User[];
  products: Product[];
  reviews: Review[];
  categories: Category[];
  fetchData: () => Promise<void>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const ReactContext = createContext<ReactContextType | undefined>(undefined);

interface ReactContextProviderProps {
  children: ReactNode;
}

export const ReactContextProvider: React.FC<ReactContextProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchData = async () => {
    try {
      const usersRes = await axios.get(`${API_URL}/users?_embed=reviews`);
      const productsRes = await axios.get(`${API_URL}/products`);
      const reviewsRes = await axios.get(`${API_URL}/reviews?_embed=product&_embed=user`);
      const categoriesRes = await axios.get(`${API_URL}/categories`);

      setUsers(usersRes.data);
      setProducts(productsRes.data);
      setReviews(reviewsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ReactContext.Provider value={{ users, products, reviews, categories, fetchData, setUsers }}>
      {children}
    </ReactContext.Provider>
  );
};

export const useReactContext = (): ReactContextType => {
  const ctx = useContext(ReactContext);
  if (!ctx) {
    throw new Error('useReactContext must be used within a ReactContextProvider');
  }
  return ctx;
};