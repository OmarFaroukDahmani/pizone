import logo from '../assets/pizone_logo.png'
import DarkMode from './DarkMode/DarkMode' 

 export default function Navbar(){
    return (
        <div className="Navbar">
            <a href="">
            <img src={logo} className='Navbar_logo' alt="pizone_logo" />
            </a>
            <nav className="Navbar_links">
                <ul>
                    <li><a href="">About</a></li>
                    <li><a href="">Our offers</a></li>
                    <li><a href="">Partners</a></li>
                    <li><a href="">Courses</a></li>
                </ul>
            </nav>
            <div className="Navbar_logs">
                <button id="log_in">Log in</button>
                <button id="sign_in">Sign in</button>
            </div>
            <DarkMode/>
        </div>
    )
 }