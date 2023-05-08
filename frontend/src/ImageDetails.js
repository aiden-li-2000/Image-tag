import {useLocation, useParams} from "react-router-dom";
import Delete from "./Components/Delete";
import Rename from "./Components/Rename";
import ResizePopup from "./Components/Resize";
import {useState} from "react";
import Button from "@mui/material/Button";
import axios from 'axios';
import React, {useEffect} from 'react';
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import ButtonGroup from '@mui/material/ButtonGroup';

const ImageDetails = (props) => {
    const {id} = useParams();
    const location = useLocation();
    const {newimg} = location.state;
    const [popup, setPopup] = useState(false);
    const [fav, setFav] = useState(null);
    const [atag, setAtag] = useState(false);
    const [utag, setUtag] = useState(false);
    const [assignedTags, setAssignedTags] = useState([])
    const [unassignedTags, setUnassignedTags] = useState([])
    const [rtag, setRtag] = useState([])
    const [qrtag, setQrtag] = useState([])
    // const [name, setName] = useState(newimg.name);
    // setName(newimg.name)
    console.log("set new name")
    console.log(newimg.name)
    // console.log(name)
    // console.log(image);
    // const { data: image, isPending, error } = UseFetch("http://127.0.0.1:5000/selectid/" + id);

    const buttons = [
      <Button variant="outlined" color="success" onClick={(e) => {
          setFav(true)
      }}> Set as my favorite </Button>,
      <Button variant="outlined" color="success" onClick={(e) => {
          setFav(false)
      }}> Remove from my favorites </Button>,
      <Button variant="outlined" color="success" onClick={(e) => {
          setAtag(true);
          setUtag(false);
      }}> Add new tags to {newimg.name}</Button>,
      <Button variant="outlined" color="success" onClick={(e) => {
          setUtag(true);
          setAtag(false);
      }}> Remove existing tags from {newimg.name}</Button>,
      <Button variant="outlined" color="success" onClick={(e) => {
          setPopup(true)
      }}> Resize </Button>,
    ]

    const handleChangeTag = (e, value) => {
        e.preventDefault();
        let curTag = []
        console.log("print value:")
        console.log(value)
        for (let i = 0; i < value.length; i++) {
            curTag.push(value[i][1])
        }
        console.log("curtag:")
        console.log(curTag)
        setRtag(curTag)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setQrtag(rtag);
    }

    useEffect(() => {
        if (fav !== null) {
            axios
                .post('http://127.0.0.1:5000/togglefav', {
                    name: newimg.name,
                    fav: fav
                })
        }
    }, [fav])

    useEffect(() => {
        if (atag || utag) {
            axios.post('http://127.0.0.1:5000/assignedtags',
                {imageID: newimg.id}
            )
                .then(r => {
                    console.log(r)
                    setAssignedTags(r["data"]["Assigned"])
                    setUnassignedTags(r["data"]["NotAssigned"])
                })
        }
    }, [atag, utag])

    useEffect(() => {
        if (assignedTags !== [] || unassignedTags !== []) {
            console.log("-----")
            console.log(assignedTags);
            console.log(unassignedTags)
            console.log("-----")
        }
    }, [assignedTags, unassignedTags])

    useEffect(() => {
        if (qrtag !== []) {
            console.log("useEffect:")

            console.log(rtag)
            if (atag) {
                console.log("assign")
                axios
                    .post('http://127.0.0.1:5000/assigntags', {
                        tagIDs: rtag,
                        imageID: newimg.id
                    })
            }
            if (utag) {
                console.log("unassign")
                axios
                    .post('http://127.0.0.1:5000/unassigntags', {
                        tagIDs: rtag,
                        imageID: newimg.id
                    })
                    .then(data => {
                        console.log(data)
                    })
            }

        }
    }, [qrtag])

    return (
        <Container className="image-details" maxWidth="sm" style={{marginTop: '30px'}}>
            {/*{isPending && <div>replace me with some loading icons</div>}*/}
            {/*{error && <div> replace me with some error messages </div>}*/}
            <Stack  spacing={2} direction="column">
              {newimg && (
                  <div>
                      <h2>{newimg.name}</h2>
                      <img
                          src={require(`../../backend/Repo-Chan/${newimg.name}?w=248&fit=crop&auto=format`)}
                          alt={newimg.id}
                          loading="lazy"
                      />
                  </div>

              )}
              <Rename id={newimg.id} name={newimg.name}></Rename>
              <Delete name={newimg.name}/>
            </Stack>

            <ButtonGroup
              orientation="vertical"
              aria-label="vertical outlined button group"
              style={{marginTop: '25px'}}
            >
              {buttons}
            </ButtonGroup>

            <ResizePopup name={newimg.name} id={id} trigger={popup} setTrigger={setPopup}/>
            {atag &&
                <div>
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
                                options={unassignedTags}
                                getOptionLabel={(option) => option[0]}
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
                        <div className="filterform-button-div">
                            <Button variant="outlined" color="success" onClick={(e) => {
                                handleSubmit(e)
                            }}> Add the selected new tags to the image </Button>
                        </div>
                    </Box>
                </div>}
            {utag &&
                <div>
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
                                options={assignedTags}
                                getOptionLabel={(option) => option[0]}
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
                        <div className="filterform-button-div">
                            <Button variant="outlined" color="success" onClick={(e) => {
                                handleSubmit(e)
                            }}> Remove these tags from the image</Button>
                        </div>
                    </Box>
                </div>}
        </Container>
    );
}

export default ImageDetails;

