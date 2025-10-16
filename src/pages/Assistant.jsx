import { useState, useRef, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { SendHorizonal } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import '../style/assistant.css'


export default function Assistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello 👋 How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return
    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('https://python-test-server-uld3.onrender.com/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      })
      const data = await res.json()
      const reply = data?.choices?.[0]?.message?.content || '⚠️ No valid response.'
      setMessages([...newMessages, { role: 'assistant', content: reply }])
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: '⚠️ Connection error.' }])
    }
    setLoading(false)
  }

  return (
    <>
      <Helmet>
        <title>Pizone: AI Study Assistant & Chatbot</title>
        <meta
          name="description"
          content="Get instant help understanding topics, generating summaries, and creating custom study questions with the Pizone AI Assistant chatbot."
        />
      </Helmet>
      <Navbar />
      <section className="assistant">
        <div className="chat">
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.role}`}>
              {m.content}
            </div>
          ))}
          {loading && <div className="msg assistant typing">Assistant is typing...</div>}
          <div ref={chatEndRef}></div>
        </div>

        <div className="input-box">
          <input
            type="text"
            placeholder="Type here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage}>
            <SendHorizonal size={20} />
          </button>
        </div>
      </section>
    </>
  )
}
