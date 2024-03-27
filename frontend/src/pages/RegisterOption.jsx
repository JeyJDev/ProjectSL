import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import { useEffect } from "react"

function LoginPage() {

  return (
    <div className='items-center justify-center flex h-[calc(100vh-100px)]'>
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        <div className="w-full"><h1 className="text-2xl font-bold">Seleccione el tipo de cuenta</h1></div>
        <div className="flex space-x-2">
          <div className="w-1/2 bg-zinc-700 text-white rounded-md my-2 border-2 border-zinc-700 hover:border-green-600 hover:outline-none transition-colors duration-700">
              <Link to="/register-player" className='text-green-600 items-center justify-center flex flex-col'>
                <div className="p-2">
                  <img src="../../public/logoGris2.png"/>
                </div>
                <h1>Futbolista</h1>
              </Link>
          </div>
          <div className="w-1/2 bg-zinc-700 text-white rounded-md my-2 border-2 border-zinc-700 hover:border-green-600 hover:outline-none transition-colors duration-700">
              <Link to="/register-team" className='text-green-600 items-center justify-center flex flex-col'>
                <div className="p-2">
                  <img src="../../public/logoGris2.png"/>
                </div>
                <h1>Club</h1>
              </Link>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default LoginPage