import styled from "styled-components"
import UsersForm from "../UsersForm/UsersForm"

const CreateTitle = styled.h1`
    text-align: center;
    text-decoration: underline;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    color: #2c3e50;
    font-size: 32px;
    margin-bottom: 20px;
`

const CreateUser: React.FC = () => {
    return (
        <div>
            <CreateTitle >A form to create user</CreateTitle>
            <UsersForm/>
        </div>
    )
}
export default CreateUser 