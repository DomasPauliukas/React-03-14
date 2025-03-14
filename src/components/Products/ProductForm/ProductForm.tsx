import { useEffect, useState } from "react";
import { API_URL } from "../../API_URL";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Category, Product } from "../../Types/ExportTypes";

type ProductFormProps = {
  editProductData?: Product
}

const ProductForm: React.FC<ProductFormProps> = ({editProductData}) => {
    const { id } = useParams()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [stock, setStock] = useState(0)
    const [categoryId, setCategoryId] = useState('')
    const [categories, setCategories] = useState([])
    const [rating, setRating] = useState<number | string>('No rating yet')


    const navigate = useNavigate()

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await axios.get(`${API_URL}/categories`);
            setCategories(response.data)
          } catch (error) {
            console.error("Error fetching categories:", error);
          }
        };
    
        fetchCategories();
      }, []);

      
      const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => setName(event?.target.value)
      const descriptionHandler = (event: React.ChangeEvent<HTMLInputElement>) => setDescription(event?.target.value)
      const priceHandler = (event: React.ChangeEvent<HTMLInputElement>) => setPrice(Number(event?.target.value))
      const imageHandler = (event: React.ChangeEvent<HTMLInputElement>) => setImage(event?.target.value)
      const stockHandler = (event: React.ChangeEvent<HTMLInputElement>) => setStock(Number(event?.target.value))
      const handleCategorySelect = (event: React.ChangeEvent<HTMLSelectElement>) => setCategoryId(event.target.value)
      
      useEffect(() => {
        if (editProductData) {
          setName(editProductData.name);
          setDescription(editProductData.description);
          setPrice(editProductData.price);
          setImage(editProductData.image);
          setStock(editProductData.stock);
          setCategoryId(editProductData.categoryId);
          setRating(editProductData.rating);

          } else {
          setRating("No rating yet");

          }
      }, [editProductData]);

    const formHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        const newProduct = {
            name,
            description,
            price,
            image,
            stock,
            categoryId,
            rating: editProductData ? editProductData.rating : "No rating yet"
          }

if (editProductData) {
    axios.put(`${API_URL}/products/${editProductData.id}`, newProduct);
    navigate(`/Products/${editProductData.id}`);
} else {
    axios.post(`${API_URL}/products`, newProduct)
    .then(() => {
      navigate('/Products');
    })
    .catch((error) => {
      console.error('Error creating user:', error);
    });
}

}
    return (
        <div>
            <h1 style={{textAlign:'center', fontSize:'28px'}}>{editProductData? 'Form to edit product information' : 'Form to add new product!'}</h1>
            
          <form onSubmit={formHandler}>

          <div className="formControl">
              <label htmlFor="name">Product Name:</label>
              <input type="text" id="name" name="name" value={name} onChange={nameHandler} required />
          </div>

          <div className="formControl">
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" value={description} onChange={descriptionHandler} required />
          </div>

          <div className="formControl">
            <label htmlFor="price">Price:</label>
            <input type="text" id="price" name="price" value={price} onChange={priceHandler} required />
          </div>

          <div className="formControl">
            <label htmlFor="image">Image URL:</label>
            <input type="text" id="image" name="image" value={image} onChange={imageHandler} required />
          </div>

          <div className="formControl">
            <label htmlFor="stock">Stock:</label>
            <input type="text" id="stock" name="stock" value={stock} onChange={stockHandler} required />
          </div>

          <div className="formControl">
            <label htmlFor="category">Category:</label>
            <select id="category" name="categoryId" value={categoryId} onChange={handleCategorySelect} required >
              <option value="">Select a category</option>
              {categories.map((category: Category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
          </div>

          <button type="submit"> {editProductData? 'Edit product' : 'Add product'}</button>
        </form>
        </div>
    )
}
export default ProductForm