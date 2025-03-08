import React, { useState } from 'react';

const ImageUploader = ({ setImage , setPreview, preview}) => {

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
// preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <form className='w-52 flex flex-col items-center'>
            <div style={{ width: '150px', height: '150px', border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {preview && <img className='h-40 flex items-center' src={preview} alt="Preview" />}</div>
      <label htmlFor="fileInput" className="text-lg border mt-3 px-3 py-1 rounded-lg border-gray-500 ">
        Choose File
      </label>
      <input type="file" accept="image/*" id='fileInput' name='image' style={{ display: 'none' }} onChange={handleImageChange} />
    </form>
  );
};

export default ImageUploader;
