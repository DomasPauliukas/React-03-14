import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UsersPage from './components/Users/UsersPage/UsersPage.tsx'
import UserItem from './components/Users/UserItem/UserItem.tsx'
import CreateUser from './components/Users/CreateUser/CreateUser.tsx'
import EditUser from './components/Users/EditUser/EditUser.tsx'
import ProductsPage from './components/Products/ProductsPage/ProductsPage.tsx'
import ProductItem from './components/Products/ProductItem/ProductItem.tsx'
import CreateProduct from './components/Products/CreateProduct/CreateProduct.tsx'
import EditProduct from './components/Products/EditProduct/EditProduct.tsx'
import ReviewsPage from './components/Reviews/ReviewsPage/ReviewsPage.tsx'
import PageNavigator from './components/PageNavigator/PageNavigator.tsx'
import HomePage from './HomePage.tsx'
import { ReactContextProvider } from './components/ContextProvider/ContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <PageNavigator/>
    <ReactContextProvider>

      <Routes>
        <Route index element={<HomePage/>} />

        <Route path='Users' element={<UsersPage/>} />
        <Route path='Users/:id' element={<UserItem/>} />
        <Route path='Users/create' element={<CreateUser/>} />
        <Route path='Users/edit/:id' element={<EditUser/>} />

        <Route path='Products' element={<ProductsPage/>} />
        <Route path='Products/:id' element={<ProductItem/>} />
        <Route path='Products/create' element={<CreateProduct/>} />
        <Route path='Products/edit/:id' element={<EditProduct/>} />

        <Route path='Reviews' element={<ReviewsPage/>} />

      </Routes>

    </ReactContextProvider>
    
    </BrowserRouter>
  </StrictMode>,
)
