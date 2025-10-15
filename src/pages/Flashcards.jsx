import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import '../style/flashcard.css'
// Removed all Firebase imports

// Helper function to safely load from localStorage
const loadCardsFromLocalStorage = () => {
  const saved = localStorage.getItem('flashcards');
  if (saved) {
    try {
      // Parse the JSON string from localStorage
      return JSON.parse(saved);
    } catch (e) {
      console.error("Could not parse flashcards from localStorage:", e);
      return [];
    }
  }
  return [];
};

// Card Component to handle flipping logic
// Props changed: now accepts 'handleDelete' function instead of db/userId
const FlipCard = ({ card, handleDelete }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Simplified delete function uses the prop from the parent
  const handleDeleteClick = (e) => {
    e.stopPropagation(); 
    handleDelete(card.id);
  };

  return (
    <div 
      className={`flashcard ${isFlipped ? 'is-flipped' : ''}`} 
      // Changed to onDoubleClick to prevent accidental flips on small taps
      onDoubleClick={() => setIsFlipped(!isFlipped)} 
    >
      <div className="card-face flashcard-front">
        <h3>{card.title}</h3>
        <p><strong>Question:</strong> {card.ques}</p>
        <button 
          className="flip-btn" 
          onClick={(e) => { e.stopPropagation(); setIsFlipped(true); }}
        >
          View Answer
        </button>
      </div>

      <div className="card-face flashcard-back">
        <h4>{card.title} - Details</h4>
        <p><strong>Description:</strong> {card.desc}</p>
        <p><strong>Question:</strong> {card.ques}</p>
        <div className="card-actions">
          <button 
            className="flip-btn cancel-btn" 
            onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
          >
            Back to Question
          </button>
          <button
            className="delete-btn"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};


export default function Flashcards() {
  // Reverted state initialization to use localStorage and removed Firebase state
  const [cards, setCards] = useState(loadCardsFromLocalStorage);
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [note, setNote] = useState({ title: '', desc: '', ques: '' });

  // useEffect to save to localStorage whenever cards change
  useEffect(() => {
    localStorage.setItem('flashcards', JSON.stringify(cards));
  }, [cards]);
  
  // Removed all Firebase initialization and data fetching useEffects


  const handleNote = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  
  // Local state delete function
  const handleDelete = (id) => {
    const updated = cards.filter((c) => c.id !== id);
    setCards(updated);
  };

  // Reverted handleCreateCard to use local state updates
  const handleCreateCard = () => {
    if (!note.title || !note.desc || !note.ques) {
      setShowError(true);
      return;
    }
    
    // Create new card object with unique ID (timestamp)
    const newCard = {
      id: Date.now(),
      title: note.title,
      desc: note.desc,
      ques: note.ques,
    };

    setCards([...cards, newCard]);
    setNote({ title: '', desc: '', ques: '' });
    setShowModal(false);
    setShowError(false);
  };

  return (
    <>
    <Navbar/>
      <nav className="navbar"><h1>Flashcard App</h1></nav>
      <section className="flashcards-section">
        <h1>Add Your Notes Here</h1>
        <p>
          Make a flashcard — add the title, description, and a question about
          your topic to memorize more effectively.
        </p>
        <button onClick={() => { setShowModal(true); setShowError(false); }}>Create Card</button>

        <div className="cards-container">
          {cards.length === 0 ? (
            <p className="no-cards">No flashcards yet. Start creating!</p>
          ) : (
            cards.map((card) => (
              <FlipCard 
                key={card.id} 
                card={card} 
                handleDelete={handleDelete} // Pass the local delete function
              />
            ))
          )}
        </div>
      </section>

      {/* Modal / Note Card */}
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
  );
}
