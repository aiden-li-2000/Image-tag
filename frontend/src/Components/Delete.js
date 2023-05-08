import React from 'react'
import Button from '@mui/material/Button';
import axios from 'axios'

const Delete = (props) => {
    const url = 'http://127.0.0.1:5000/delete'
    function handleDelete() {
        axios.post(url, {name: props.name})
        .then((result) => {
            console.log(result)
        })
        window.location.replace('http://localhost:3000/home');
    }

    return (
        <div className="delete-div">
            <Button variant="outlined" color="success" onClick={handleDelete}>Delete Image</Button>
        </div>
    );
}

export default Delete;