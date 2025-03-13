import { useParams } from "react-router-dom"
import HomeNavigation from "../../NavigationToHomePage"
import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "../../API_URL"
import ProductForm from "../ProductForm/ProductForm"

const EditProduct = () => {
    const { id } = useParams()
    const [product, setProduct] = useState()

    useEffect(() => {
        async function fetchComment() {
          const { data } = await axios(`${API_URL}/products/${id}`);
          setProduct(data);
        }
        fetchComment();
      }, []);

    return (
        <div>
            <h1>Products EDIT</h1>

            <ProductForm editProductData={product}/>

        <HomeNavigation/>
        </div>
    )
}
export default EditProduct