import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Register from './pages/Register';
import MainPage from './pages/MainPage';
import Profile from './pages/Profile';

function App() {
  return (
 <>
  <BrowserRouter>
  <Routes>
    <Route path='/register' element={<Register/>} />
    <Route path='/' element={<MainPage/>} />
    <Route path='/profile' element={<Profile/>}/>
  </Routes>
  </BrowserRouter>
 </>
  );
}

export default App;
