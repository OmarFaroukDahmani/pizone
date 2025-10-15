import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import homeImage from '../assets/pizone_logo.png'
import Avatar from '../assets/avatar.png'
import '../style/Home.css'
import { StickyNote, Timer, ListTodo, BotMessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Home() {
  const features = [
    {
      id: "0",
      icon: StickyNote,
      name: "Flashcards",
      desc: "Review and memorize key information the smart way — create, flip, and test yourself easily.",
      link: "/flashcards"
    },
    {
      id: "1",
      icon: Timer,
      name: "Promodoro Timer",
      desc: "Boost focus with timed study sessions and structured breaks.",
      link: "/promodoro-timer"
    },
    {
      id: "2",
      icon: ListTodo,
      name: "To-Do List",
      desc: "Plan your study sessions, set priorities, and keep track of daily goals.",
      link: "/to-do-list"
    },
    {
      id: "3",
      icon: BotMessageSquare,
      name: "AI Assistant",
      desc: "Get help understanding topics, generating summaries, or creating custom study questions instantly.",
      link: "/ai-assistant"
    }
  ]

  return (
    <>
      <Navbar />

      <section className="landing">
        <div className="landing_text">
          <h1>Your All-in-One Study Companion</h1>
          <p>
            From planning your tasks to mastering topics with flashcards and AI help, PiZone makes learning simpler, faster, and more effective — so you can focus on what truly matters.
          </p>
          <div className="landing_buttons">
          </div>
        </div>
        <div className="avatar">
          <img src={Avatar} alt="Pi_zone avatar" />
        </div>
      </section>

      <section className="features">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Link to={feature.link} key={feature.id}>
              <div className="feature-card">
                <Icon size={40} />
                <h3>{feature.name}</h3>
                <p>{feature.desc}</p>
              </div>
            </Link>
          )
        })}
      </section>

      <section className="about" id="about">
        <div className="about_img">
          <img src={homeImage} alt="welcome_image" />
        </div>
        <div className="about_text">
          <h1>
            About <span>Pi</span>Zone
          </h1>
          <p>
            <span>PiZone </span>is a smart studying tool built to help students and self-learners stay
            focused, organized, and efficient. It combines everything you need to manage your learning in
            one place — powered by simple design and modern AI features.
            <span> Future Begins Here.</span>
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
}
