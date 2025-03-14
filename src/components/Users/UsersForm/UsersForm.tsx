import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { API_URL } from "../../API_URL"
import { User } from "../../Types/ExportTypes"
import { useReactContext } from "../../ContextProvider/ContextProvider"

type UserFormProps = {
    editUserData?: User | null
}

const UsersForm: React.FC<UserFormProps> = (props) => {

const { editUserData } = props
const { setUsers } = useReactContext()

const [username, setUsername] = useState<string>('')
const [email, setEmail] = useState<string>('')
const [firstName, setFirstName] = useState<string>('')
const [lastName, setLastName] = useState<string>('')
const [phone, setPhone] = useState<string>('')
const [profilePicture, setProfilePicture] = useState<string>('')
const [address, setAddress] = useState<string>('')

const navigate = useNavigate()

const usernameHandler = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event?.target.value)
const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event?.target.value)
const lastNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => setLastName(event?.target.value)
const firstNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => setFirstName(event?.target.value)
const addressHandler = (event: React.ChangeEvent<HTMLInputElement>) => setAddress(event?.target.value)
const phoneHandler = (event: React.ChangeEvent<HTMLInputElement>) => setPhone(event?.target.value)
const profilePictureHandler = (event: React.ChangeEvent<HTMLInputElement>) => setProfilePicture(event?.target.value)

useEffect(() => {
    if (editUserData) {
      setUsername(editUserData.username);
      setEmail(editUserData.email);
      setFirstName(editUserData.firstName);
      setLastName(editUserData.lastName);
      setPhone(editUserData.phone);
      setProfilePicture(editUserData.profilePicture);
      setAddress(editUserData.address);
    }
  }, [editUserData]);


const formHandler = (event: React.FormEvent) => {
    event.preventDefault()

    const newUser = {
        username,
        email,
        lastName,
        firstName,
        address,
        phone,
        profilePicture
    }

if (editUserData) {
    axios.put(`${API_URL}/users/${editUserData.id}`, newUser)
        .then(() => {
            axios.get(`${API_URL}/users`).then((response) => {
            setUsers(response.data)
            navigate(`/Users/${editUserData.id}`);
            });
        })
} else {
    axios.post(`${API_URL}/users`, newUser)
    .then((response) => {
        setUsers((prevUsers) => [...prevUsers, response.data])
        navigate('/Users');
        
    })
    .catch((error) => {
      console.error('Error creating user:', error);
    });
}
}
    return (

        <div>
            <form onSubmit={formHandler}>
                <div className="formControl">
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" id="username" value={username} onChange={usernameHandler}/>
                </div>
                <div className="formControl">
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" id="email" value={email} onChange={emailHandler}/>
                </div>
                <div className="formControl">
                    <label htmlFor="firstName">First name:</label>
                    <input type="text" name="firstName" id="firstName" value={firstName} onChange={firstNameHandler}/>
                </div>
                <div className="formControl">
                    <label htmlFor="lastName">Last name:</label>
                    <input type="text" name="lastName" id="lastName" value={lastName} onChange={lastNameHandler}/>
                </div>
                <div className="formControl">
                    <label htmlFor="address">Address:</label>
                    <input type="text" name="address" id="address" value={address} onChange={addressHandler}/>
                </div>
                <div className="formControl">
                    <label htmlFor="phone">Phone number:</label>
                    <input type="text" name="phone" id="phone" value={phone} onChange={phoneHandler}/>
                </div>
                <div className="formControl">
                    <label htmlFor="photo">Your photo link:</label>
                    <input type="text" name="photo" id="photo" value={profilePicture} onChange={profilePictureHandler}/>
                </div>

                <button type="submit"> {editUserData ? 'Edit user' : 'Create user'}</button>
            </form>
        </div>
    )
}
export default UsersForm