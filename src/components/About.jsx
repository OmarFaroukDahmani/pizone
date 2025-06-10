import homeImage from '../assets/pizone_logo.png'
import '../styling/About.css'
export default function About(){
    return(
        <section className="about">
            <div className="about_img">
                <img src={homeImage} alt="welcome_image"/>
            </div>
            <div className="about_text">
                <h1>About <span>Pi</span>Zone </h1>
                <p><span>Pi Zone</span> is a dynamic platform dedicated to empowering individuals through knowledge and skill development. We are driven by the belief that learning has the power to transform lives, open doors to new opportunities, and shape brighter futures. At Pi Zone, users can enhance their skills, pursue personal and professional goals, and unlock their full potential. Our mission is to provide the tools, resources, and support needed to inspire growth, exploration, and achievement. The journey to a remarkable <span>future begins here.</span></p>
            </div>
        </section>
    )
}