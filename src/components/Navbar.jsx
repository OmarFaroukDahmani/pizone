import { useState } from "react";
import Hamburger from "hamburger-react";
import DarkMode from "./DarkMode/DarkMode";
import "../style/Navbar.css";
import "../style/Sidebar.css";
import "./DarkMode/DarkMode.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { id: "1", anchor: "/flashcards", title: "Flashcards" },
    { id: "2", anchor: "/promodoro-timer", title: "Pomodoro Timer" },
    { id: "3", anchor: "/to-do-list", title: "To-Do List" },
    { id: "4", anchor: "/ai-assistant", title: "AI-Assistant" },

  ];

  const mylinks = links.map((link) => (
    <li key={link.id}>
      <a href={link.anchor}>{link.title}</a>
    </li>
  ));

  return (
    <div className="Navbar">
      <div className="Navbar_logo">
        <h2>
          <a href="/">
            <span id="pi">&#960;</span>Zone
          </a>
        </h2>
      </div>

      <nav className="Navbar_links">
        <ul>{mylinks}</ul>
      </nav>

      <div className="burger_menu">
        <div className="burger_icon">
          <Hamburger
            color="var(--second)"
            size={24}
            toggled={open}
            toggle={setOpen}
          />
        </div>

        {open && (
          <div className="dropdown_menu">
            <nav className="nav burgerbar_links">
              <ul>{mylinks}</ul>
              <DarkMode />
            </nav>
          </div>
        )}
      </div>

      <div className="mode">
        <DarkMode />
      </div>
    </div>
  );
}
