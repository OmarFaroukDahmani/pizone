import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import homeImage from '../assets/pizone_logo.png'
import Avatar from '../assets/avatar.png'
import '../style/Home.css'



export default function Home(){

    return (
        <>
            <Navbar />
        <section className="landing">
            <div className='landing_text'> 
                <h1>Learn without limits</h1>
                <p>Start, switch, or advance your career with more than <span>10,000 courses</span>, Professional Certificates, and degrees from <span>world-class universities and companies</span>.</p>
                <div className='landing_buttons'>
                    <button>Join For Free</button>
                </div>
            </div>
            <div className='avatar'>
                <img src={Avatar} alt="Pi_zone avatar" />
            </div>
        </section>
        <section className="about">
            <div className="about_img">
                <img src={homeImage} alt="welcome_image"/>
            </div>
            <div className="about_text">
                <h1>About <span>Pi</span>Zone </h1>
                <p><span>Pi Zone</span> is a dynamic platform dedicated to empowering individuals through knowledge and skill development. We are driven by the belief that learning has the power to transform lives, open doors to new opportunities, and shape brighter futures. At Pi Zone, users can enhance their skills, pursue personal and professional goals, and unlock their full potential. Our mission is to provide the tools, resources, and support needed to inspire growth, exploration, and achievement. The journey to a remarkable <span>future begins here.</span></p>
            </div>
        </section>
            <Footer />
        </>
    )

}