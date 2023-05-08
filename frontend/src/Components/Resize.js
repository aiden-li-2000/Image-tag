import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import * as React from "react";
import Alert from '@mui/material/Alert';
import './Resize.css';
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';

export default function ResizePopup(props) {
    const history = useHistory();
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [newname, setNewName] = useState("");
    const [query, setQuery] = useState("");
    const [msg, setMsg] = useState("");

    const handleChangeH = (e) => {
        e.preventDefault();
        const re = /^[1-9\b][0-9\b]*$/;
        if (e.target.value == '' || re.test(e.target.value)) {
            setHeight(e.target.value);
        }
    }

    const handleChangeW = (e) => {
        e.preventDefault();
        const re = /^[1-9\b][0-9\b]*$/;
        if (e.target.value == '' || re.test(e.target.value)) {
            setWidth(e.target.value);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        props.setTrigger(false);
        console.log("oldname" + props.name)
        setQuery({"oldname": props.name, "newname": newname, "sizey": height, "sizex": width});
    }

    useEffect(() => {
        console.log(query)
        console.log(props.id)
        console.log(props.name)
        if (query !== "") {
            console.log("hi" + query)
            axios
                .post('http://127.0.0.1:5000/resize', {
                    oldname: query.oldname,
                    newname: query.newname,
                    sizex: parseInt(query.sizex),
                    sizey: parseInt(query.sizey),
                    headers: {'Content-Type': 'application/json; charset=utf-8'}
                })
                .then(data => {
                    console.log(data);
                    console.log("request is received!");
                })
                .catch(
                    function (error) {
                        console.log('Error:', error.message);
                        setMsg(`Your request to change ${props.name}'s size failed!`);
                    }
                )
        }
    }, [query])

    useEffect(() => {
        if (msg !== "") {
            alert(msg);
            <Alert severity="error">Something's wrong with your request! Please check again!</Alert>
            setMsg("")
        }
    }, [msg])

    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <Box>
                    <div>
                        <TextField
                            id="outlined-select-type"
                            placeholder="New name"
                            helperText="Input a non-empty new name for your resized image please!"
                            value={newname}
                            onChange={(e) => {
                                setNewName(e.target.value)
                            }}
                        />
                    </div>
                    <div>
                        <TextField
                            id="outlined-select-type"
                            placeholder="Height"
                            helperText="Input value for height must be a positive integer"
                            value={height}
                            onChange={(e) => {
                                handleChangeH(e)
                            }}
                        />
                    </div>
                    <div>
                        <TextField
                            id="outlined-select-type"
                            placeholder="Width"
                            helperText="Input value for width must be a positive integer"
                            value={width}
                            onChange={(e) => {
                                handleChangeW(e)
                            }}
                        />
                    </div>
                </Box>
                <Box>
                    <Button variant="outlined" color="success" onClick={(e) => {
                        handleSubmit(e)
                    }}> Submit </Button>
                    <Button variant="outlined" color="success" onClick={(e) => {
                        props.setTrigger(false)
                    }}> Cancel </Button>
                </Box>
            </div>
        </div>
    ) : "";
}