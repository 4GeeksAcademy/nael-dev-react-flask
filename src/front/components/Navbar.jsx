import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {

	const { store, dispatch} = useGlobalReducer();
	const navigate = useNavigate();
	const handleLogout=()=>{
		localStorage.removeItem("token");
		dispatch({type: "Logout"});
		navigate("/")
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container-fluid">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>

				<div className="d-flex gap-2"> 
					{!store.user && (
						<Link to="/signup">
							<button className="btn btn-primary">SignUp</button>
						</Link>
					)}

					{store.user ? (
						<>
						<Link to="/user-data">
							<button className="btn btn-primary">{store.user.email}</button>
						</Link>
						 <button className="btn btn-danger" onClick={handleLogout}>
              				Logout
           				 </button>	
						</>
					) : (
						<Link to="/login">
							<button className="btn btn-primary">Login</button>
						</Link>
					)}
				</div>
			</div>



		</nav>
	);
};