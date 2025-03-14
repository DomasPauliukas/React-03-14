import { Link } from "react-router-dom"
import { Review } from "../../Types/ExportTypes";
import styles from './ReviewItem.module.css'

type ReviewItemProps = {
    review: Review;
  };

const ReviewItem: React.FC<ReviewItemProps> = ( {review} ) => {
    const { rating, comment, createdAt, product, user } = review

    if (!review) {
        return <p>Loading reviews...</p>;
      }

    return (
        <div className={styles.reviewItemWrapper}>
            <h3>Reviewer: <Link to={`/Users/${user.id}`}>{user.firstName} {user.lastName}. </Link>  
                Product: <Link to={`/Products/${product.id}`}>{product.name}</Link>
            </h3>

            <p className={styles.comment}>{comment}</p>
            <p className={styles.rating}>Rating: {rating} ⭐</p>
            <p className={styles.createdAt}>Commented: {createdAt}</p>



        </div>
    )
}
export default ReviewItem