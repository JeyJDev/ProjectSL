import { createContext, useContext, useState } from "react";
import { enviarSolicitud, getTeamRequest } from "../api/team";

export const TeamContext = createContext()

export const useTeams = () =>{
    const context = useContext(TeamContext)
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export function TeamProvider({children}){

    const [teams, setTeams] = useState([])

    const getTeams = async () =>{
        try {
            const res = await getTeamRequest()
            setTeams(res.data)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const joinTeam = async (id, user) => {
        try {
            
            const res = await enviarSolicitud(id, user)
            console.log(user)
            if(!res) return console.log('User not authenticated')

            
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <TeamContext.Provider value={{
            teams,
            getTeams,
            joinTeam
        }}>
            {children}
        </TeamContext.Provider>
    )
}