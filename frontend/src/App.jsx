import { BrowserRouter, Route, Routes } from 'react-router-dom'

import RegisterOption from './pages/RegisterOption'
import RegisterPlayer from './pages/RegisterPlayer'
import RegisterTeam from './pages/RegisterTeam'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'
import Home from './pages/Home'
import Clubes from './pages/Clubes'
import UploadProfilePicture from './pages/UploadProfilePicture'
import ProfilePage from './pages/ProfilePage'
import Navbar from './components/Navbar'
import ProtectedRoute from './ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import { TeamProvider } from './context/TeamContext'

function App(){
  return(
    <AuthProvider>
      <TeamProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterOption />} />
          <Route path='/register-player' element={<RegisterPlayer/>} />
          <Route path='/register-team' element={<RegisterTeam/>} />
          
          <Route element={<ProtectedRoute />} >
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/teams' element={<Clubes />} />
              <Route path='/subirFoto' element={<UploadProfilePicture/>} />
          </Route> 
        </Routes>
      </BrowserRouter>
      </TeamProvider>
    </AuthProvider>
  )
}

export default App