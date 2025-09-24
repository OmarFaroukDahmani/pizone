import Navbar from '../components/Navbar'
import About from '../components/About'
import Landpage from '../components/Landpage'
import Offers from '../components/Offers'
import Footer from '../components/Footer'
import { UserButton } from '@clerk/clerk-react'



export default function Home(){
    const features = [[
      "Access to 5 introductory courses",
      "Limited quizzes per course",
      "Basic progress tracking",
      "Community forum (read-only)",
      "Ads displayed"
    ],[
      "Includes Free Plan features",
      "Access to 30+ courses",
      "Downloadable resources (PDFs, slides)",
      "Certificate of Completion for each course",
      "Community forum (post & comment)",
      "Basic support (email only)",
      "No ads"
    ],
    [
      "Includes Starter Plan features",
      "Access to all courses (100+)",
      "Interactive assignments & projects",
      "Monthly live webinars & workshops",
      "Offline viewing mode (download videos)",
      "Advanced progress reports",
      "Priority email & chat support",
      "Course creator tools (limited)"
    ],[
      "Includes Pro Plan features",
      "Unlimited course creation & publishing",
      "White-label branding (custom logo, URL)",
      "Team/enterprise management dashboard",
      "Dedicated account manager",
      "API access for integrations",
      "Customizable learning paths",
      "Lifetime content access (even after cancellation)"
    ]
]
    return (
        <>
            <Navbar />
            <Landpage/>
            <About />
            <div  className="pricingCard">
            <Offers 
                title="Free Plan" 
                price="0" 
                features={features[0]} 
                buttonText="Get Started" 
            />
            <Offers 
                title="Starter Plan" 
                price="19" 
                features={features[1]} 
                buttonText="Get Started" 
            />
            <Offers 
                title="Pro Plan" 
                price="29" 
                features={features[2]} 
                buttonText="Get Started" 
            />
            <Offers 
                title="Unlimited Plan" 
                price="59" 
                features={features[3]} 
                buttonText="Get Started" 
            />
            </div>
            <Footer />
        </>
    )

}