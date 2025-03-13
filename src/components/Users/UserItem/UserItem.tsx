import axios from "axios";
import { API_URL } from "../../API_URL";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";


const UserItem = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const [user, setUser] = useState('')
    const { profilePicture, firstName, lastName, username, address, phone, email } = user


    useEffect(() => {
        async function fetchComment() {
          const res = await fetch(`${API_URL}/users/${id}?_embed=reviews`);
          const userData = await res.json();
          setUser(userData);
        }
        fetchComment();
      }, []);

    const deleteUser = async (id) => {
        try {
          const response = await axios.delete(`${API_URL}/users/${id}`);
          console.log('User deleted:', response.data);
          navigate('/Users')

        } catch (error) {
          console.error('Error deleting user:', error);
        }
      };

      if (!user) {
        return <div>Loading...</div>;
      }

    return (
        <div>
            <div style={{paddingBottom:'50px'}}>
                <div>
                    <img src={profilePicture} alt="profile-picture" style={{height:'300px', width:'300px', objectFit:'cover'}}/>
                    <p>{firstName} {lastName} (username: {username})</p>
                </div>

                <div>
                    <p>Address: {address}</p>
                    <p>You can contact this user via:</p>
                    <p>Email - {email}</p>
                    <p>Phone: {phone}</p>
                </div>

                <button onClick={() => deleteUser(id)}>Delete user</button>
                <button>
                    <Link to={`/Users/edit/${id}`}>Edit user</Link>
                </button>
            </div>

        {user.reviews && user.reviews.length > 0 ? (
            <div>
                <h3>{user.reviews.length > 1 ? 'Reviews' : 'Review:'}</h3>
                {user.reviews.map((review, index) => (
                    <li key={index}>
                    <Link to={`/Products/${review.productId}`}>
                        {review.comment}
                    </Link>
                    </li>
                ))}
            </div>
        ) : (
            <h3>No reviews yet...</h3>
        )}

        </div>
    )
}
export default UserItem