import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "../../API_URL"
import { Link } from "react-router-dom"

const UsersPage: React.FC = () => {

const [users, setUsers] = useState([])

useEffect( () => {
    const fetchUsers = async () => {
        try {
            const {data} = await axios(`${API_URL}/users?_embed=reviews`)
            setUsers(data)
        } catch (error){
            console.log(`Error fetching users data`, error)
        }
    }
    fetchUsers()
}, [])


    return (
        <div>
            {users && users.length > 0? (
                <div>
                    <h1>{users.length > 1 ? 'Users:' : 'User:'}</h1>
        
                    {users.map((user, index) => (
                        <li key={index}>
                            <Link to={`/Users/${user.id}`}>
                            {user.firstName} {user.lastName} 
                            </Link>
                        </li>
                    ))}
                </div>
    
            ) : (
                <p>No users yet...</p>
            )}
            
            <Link to="/Users/create">
                <button>Create a new user!</button>
            </Link>
        </div>

        
    )
}
export default UsersPage