import axios from 'axios'

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
})
export const getCustomers = async () => {
    try{
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/customers`,
        getAuthConfig())
    }
    catch (err){
        throw err
    }
}

export const saveCustomer = async (customer) => {
    try{
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers`,
            customer
            )
    }
    catch(err){
        console.log(err)
    }
}

export const deleteCustomer = async (id) => {
    try{
        return await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/customers/${id}`,
        getAuthConfig()  
        )
    }
    catch (err){
        throw err
    }
}

export const updateCustomer = async (id, update) => {
    try{
        return await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/v1/customers/${id}`,
        update,
        getAuthConfig()      
        )
    }
    catch (err){
        throw err
    }
}

export const login = async (user) => {
    try{
        return await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login`,
        user
        )
    }
    catch (err){
        throw err
    }
}