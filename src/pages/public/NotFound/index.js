import { Link } from "react-router-dom";

const NotFound = (props) => {
    return(
     <div className="not-found">
        <p>Not Found</p>
        <Link to="/">Back to Login</Link>
    </div>
    )
  }
  
  export default NotFound;