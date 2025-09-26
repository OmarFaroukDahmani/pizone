import DarkMode from './DarkMode/DarkMode' 
import Sidebar from './Sidebar'
import '../style/Navbar.css'

 export default function Navbar(){

    const links = [
        {id: "0",anchor:"#about" ,title: "About"},
        {id: "1",anchor:"#offers" ,title: "Our offers"},
        {id: "2",anchor:"#partners",title: "Partners"},
        {id: "3",anchor:"#courses" ,title: "Courses"}
    ]

    const mylinks = links.map((link)=>{
        return(
            <li key={link.id}><a key={link.id} href={link.anchor}>{link.title}</a></li>
        )
    })
    return (
        <>
        
        <div className="Navbar">
            <div className='Navbar_logo'>
                <h2><a href=""><span id='pi'>&#960;</span>Zone</a></h2>
            </div>
            <nav className="Navbar_links">
                <ul>
                    {mylinks}
                </ul>
            </nav>
            <div className='burger_menu'>
                <Sidebar/>
            </div>
            <div className="mode">
                <DarkMode/>
            </div>

        </div>

        </>
    )
 }