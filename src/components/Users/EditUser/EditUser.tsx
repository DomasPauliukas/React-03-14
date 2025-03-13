import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { API_URL } from "../../API_URL"
import UsersForm from "../UsersForm/UsersForm"

const EditUser = () => {
    const { id } = useParams()
    const [user, setUser] = useState()

    useEffect(() => {
        async function fetchComment() {
          const { data } = await axios(`${API_URL}/users/${id}`);
          setUser(data);
        }
        fetchComment();
      }, []);


    return (
        <div>
            <h1>Edit User</h1>

            <UsersForm editUserData={user}/>
        </div>
    )
}
export default EditUser