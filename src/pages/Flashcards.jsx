import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import '../style/flashcard.css'
import { Helmet } from 'react-helmet-async'

const loadCardsFromLocalStorage = () => {
  const saved = localStorage.getItem('flashcards')
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch (e) {
      console.error("Could not parse flashcards from localStorage:", e)
      return []
    }
  }
  return []
}

const FlipCard = ({ card, handleDelete }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleDeleteClick = (e) => {
    e.stopPropagation()
    handleDelete(card.id)
  }

  return (
    <div
      className={`flashcard ${isFlipped ? 'is-flipped' : ''}`}
      onDoubleClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="card-face flashcard-front">
        <h3>{card.title}</h3>
        <p><strong>Question:</strong><br /> {card.ques}</p>
        <button
          className="flip-btn"
          onClick={(e) => { e.stopPropagation(); setIsFlipped(true) }}
        >
          View Answer
        </button>
      </div>

      <div className="card-face flashcard-back">
        <h4>{card.title}</h4>
        <p><strong>Description:</strong> <br />{card.desc}</p>
        <p><strong>Question:</strong><br /> {card.ques}</p>
        <div className="card-actions">
          <button
            className="flip-btn cancel-btn"
            onClick={(e) => { e.stopPropagation(); setIsFlipped(false) }}
          >
            Back
          </button>
          <button
            className="del-btn"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Flashcards() {
  const [cards, setCards] = useState(loadCardsFromLocalStorage)
  const [showModal, setShowModal] = useState(false)
  const [showError, setShowError] = useState(false)
  const [note, setNote] = useState({ title: '', desc: '', ques: '' })

  useEffect(() => {
    localStorage.setItem('flashcards', JSON.stringify(cards))
  }, [cards])

  const handleNote = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const handleDelete = (id) => {
    const updated = cards.filter((c) => c.id !== id)
    setCards(updated)
  }

  const handleCreateCard = () => {
    if (!note.title || !note.desc || !note.ques) {
      setShowError(true)
      return
    }

    const newCard = {
      id: Date.now(),
      title: note.title,
      desc: note.desc,
      ques: note.ques,
    }

    setCards([...cards, newCard])
    setNote({ title: '', desc: '', ques: '' })
    setShowModal(false)
    setShowError(false)
  }

  return (
    <>
      <Helmet>
        <title>Pizone: Create, Flip, & Study Flashcards</title>
        <meta name="description" content="Master any topic! Create and customize your own digital flashcards, flip them to test yourself, and memorize key information the smart way." />
      </Helmet>
      <Navbar />
      <section className="flashcards-section">
        <h1>Add Your Notes Here</h1>
        <p>
          Make a flashcard — add the title, description, and a question about
          your topic to memorize more effectively.
        </p>
        <button onClick={() => { setShowModal(true); setShowError(false) }}>Create Card</button>

        <div className="cards-container">
          {cards.length === 0 ? (
            <p className="no-cards">No flashcards yet. Start creating!</p>
          ) : (
            cards.map((card) => (
              <FlipCard
                key={card.id}
                card={card}
                handleDelete={handleDelete}
              />
            ))
          )}
        </div>
      </section>

      <div className="note-card" style={{ display: showModal ? 'flex' : 'none' }}>
        <div className="note-content">
          <h2>Create a Note</h2>

          {showError && (
            <div className="error-message">
              Please ensure all fields (Title, Description, Question) are filled out.
            </div>
          )}

          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            required
            value={note.title}
            onChange={handleNote}
          />

          <label htmlFor="desc">Description:</label>
          <textarea
            name="desc"
            placeholder="Description"
            required
            value={note.desc}
            onChange={handleNote}
            style={{ width: '100%', height: '150px' }}
          />

          <label htmlFor="ques">Question:</label>
          <input
            type="text"
            name="ques"
            placeholder="Question"
            required
            value={note.ques}
            onChange={handleNote}
          />

          <div className="modal-buttons">
            <button onClick={handleCreateCard}>Create Card</button>
            <button
              className="cancel-btn"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
