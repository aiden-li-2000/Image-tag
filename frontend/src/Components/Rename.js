import React, {useEffect} from 'react'
import {useState} from 'react'
import axios from 'axios'
import {useHistory} from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Rename = (props) => {
    const [name, setName] = useState('');
    // const [newname, setNewname] = useState(null);
    const [newimg, setNewimg] = useState(null);
    const history = useHistory();

    function handleImageRename(event) {
        console.log(event.target.value)
        setName(event.target.value)
    }

    // console.log("before axios post rename " + props.name)

    const url = 'http://127.0.0.1:5000/rename'
    function handleRename() {
        axios.post(url, {oldname: props.name, newname: name})
        .then((result) => {
            // console.log(result)
            // if (result)
            // setNewname(name);
            // console.log("in rename: we set result to: ")
            // console.log(result.data['Result'])
            setNewimg(result.data['Result'])
        })
    }

    useEffect(() => {
        if (newimg) {
            // console.log("hello, after axios post")
            // console.log(newimg);
            history.push(
                {
                    pathname:   `/selectid/${props.id}`,
                    state: {newimg}
                }
            );
        }
    }, [newimg])

    return (
        <div className="rename-div">
            <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={handleImageRename}/>
            <Button variant="outlined" color="success" onClick={handleRename}>Rename</Button>
        </div>
    );
}

export default Rename;