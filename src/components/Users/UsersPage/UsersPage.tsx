import { Link } from "react-router-dom"
import { useReactContext } from "../../ContextProvider/ContextProvider"

const UsersPage: React.FC = () => {

const { users } = useReactContext()

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