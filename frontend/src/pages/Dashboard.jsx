import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"

function Dashboard() {

  const {user} = useAuth()
  return (
    <div>
      Dashboard de {user.name} {user.lastname}<br/>
      team: {user.teamName}
      <p>Estadisticas
      </p>
      <Link to="/teams" className="bg-green-600 rounded-md px-5 py-2">Buscar club</Link>
    </div>
  )
}

export default Dashboard