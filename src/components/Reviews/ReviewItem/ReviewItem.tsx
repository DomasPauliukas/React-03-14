import { Link } from "react-router-dom"
import { Review } from "../../Types/ExportTypes";

type ReviewItemProps = {
    review: Review;
  };

const ReviewItem: React.FC<ReviewItemProps> = ( {review} ) => {
    const { rating, comment, createdAt, product, user } = review

    if (!review) {
        return <p>Loading reviews...</p>;
      }

    return (
        <div>
            <h3>Reviewer: <Link to={`/Users/${user.id}`}>{user.firstName} {user.lastName}.</Link>  Product: <Link to={`/Products/${product.id}`}>{product.name}</Link></h3>

            <p>{comment}</p>
            <p>Rating: {rating} ⭐</p>
            <p>Commented: {createdAt}</p>



        </div>
    )
}
export default ReviewItem