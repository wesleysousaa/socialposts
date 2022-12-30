import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Pages
import Home from './pages/home/Home'
import About from './pages/about/About'
import Painel from './pages/painel/Painel';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

// Components
import Menu from './components/Menu'
import Footer from './components/Footer'

// Conxtets
import { AuthProvider } from './context/AuthContext';
import { LoadingContextProvider } from './context/LoadingContext'

// Hooks
import { useUserContext } from './hooks/useUserContext';


function App() {

  const { user } = useUserContext()

  return (
    <div className="app">
      <AuthProvider value={user}>
        <LoadingContextProvider>
          <BrowserRouter>
            <Menu />
            <div className="container">
              <Routes>
                <Route path='/' element={user ? (<Home />) : (<Navigate to='/login' />)} />
                <Route path='/about' element={<About />} />
                <Route path='/login' element={!user ? (<Login />) : (<Navigate to='/' />)} />
                <Route path='/register' element={!user ? (<Register />) : (<Navigate to='/' />)} />
                <Route path='/painel' element={user ? (<Painel />) : (<Navigate to='/login' />)} />
              </Routes>
            </div>
          </BrowserRouter>
          <Footer />
        </LoadingContextProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
