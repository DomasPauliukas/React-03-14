import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { API_URL } from "../../API_URL"
import axios from "axios"
import ReviewForm from "../../Reviews/ReviewForm/ReviewForm"
import { Product, Review } from "../../Types/ExportTypes"
import { toast } from "react-toastify"
import styles from './ProductItem.module.css'

const ProductItem: React.FC = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState<Product | null>(null)
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [users, setUsers] = useState([])
    const { name, description, price, stock, image, rating } = product || {}


    useEffect(() => {
        async function fetchProduct() {
          const res = await fetch(`${API_URL}/products/${id}?_embed=reviews`)
          const productData = await res.json()
          setProduct(productData)

          const usersRes = await fetch(`${API_URL}/users`)
          const usersData = await usersRes.json()
          setUsers(usersData)
        }
        fetchProduct()
      }, [id]);

      const deleteProduct = async (id: string) => {
        try {
          const response = await axios.delete(`${API_URL}/products/${id}`)
          console.log('Product deleted:', response.data)
          navigate('/Products')

        } catch (error) {
          console.error('Error deleting product:', error)
        }
      };

      const handleReviewSubmit = async (newReview: Review) => {
    
        const newReviewData = {
          productId: id,
          rating: newReview.rating,
          comment: newReview.comment,
          createdAt: new Date().toISOString(),
          userId: newReview.userId
        };
    
        try {
          await axios.post(`${API_URL}/reviews`, newReviewData)
          toast.success('Review was created!', {position: "bottom-center"})

    
          const res = await fetch(`${API_URL}/products/${id}?_embed=reviews`)
          const updatedProductData = await res.json()
          setProduct(updatedProductData)
    
          setShowReviewForm(false)
        } catch (error) {
          console.error("Error adding review:", error)
        }
      }

      const deleteReview = async (reviewId: string) => {
        try {
          const response = await axios.delete(`${API_URL}/reviews/${reviewId}`)
          toast.error('Review was deleted!', {position: "bottom-center"})
          console.log('Review deleted:', response.data)
      
          setProduct((prevProduct) => {
            if (!prevProduct) {
              return null
            }
            return{
              ...prevProduct,
              reviews: prevProduct.reviews.filter((review: Review) => review.id !== reviewId)
            }
          });
        } catch (error) {
          console.error('Error deleting review:', error);
        }
      };

      if (!product) {
        return <div>Loading...</div>
      }

    return (
        <div className={styles.productItemWrapper}>
            
                <img src={image} alt="" style={{width:'300px', height:'300px'}}/>
                <h2>{name}</h2>
                <p className={styles.rating}>Rating: {rating}</p>
                <p>{description}</p>
                <p className={styles.price}>price: {price}</p>
                <p className={styles.stock}>stock: {stock}</p>
            

            <button onClick={() => deleteProduct(id ?? '')}>Delete product</button>
            <button>
                <Link to={`/Products/edit/${id}`} style={{color:'white'}}>Edit product</Link>
            </button>
            <button onClick={() => setShowReviewForm(!showReviewForm)}>Add Review</button>

        <div>

            {showReviewForm && (
                <ReviewForm users={users} onSubmit={handleReviewSubmit} />
            )}

          <div className={styles.reviews}>
            {product.reviews && product.reviews.length > 0 ? (
            <div>
                <h3>{product.reviews.length > 1 ? 'Reviews' : 'Review:'}</h3>
                {product.reviews.map((review, index) => (
                    <li key={index}>
                    <Link to={`/Users/${review.userId}`}>
                        {review.comment}
                    </Link>
                    <p>Rating: {review.rating} ⭐</p>
                    <p>Commented: {review.createdAt}</p>
                    <button onClick={() => deleteReview(review.id)}>Delete review</button>
                    </li>
                ))}
            </div>
        ) : (
            <h3>No reviews yet...</h3>
        )}   
          </div>
        </div>

        </div>
    )
}
export default ProductItem