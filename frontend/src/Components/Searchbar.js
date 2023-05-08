import {useEffect, useState} from "react"
import axios from "axios";
import Button from "@mui/material/Button";
import * as React from "react";
import {useHistory} from "react-router-dom";

// TODO import some css file

export default function Searchbar() {
    const history = useHistory();
    const [input, setInput] = useState("");
    const [name, setName] = useState("");
    const [images, setImages] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("here input: " + input);
        setName(input);
    }

    useEffect(() => {
        if (name !== "") {
            console.log("!name: " + name);
            axios
                .post('http://127.0.0.1:5000/selectname', {
                    name: name
                })
                // .then(res => {
                //     console.log(res.status)
                //     console.log(res.status !== 200);
                //     if (res.status !== 200) { // error coming back from server
                //         console.log("ugh")
                //         throw Error(`HTTP error, status = ${res.status}`);
                //     }
                // })
                .then(data => {
                    console.log(data.data);
                    setImages(data.data);
                })
                .catch(
                    function (error) {
                        console.log('Error', error.message);
                    })

            // .catch(err => {
            //
            //     // auto catches network / connection error
            //     setIsPending(false);
            //     setError(err.message);
            // }
        }
    }, [name])

    useEffect(() => {
        if (images) {
            history.push(
                // '/search-results'
                {
                    pathname: '/search-results',
                    // state: {"images": images, "name": name, "type": "search"}
                    state: {images, name}
                }
            );
        }
    }, [images])

    return (
        <>
            <div className="SearchBar">
                {/* <label>
                    <span className="searchbar-label">SnapTag</span>
                </label> */}
                <input placeholder="Enter a name of image"
                       type="text"
                       value={input}
                       onChange={(e) => setInput(e.target.value)}
                />
                <Button variant="outlined" color='success' onClick={(e) => {
                    handleSearch(e)
                }}>search</Button>
            </div>
        </>
    )
}
