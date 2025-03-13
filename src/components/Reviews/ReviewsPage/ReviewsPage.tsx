import { useEffect, useState } from "react"
import { API_URL } from "../../API_URL"
import axios from "axios"
import ReviewItem from "../ReviewItem/ReviewItem"

const ReviewsPage = () => {

    const [reviews, setReviews] = useState('')

    useEffect( () => {
        const fetchReviews = async () => {
            try {
                const {data} = await axios(`${API_URL}/reviews?_embed=product&_embed=user`)
                setReviews(data)
            } catch (error){
                console.log(`Error fetching reviews data`, error)
            }
        }
        fetchReviews()
    }, [])

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