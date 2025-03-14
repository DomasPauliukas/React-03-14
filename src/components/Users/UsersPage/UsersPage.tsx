import { Link } from "react-router-dom"
import { useReactContext } from "../../ContextProvider/ContextProvider"
import styles from './UsersPage.module.css'

const UsersPage: React.FC = () => {

const { users } = useReactContext()

    return (
        <div className={styles.usersPageWrapper}>
            {users && users.length > 0? (
                <div>
                    <h1>{users.length > 1 ? 'Users:' : 'User:'}</h1>
        
                <ul className={styles.usersList}>
                    {users.map((user, index) => (
                        <li key={index} className={styles.userItemCard}>
                            <Link to={`/Users/${user.id}`}>
                            {user.firstName} {user.lastName} 
                            </Link>
                        </li>
                    ))}
                </ul>
                </div>
    
            ) : (
                <p>No users yet...</p>
            )}
            
            <Link to="/Users/create" className={styles.createButton}>
            Create a new user!
            </Link>
        </div>

        
    )
}
export default UsersPage