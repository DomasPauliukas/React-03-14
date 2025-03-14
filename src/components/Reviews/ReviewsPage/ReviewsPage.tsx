import ReviewItem from "../ReviewItem/ReviewItem"
import { useReactContext } from "../../ContextProvider/ContextProvider"
import styled from "styled-components"

const ReviewTitle = styled.h1`
    text-align: center;
    margin-top: 100px;
`

const ReviewsPage: React.FC = () => {
    const { reviews } = useReactContext()

    if (!reviews) {
        return <p>Loading reviews...</p>;
      }

    return (
        <div>
            {reviews && reviews.length > 0 ? (
                <div>
                    <ReviewTitle>{reviews.length > 1 ? 'Reviews:' : 'Review:'}</ReviewTitle>
        
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