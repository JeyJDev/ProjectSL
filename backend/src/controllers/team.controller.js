import Team from '../models/team.model.js'

export const getTeams = async (req, res) =>{
    const teams = await Team.find()

    //return res.json(teams)
    return res.json(teams.map(team =>({
        id: team._id,
        name: team.name,
        teamName: team.teamName
    })))
}
