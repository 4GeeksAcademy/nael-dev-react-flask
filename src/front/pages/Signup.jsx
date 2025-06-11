import { useState } from "react"
import { useNavigate } from "react-router-dom"



export const Signup = () => {

    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const [error ,setError] = useState('')
    const handleSignup =  async (email,password) =>{
        try{
            const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch (`${backendUrl}/api/signup`,{
                method : 'POST',
                headers : {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })

            })
            const responseData = await response.json();
            if (!response.ok){
                
                setError(responseData.error || responseData.err || "Error creando usuario")
                return null;
            }

			const data = await response.json()
            console.log(data)
            return data;

        }catch(err){
            setError("ERROR AL CONECTAR CON EL SERVIDOR")
           return null;
        }
    }


    const handleOnSubmit  =  async  (evt) => {
        evt.preventDefault();
        setError('')
        const response =  await handleSignup(email,password)
        console.log("Respuesta del signup:", response);

        if(response){
            
           navigate('/login')
        }
      
    }
  


    return (
         <section className="container d-flex  flex-column justify-content-center "> 

         {
            error ? 
            <div className=" alert alert-danger">
                {error}
                
            </div>: null
           
        }
        <h1>
            SignUp
        </h1>
        <form className="d-flex justify-content-center my-2"
                onSubmit={handleOnSubmit}>
            <fieldset className=" d-flex flex-column">
                <label>
                    Email
                </label>
                <input type="email" name = "email" value={email} placeholder="email" required onChange={(evt)=>setEmail(evt.target.value)}/>
                 <label>
                    Password
                </label>
                    <input type="password" name="password" value={password} placeholder="Password" required onChange={(evt) => setPassword(evt.target.value)} />
                <button  className="btn btn-success mt-2">Signup</button>
            </fieldset>
        </form>
        </section>
    )
}