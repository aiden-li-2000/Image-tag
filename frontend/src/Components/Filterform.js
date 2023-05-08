import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from 'axios';

const animeTags = [
    {title: 'reimu'},
    {title: 'touhou'},
    {title: 'thonk'},
    {title: 'angery'},
    {title: 'anxious'},
    {title: 'approve'},
    {title: 'comfy'},
    {title: 'concern'},
    {title: 'confusion'},
    {title: 'cringe'},
    {title: 'disapprove'},
    {title: 'disbelief'},
    {title: 'disgust'},
    {title: 'akko'},
    {title: 'dumb'},
    {title: 'embarassed'},
    {title: 'excited'},
    {title: 'happy'},
    {title: 'kino'},
    {title: 'laughing'},
    {title: 'pout'},
    {title: 'random'},
    {title: 'haruhi'},
    {title: 'mii being bullied'},
    {title: 'sad'},
    {title: 'scared'},
    {title: 'shrug'},
    {title: 'smug'},
    {title: 'jashin chan'},
    {title: 'tohru'},
    {title: 'templates'},
    {title: 'kaguya'},
    {title: 'thinking'},
    {title: 'consider'},
    {title: 'tired'},
    {title: 'unamused'}
]

const orderby = ["TimeStamp", "Image Name"];

const f = [["Yes", 1],["No", 0]];
const selectMode = [["Or", 1],["And", 0]];
const orderByList = [["Image Name", "name"], ["Image ID", "id"], ["Size X", "sizeX"], ["Size Y", "sizeY"],
                     ["Access Frequency", "accessfreq"], ["Access Time", "accesstime"], ["Create time", "createtime"]];
const orderModeList = [["Asc", "ASC"], ["Desc", "DESC"]];

export default function FilterForm() {
    const history = useHistory();
    const [tag, setTag] = useState([]);
    const [fav, setFav] = useState(0);
    const [mode, setMode] = useState(1);
    const [images, setImages] = useState(null);
    const [orderBy, setOrderby] = useState("name");
    const [orderMode, setOrdermode] = useState("ASC");
    const [qtag, setQtag] = useState([]);
    const [qfav, setQfav] = useState("");
    const [qmode, setQmode] = useState("");
    const [qorderBy, setQorderBy] = useState("");
    const [qorderMode, setQorderMode] = useState("");

    const handleChangeTag = (e, value) => {
        e.preventDefault();
        let curTag = []
        for (let i = 0; i < value.length; i++) {
            curTag.push(value[i].title)
        }
        setTag(curTag)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setQmode(mode);
        setQtag(tag);
        setQfav(fav);
        setQorderBy(orderBy);
        setQorderMode(orderMode);
    }

    useEffect(() => {
        console.log("before post filter: ")
        console.log("mode " + mode)
        console.log(tag)
        console.log(fav)
        console.log(orderBy)
        console.log(orderMode)
        if (qmode !== "" && qfav !== "" && qtag !== [] && qorderBy !== "" && qorderMode !== "") {
            axios
                .post('http://127.0.0.1:5000/filterbytags', {
                    tags: tag,
                    favourite: fav,
                    mode: mode,
                    orderby: orderBy,
                    order: orderMode
                })
                .then(data => {
                    console.log("hey !")
                    console.log(data);
                    setImages(data.data);
                })
                .catch(
                    function (error) {
                        console.log('Error', error.message);
                    })
        }
    }, [qmode, qtag, qfav, qorderBy, qorderMode])

    useEffect(() => {
        if (images) {
            history.push(
                {
                    pathname: '/filter-results',
                    state: {images, tag, fav, mode}
                }
            );
        }
    }, [images])
    return (
        <Container maxWidth="sm" style={{marginTop: '30px'}}>
            <h2>Filter for your images</h2>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': {m: 1, width: '25ch'},
                }}
                noValidate
                autoComplete="off"
                justifyContent="flex-end"
            >
                <div>
                    <Autocomplete
                        multiple
                        filterSelectedOptions
                        id="tags-standard"
                        options={animeTags}
                        getOptionLabel={(option) => option.title}
                        defaultValue={[]}
                        onChange={handleChangeTag}
                        renderInput={(params) => (
                            <TextField
                            {...params}
                            variant="standard"
                            label="Multiple values"
                            placeholder="Add tags"
                            />
                        )}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-select-type"
                        select
                        label="Select"
                        helperText="Is it one of your favorite images?"
                        defaultValue="0"
                        onChange={(e) => setFav(e.target.value)}
                    >
                        {f.map((sf) => (
                            <MenuItem key={sf[0]} value={sf[1]}>
                                {sf[0]}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div>
                    <TextField
                        id="outlined-select-size"
                        select
                        label="Select"
                        helperText="Please select AND or OR mode"
                        defaultValue="1"
                        onChange={(e) => setMode(e.target.value)}
                    >
                        {selectMode.map((option) => (
                            <MenuItem key={option[0]} value={option[1]}>
                                {option[0]}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div>
                    <TextField
                        id="outlined-select-size"
                        select
                        label="Select"
                        helperText="How do you want to order the images"
                        defaultValue="name"
                        onChange={(e) => setOrderby(e.target.value)}
                    >
                        {orderByList.map((option) => (
                            <MenuItem key={option[0]} value={option[1]}>
                                {option[0]}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div>
                    <TextField
                        id="outlined-select-size"
                        select
                        label="Select"
                        helperText="Ascending or descending"
                        defaultValue="ASC"
                        onChange={(e) => setOrdermode(e.target.value)}
                    >
                        {orderModeList.map((option) => (
                            <MenuItem key={option[0]} value={option[1]}>
                                {option[0]}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div className="filterform-button-div">
                    <Button variant="outlined" color="success" onClick={(e) => {
                        handleSubmit(e)
                    }}> Filter </Button>
                </div>
            </Box>
        </Container>
    );
}