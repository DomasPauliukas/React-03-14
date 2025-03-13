import { Link } from "react-router-dom"

const HomeNavigation: React.FC = () => {

    return(
        <div>
            <button>
                <Link to={`/`}>Home page</Link>
            </button>
        </div>
    )
}
export default HomeNavigation