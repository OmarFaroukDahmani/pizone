import { useState } from "react";
import Hamburger from "hamburger-react";
import DarkMode from "./DarkMode/DarkMode";
import "../style/Navbar.css";
import "../style/Sidebar.css";
import "./DarkMode/DarkMode.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { id: "0", anchor: "#about", title: "About" },
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
      {/* Logo */}
      <div className="Navbar_logo">
        <h2>
          <a href="/">
            <span id="pi">&#960;</span>Zone
          </a>
        </h2>
      </div>

      {/* Desktop Navigation */}
      <nav className="Navbar_links">
        <ul>{mylinks}</ul>
      </nav>

      {/* Burger Menu for Mobile */}
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

      {/* Dark Mode Toggle for Desktop */}
      <div className="mode">
        <DarkMode />
      </div>
    </div>
  );
}
