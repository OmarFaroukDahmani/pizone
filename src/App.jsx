import Home from './pages/Home'
import { BrowserRouter , Routes, Route} from 'react-router-dom';
import './App.css'
import Flashcards from './pages/Flashcards';
import PomodoroTimer from './pages/PomodoroTimer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/flashcards' element={<Flashcards/>}/>
        <Route path='/promodoro-timer' element={<PomodoroTimer/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
