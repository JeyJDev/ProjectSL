import React, { useState } from 'react';
import { uploadImage } from '../api/team';

function UploadProfilePicture({ playerId }) {
    
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  const handleImageUpload = async () => {
    try {
      if (image) {
        await uploadImage(playerId, image);
        // Handle success (e.g., show a success message)
      }
    } catch (error) {
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload Image</button>
    </div>
  );


}

export default UploadProfilePicture;