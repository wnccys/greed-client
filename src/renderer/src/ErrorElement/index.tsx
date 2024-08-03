import { Link } from "react-router-dom";

export function ErrorElement () {
    return (
        <div className="flex flex-col justify-center items-center bg-[#171717] h-[100vh] w-[100vw]">
            <h1>404 NOT FOUND</h1>
            <Link to="/">
               Back to Application 
            </Link>
        </div>
    )
} 