import Avatar from '../assets/avatar.png'
import '../styling/Landpage.css'

export default function Landpage(){

    return (
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
    )
}