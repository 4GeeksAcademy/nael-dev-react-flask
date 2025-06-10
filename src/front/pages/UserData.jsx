import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"

export const UserData = () =>{

    const {store,dispatch} = useGlobalReducer();

    const navigate = useNavigate()
    const fetchUser = async ()=>{
        try{
            const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")
            
            const token = localStorage.getItem('token')
            if(!token){
                navigate('/login')
            }
		
            const userResponse  = await fetch (`${backendUrl}/api/user/personal-data`,{
                headers:{
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const user = await userResponse.json()
            dispatch({
                type: 'set_user', payload: {
                    user: user.user,
                }
            })

            
            return user;

        }catch{
            navigate('/login')
            throw Error('Error get user')
            
        }
    }
    
    useEffect(()=>{
        fetchUser()
    },[])
          if(!store.user){
        return null
    }
    return(
        <section>
            <h1>
                User Data
            </h1>
            <h2>
            {store.user.email}
            </h2>
        </section>
    )
}