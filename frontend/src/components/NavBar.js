import React from 'react'; // Importing React library
import { Link , useNavigate} from 'react-router-dom'; // Importing Link component from react-router-dom

// Functional component for Navbar
const NavBar = () => {

    const auth = localStorage.getItem('user');

    //navigate
    const Navigate = useNavigate();  
    //logout function
    const Logout = ()=>{
        localStorage.clear();
        Navigate('/signup');
    }
    return (
        <div style={{ background: "#71b0cf" }} >
            <img className='logo' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDmD2GxwFUjESzEyUPaK-t49jc55yBcc9HiA&s" alt=" testloho" />
           {auth ? (
                    <ul className='nav-ul'>
                        {/* Navigation links */}
                        <li><Link to="/">Products</Link></li>
                        <li><Link to="/add-product">Add Products</Link></li>
                        <li><Link to="/update-product">Update Products</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li>
                            <Link to="/login" onClick={Logout} className="logout-button">
                            Logout ({auth ? JSON.parse(auth)?.name : ''})
                            </Link>
                        </li>

                    </ul>
                ) : (
                    <ul className='nav-ul nav-right'>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </ul>
                )}

        </div>
    );
}

export default NavBar;
