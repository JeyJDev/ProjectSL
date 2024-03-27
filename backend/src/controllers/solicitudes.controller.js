import Team from "../models/team.model.js"
import Player from "../models/player.model.js";

// Ruta para que un jugador envíe una solicitud para unirse a un equipo
export const enviarSolicitud = async (req, res) => {
    const { teamId } = req.params;
    const { playerId, } = req.body;
    

    try {
        // Agregar playerId a las solicitudes del equipo
        await Team.findByIdAndUpdate(teamId, { $push: { solicitudes: playerId } });
        res.status(200).json({ message: 'Solicitud enviada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al procesar la solicitud' });
    }

};

// Ruta para que un equipo acepte la solicitud de un jugador
export const aceptarSolicitud = async (req, res) => {
    const { teamId, playerId } = req.params;
    console.log(req.params)

    const teamFound = await Team.findById(teamId)
    if(!teamFound) return('user not found')

    const team = teamFound.teamName

    const playerFound = await Player.findById(playerId)
    if(!playerFound) return('user not found')

    const jugador = playerFound
    console.log(jugador)

    try {
        // Actualizar el campo de equipo en la colección Player y jugadores en la colección Team
        await Player.findByIdAndUpdate(playerId, { team: team });
        await Team.findByIdAndUpdate(teamId, { $push: { jugadores: {name: jugador.name, lastname: jugador.lastname} }, $pull: { solicitudes: playerId } });

        res.status(200).json({ message: 'Solicitud aceptada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al aceptar la solicitud' });
    }
};
