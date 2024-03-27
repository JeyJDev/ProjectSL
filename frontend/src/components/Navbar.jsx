import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTeams } from "../context/TeamContext";
import { useEffect } from "react";

function Navbar() {

    const {user, isAuthenticated, userType, logout} = useAuth()
    const { teams } = useTeams

    const showUserType = () =>{
        switch(userType){
            case 'player':
                return user.name
            case 'team':
                return user.teamName
        }
    }

    console.log(userType)
    
  return (
    <nav className='bg-zinc-700 flex justify-between py-2 px-10'>
        <Link to={'/'} >
            <h1  className='text-2xl font-bold'>
                Liga Supremacía
            </h1>
        </Link>
        <ul className='flex gap-x-2 items-center'>
            <li>
                <Link to={'/dashboard'}  className="bg-green-600 rounded-md px-7 py-2">{showUserType()}</Link>
            </li>
            <li>
                <Link to={'/subirFoto'} className="bg-green-600 rounded-md px-7 py-2">Perfil</Link>
            </li>
            <li>
                <Link to={'/'} onClick={() => {
                        logout()
                    }}
                    className="bg-green-600 rounded-md px-7 py-2">
                    Cerrar sesión
                </Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar