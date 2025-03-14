import ReviewItem from "../ReviewItem/ReviewItem"
import { useReactContext } from "../../ContextProvider/ContextProvider"

const ReviewsPage: React.FC = () => {
    const { reviews } = useReactContext()

    if (!reviews) {
        return <p>Loading reviews...</p>;
      }

    return (
        <div>
            <h1>ReviewsPage</h1>

            {reviews && reviews.length > 0 ? (
                <div>
                    <h1>{reviews.length > 1 ? 'Reviews:' : 'Review:'}</h1>
        
                    {reviews.map((review, index) => (
                            <ReviewItem key={index} review={review}/>
                    ))}
                </div>
    
            ) : (
                <p>No reviews yet...</p>
            )}
        </div>
    )
}
export default ReviewsPage