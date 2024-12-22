import './App.css'; // Importing CSS styles
import NavBar from './components/NavBar'; // Importing NavBar component
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importing BrowserRouter, Routes, and Route components from react-router-dom
import Footer from './components/Footer';
import Signup from './components/Signup';
import PrivateComponent from './components/PrivateComponent';

function App() {
  return (
    <div className="App">
      {/* Setting up routes using BrowserRouter */}
      <BrowserRouter>
        <NavBar /> {/* Rendering NavBar component */}

        {/* Defining routes */}

        <Routes>
           {/* Route for PrivateComponent */}
           <Route element={<PrivateComponent />}>
            {/* Route for Products Listing */}
            <Route path="/" element={<h1>Products Listing Components</h1>} />

            {/* Route for Adding Products */}
            <Route path="/add-product" element={<h1>Add Products Components</h1>} />

            {/* Route for Updating Products */}
            <Route path="/update-product" element={<h1>Update Products Components</h1>} />

            {/* Route for Profile */}
            <Route path="/profile" element={<h1>Profile</h1>} />
            

            {/* Route for Logout */}
            <Route path="/logout" element={<h1>Logout</h1>} />
          </Route>

          <Route path="/signup" element={<Signup />} />

         </Routes>

      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
