import Home from './pages/Home'
import { BrowserRouter , Routes, Route} from 'react-router-dom';


import './App.css'
import Login from './pages/Login';
import Signup from './pages/Signup';
import StudentPage from './pages/StudentPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/student' element={<StudentPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
