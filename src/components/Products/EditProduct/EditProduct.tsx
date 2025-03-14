import { useParams } from "react-router-dom"
import HomeNavigation from "../../NavigationToHomePage"
import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "../../API_URL"
import ProductForm from "../ProductForm/ProductForm"
import { Product } from "../../Types/ExportTypes"

const EditProduct: React.FC = () => {
    const { id } = useParams()
    const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
      async function fetchComment() {
        const { data } = await axios(`${API_URL}/products/${id}`);
        setProduct(data);
      }
      fetchComment();
  }, [id]);

  if (!product) {
    return <p>Loading...</p>
  }

    return (
        <div>
            <h1>Products EDIT</h1>

            <ProductForm editProductData={product}/>

        <HomeNavigation/>
        </div>
    )
}
export default EditProduct