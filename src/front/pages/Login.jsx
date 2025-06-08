import { useState } from "react"

export const Login = () =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleOnSubmit = (evt) => {
        evt.preventDefault();
        console.log(email)
        console.log(password)
    }
    return (
        <section className="container d-flex  flex-column justify-content-center "> 
        <h1>
            Login
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
                <button  className="btn btn-success mt-2">Login</button>
            </fieldset>
        </form>
        </section>
    
    )
}