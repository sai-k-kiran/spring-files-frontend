import { createContext, useContext, useEffect, useState} from "react"
import { login as performLogin } from "../../services/client"

const AuthContext = createContext({})

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const login = async(user) => {
        return new Promise((resolve, reject) => {
            performLogin(user).then(res => {
                const jwtToken = res.headers["authorization"]
                localStorage.setItem("token", jwtToken)
                localStorage.setItem("user", JSON.stringify(res.data.customerDTO))
                setUser({...res.data.customerDTO})
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }

    const logOut = () => {
        localStorage.removeItem("token")
        setUser(null)
    }
    return (
        <AuthContext.Provider value={{
            user,
            login,
            logOut
        }}>
            {children}
        </AuthContext.Provider>
    ) 
}


export const useAuth = () => useContext(AuthContext)

export default AuthProvider