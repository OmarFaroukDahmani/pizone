// import Hamburger from "hamburger-react"
// import { useState } from "react"
// import DarkMode from "./DarkMode/DarkMode";
// import './DarkMode/DarkMode.css'
// import './Sidebar.css'
// export default function Sidebar(){

//     const [open,setOpen] = useState(false);
//     const links = [
//         {id: "0",anchor:"/about" ,title: "About"},
//         {id: "1",anchor:"/offers" ,title: "Our offers"},
//         {id: "2",anchor:"/partners",title: "Partners"},
//         {id: "3",anchor:"/courses" ,title: "Courses"}
//     ]

//     const mylinks = links.map((link)=>{
//         return(
//             <li key={link.id}><a key={link.id} href={link.anchor}>{link.title}</a></li>
//         )
//     })
//     return(
//         <div className="burger_menu">
//             <Hamburger
//                 size={24}
//                 toggled={open}
//                 toggle={setOpen}
//             />
//             {open && <div className="container" >

//             <nav className="nav burgerbar_links">
//                 <ul>
//                     {mylinks}
//                 </ul>
//                 <DarkMode/>
//             </nav>
//             </div>
//             }
//         </div>
//     )
// }

import Hamburger from "hamburger-react"
import { useState } from "react"
import DarkMode from "./DarkMode/DarkMode";
import './DarkMode/DarkMode.css'
import './Sidebar.css'

export default function Sidebar(){

    const [open,setOpen] = useState(false);
    const links = [
        {id: "0",anchor:"/about" ,title: "About"},
        {id: "1",anchor:"/offers" ,title: "Our offers"},
        {id: "2",anchor:"/partners",title: "Partners"},
        {id: "3",anchor:"/courses" ,title: "Courses"}
    ]

    const mylinks = links.map((link)=>{
        return(
            <li key={link.id}><a href={link.anchor}>{link.title}</a></li>
        )
    })

    return(
        <div className="burger_menu">
            <div className="burger_icon">
                <Hamburger
                    size={24}
                    toggled={open}
                    toggle={setOpen}
                />
            </div>
            {open && 
                <div className="dropdown_menu">
                    <nav className="nav burgerbar_links">
                        <ul>
                            {mylinks}
                        </ul>
                        <DarkMode/>
                    </nav>
                </div>
            }
        </div>
    )
}
