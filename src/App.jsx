import Home from './pages/Home'
import { BrowserRouter , Routes, Route} from 'react-router-dom';
import './App.css'
import Flashcards from './pages/Flashcards';
import PomodoroTimer from './pages/PomodoroTimer';
import ToDo from './pages/ToDo';
import Assistant from './pages/Assistant';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/flashcards' element={<Flashcards/>}/>
        <Route path='/promodoro-timer' element={<PomodoroTimer/>} />
        <Route path='/to-do-list' element={<ToDo/>} />
        <Route path='/ai-assistant' element={<Assistant/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
