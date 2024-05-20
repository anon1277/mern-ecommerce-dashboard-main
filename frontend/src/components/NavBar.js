import React from 'react'; // Importing React library
import { Link } from 'react-router-dom'; // Importing Link component from react-router-dom

// Functional component for Navbar
const NavBar = () => {
    return (
        <div>
            {/* Navigation links */}
            <ul className='nav-ul'>
                {/* Link to Products */}
                <li><Link to="/">Products</Link></li>
                
                {/* Link to Add Product */}
                <li><Link to="/add-product">Add Products</Link></li>

                {/* Link to Update Product */}
                <li><Link to="/update-product">Update Products</Link></li>

                {/* Link to Profile */}
                <li><Link to="/profile">Profile</Link></li>

                {/* Link to Logout */}
                <li><Link to="/logout">Logout</Link></li>
            </ul>
        </div>
    );
}

export default NavBar;
