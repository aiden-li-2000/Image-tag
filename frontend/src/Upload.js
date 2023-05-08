import React from 'react'
import Container from '@mui/material/Container';
import {useState} from 'react'
import axios from 'axios'

const Upload = () => {
    const [image, setImage] = useState('')

    function handleImage(event) {
        console.log(event.target.files)
        setImage(event.target.files[0])
    }

    function handleUpload() {
        const formData = new FormData()
        formData.append('image', image, image.name)
        axios.post('http://127.0.0.1:5000/upload', {name: image.name}, {
            onUploadProgress: ProgressEvent => {
                console.log("Upload progress: " + Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + "%")
            }
        }).then((result) => {
            console.log(result)
        })
    }

    return (
        <Container maxWidth="sm" style={{marginTop: '30px'}}>
            <h2>Upload your image</h2>
            <div className="upload-div">
                <input multiple type="file" name='file' onChange={handleImage}/>
            </div>
            <div className="upload-button">
                <button onClick={handleUpload}>Upload</button>
            </div>
        </Container>
    );
}

export default Upload;