import React, { useState } from 'react';
import axios from 'axios';

const FileUploadComponent = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);

        axios
            .post('http://your-backend-url/upload', formData)
            .then((response) => {
                console.log('File uploaded successfully!');
                // Handle success response here
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
                // Handle error response here
            });
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload</button>
        </div>
    );
};

export default FileUploadComponent;
