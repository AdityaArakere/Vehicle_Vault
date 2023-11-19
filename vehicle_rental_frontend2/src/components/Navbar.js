import {useState} from "react";
import {Link} from "react-router-dom";
import './NavbarStyles.css';
import logo from '../resources/logo1.png';
import Login from "./Login";
function Navbar()
{
   const [loginStatus, setStatus] = useState('Login');
   const [btState, setBtState] = useState(false);
   
   
    function toggler()
    {
        setBtState((btState) =>!btState);
       
    }
    
        return(
            <nav className="NavbarItems">
                <Link to='/' className='logo'><img src={logo} alt="VehicleVault" className="logo" /></Link>
                <ul className="nav-menu">

                <Link to='/Cars' className="nav-links">Cars</Link>
                <Link to='/Bikes' className="nav-links">Bikes</Link>
                <Link to='/Scooters' className="nav-links">Scooters</Link>
                <a  onClick={toggler} className="nav-links-button">Login{btState && <Login/>}</a>
                
                
                </ul>
            </nav>
        )
    
}

export default Navbar;