import { useEffect } from "react"
import { useTeams } from "../context/TeamContext"
import { useAuth } from "../context/AuthContext"

function Clubes() {

    const {getTeams, teams, joinTeam} = useTeams()
    const { user } = useAuth()    

    useEffect(() =>{
        getTeams()
    }, [])

  return (
    <div className="bg-zinc-700">
        {
            teams.map(team => (
                <div key={team.id} className="flex flex-col p-0 items-center bg-zinc-800 space-y-2">
                    <div className="flex w-full space-x-2 top-0">
                        <div className="w-1/5 items-center justify-center flex flex-col">
                            <h2>{team.teamName}</h2>
                            <img src="../../public/vite.svg"/>
                            <p>{team.jugadores}</p>
                        </div>
                        <div className="flex items-center justify-center px-0">
                            <button className="bg-green-600 rounded-md px-5 py-2">Ver información</button>
                        </div>
                        
                        <div className="flex items-center justify-center px-0">
                            <button
                                className="bg-green-600 rounded-md px-5 py-2"
                                onClick={() => {
                                    joinTeam(team.id, user)
                                    console.log(`${user.name} ha solicitado unirse a ${team.teamName}`)
                                }}
                                >Unirse</button> 
                        </div>
                    </div>
                    <hr className="bg-sky-500 w-full h"/>
                </div>
                
                
            ))
        }
        
    </div>
  )
}

export default Clubes