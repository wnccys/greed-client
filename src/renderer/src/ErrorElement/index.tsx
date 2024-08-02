import { Link } from "react-router-dom";

export function ErrorElement () {
    return (
        <div className="align-middle">
            <h1>404 NOT FOUND</h1>
            <Link to="/">
               Back to Application 
            </Link>
        </div>
    )
} 