import axios from "axios";
import { API_URL } from "../../API_URL";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "../../Types/ExportTypes";
import { useReactContext } from "../../ContextProvider/ContextProvider";
import styles from "./UserItem.module.css"
import styled from "styled-components";

const WrapperDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const UserItem: React.FC = () => {
    const { setUsers } = useReactContext()
    const navigate = useNavigate()
    const { id } = useParams()
    const [user, setUser] = useState<User | null>(null)
    const { profilePicture, firstName, lastName, username, address, phone, email, reviews } = user || {}


    useEffect(() => {
        async function fetchComment() {
          const res = await fetch(`${API_URL}/users/${id}?_embed=reviews`);
          const userData = await res.json();
          setUser(userData);
        }
        fetchComment();
      }, [id]);

    const deleteUser = async (id: string) => {
        try {
          const response = await axios.delete(`${API_URL}/users/${id}`);
          console.log('User deleted:', response.data);
          const usersResponse = await axios.get(`${API_URL}/users`);
          setUsers(usersResponse.data); 

          navigate('/Users')

        } catch (error) {
          console.error('Error deleting user:', error);
        }
      };

      if (!user) {
        return <div>Loading...</div>;
      }

    return (
        <div className={styles.userItemWrapper}>
            <WrapperDiv>
                <div>
                    <img src={profilePicture} alt="profile-picture" className={styles.userImage}/>
                </div>

                <div className={styles.userInfo}>
                    <p>{firstName} {lastName} (username: {username})</p>
                    <p>Address: {address}</p>
                    <p>You can contact this user via:</p>
                    <p>Email - {email}</p>
                    <p>Phone: {phone}</p>
                </div>

                <button onClick={() => deleteUser(id ?? '')}>Delete user</button>
                <button>
                    <Link to={`/Users/edit/${id}`}>Edit user</Link>
                </button>
            </WrapperDiv>

        <div className={styles.reviewsWrapper}>
          {reviews && reviews.length > 0 ? (
            <div>
                <h3>{reviews.length > 1 ? 'Reviews' : 'Review:'}</h3>
                <ul className={styles.reviewsList}>
                    {reviews.map((review) => (
                        <li key={review.id} className={styles.reviewItem}>
                        <Link to={`/Products/${review.productId}`}>
                            {review.comment}
                        </Link>
                        </li>
                    ))}
                </ul>
            </div>
        ) : (
            <h3>No reviews yet...</h3>
        )}

        </div>
    </div>
    )
}
export default UserItem