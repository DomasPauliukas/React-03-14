import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { API_URL } from "../../API_URL"
import UsersForm from "../UsersForm/UsersForm"
import { User } from "../../Types/ExportTypes"
import styled from "styled-components"

const EditTitle = styled.h1`
    text-align: center;
    text-decoration: underline;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    color: #2c3e50;
    font-size: 32px;
    margin-bottom: 20px;
`

const EditUser: React.FC = () => {
    const { id } = useParams()
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        async function fetchComment() {
          const { data } = await axios(`${API_URL}/users/${id}`);
          setUser(data);
        }
        fetchComment();
      }, [id]);


    return (
        <div>
            <EditTitle>Edit user</EditTitle>

            <UsersForm editUserData={user}/>
        </div>
    )
}
export default EditUser