import Player from "../models/player.model.js"
import Team from "../models/team.model.js";



export const selectTeam = async (req, res) =>{
    const player = await Player.findByIdAndUpdate(req.params.id, req.body,{
        new: true
    })
}

export const uploadImage = async (req, res) => {
    try {
      const { playerId } = req.body;
      const player = await Player.findById(playerId);
  
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }
  
      player.profilePicture = req.file.buffer.toString('base64'); // Guarda la imagen como una cadena Base64
      await player.save();
  
      res.status(200).json({ message: "Image uploaded successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };