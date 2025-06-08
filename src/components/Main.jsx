import homeImage from '../assets/pizone_logo.png'
export default function Main(){
    return(
        <section className="landing_page">
            <div className="landing_page_img">
                <img src={homeImage} alt="welcome_image"/>
            </div>
            <div className="landing_page_text">
                <h1>Welcome to PiZone !</h1>
                <p>Welcome to Pi Zone – where your learning journey begins and possibilities are endless! At <span>Pi Zone</span>, we believe in the power of knowledge to transform lives. Whether you're here to boost your skills, chase your dreams, or unlock new opportunities, you're in the right place. Get ready to explore, grow, and achieve more than you ever imagined. Your future starts now—let’s make it remarkable!</p>
            </div>
        
        </section>
    )
}