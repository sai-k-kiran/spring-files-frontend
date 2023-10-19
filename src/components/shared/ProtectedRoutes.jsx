import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectedRoutes = ({children}) => {
    const {isUserAuthenticated} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(!isUserAuthenticated()){
            navigate("/")
        }
    })

    return isUserAuthenticated() ? children : ""
}

export default ProtectedRoutes