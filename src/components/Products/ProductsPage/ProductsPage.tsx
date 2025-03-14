import { useState } from "react";
import { Link } from "react-router-dom";
import { useReactContext } from "../../ContextProvider/ContextProvider";
import styles from './ProductsPage.module.css'

const ProductsPage: React.FC = () => {

  const { products, categories } = useReactContext()

  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [filteredProducts, setFilteredProducts] = useState(products)
  
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
      <div className={styles.productsPageWrapper}>
        <h1>Products</h1>

        <Link to="/Products/create" className={styles.addProductButton}>
          Add a new poduct!
        </Link>

        <div className={styles.formControl}>
            <label htmlFor="category-select">Select Category: </label>
            <select id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">--Select category--</option>
                {categories.map((category) => (
            <option key={category.id} value={category.id}>
                {category.name}
            </option>
            ))}
            </select>
        </div>
  
        <div className={styles.productsItemWrapper}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className={styles.productItemCard}>
                <Link to={`/Products/${product.id}`}>
                <img src={product.image} alt={product.name} style={{width:'200px', height:'200px', objectFit:'cover'}} />
                <h3>{product.name}</h3>
                </Link>
                <p>{product.description}</p>
                <div className={styles.priceRating}>
                  <p>Price: ${product.price}</p>
                  <p className={styles.stars}>Rating: {product.rating} ⭐</p>
                </div>
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