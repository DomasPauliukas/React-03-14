import { useEffect, useState } from "react";
import { API_URL } from "../../API_URL";
import { Link } from "react-router-dom";

const ProductsPage = () => {

    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [filteredProducts, setFilteredProducts] = useState([])
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const categoryResponse = await fetch(`${API_URL}/categories`)
          const productResponse = await fetch(`${API_URL}/products`)
  
          const categoriesData = await categoryResponse.json();
          const productsData = await productResponse.json();
  
          setCategories(categoriesData)
          setProducts(productsData)
          setFilteredProducts(productsData)
        } catch (error) {
          console.error("Error fetching data:", error)
        }
      }
  
      fetchData()
    }, []);
  
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const categoryId = event.target.value
      setSelectedCategory(categoryId)
  
      if (categoryId === '') {
        setFilteredProducts(products)
      } else {
        setFilteredProducts(products.filter(product => product.categoryId === categoryId))
      }
    }
  
    return (
      <div>
        <h1>Product Filter</h1>

        <Link to="/Products/create">
                <button>Add a new poduct!</button>
        </Link>

        <div className="formControl">
            <label htmlFor="category-select">Select Category: </label>
            <select id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">All Categories</option>
                {categories.map((category) => (
            <option key={category.id} value={category.id}>
                {category.name}
            </option>
            ))}
            </select>
        </div>
  
        <div>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id}>
                <Link to={`/Products/${product.id}`}>
                <img src={product.image} alt={product.name} style={{width:'200px', height:'200px', objectFit:'cover'}} />
                <h3>{product.name}</h3>
                </Link>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Rating: {product.rating} ⭐</p>
              </div>
            ))
          ) : (
            <h3>No products found for this category.</h3>
          )}
        </div>
      </div>
    );
}
export default ProductsPage