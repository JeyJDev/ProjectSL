import axios from "./axios";

export const getTeamRequest = () => axios.get('/teams')

export const enviarSolicitud = (id, user) => axios.post(`/teams/${id}/solicitar`, user)

export const uploadImage = async (playerId, imageData) => {
    try {
      const formData = new FormData();
      formData.append('image', imageData);
      formData.append('playerId', playerId); // Agrega el ID del jugador al formulario
  
      const response = await axios.post('/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };