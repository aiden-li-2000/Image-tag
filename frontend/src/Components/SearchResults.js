import {useLocation} from 'react-router-dom';
import * as React from "react";
import ImageListDisplay from "./ImageList";
import Container from '@mui/material/Container';

export default function SearchResults() {
    const location = useLocation();
    const {images, name} = location.state;
    // // const images = data["data"];
    console.log("inside search-results: " + images);
    console.log("inside search-results: " + name);
    console.log("\n")
    return (
        <Container>
            <h2>Images with name like"{name}"</h2>
            {/*{error && <h3>{error}</h3>}*/}
            {images &&
                <div
                    className="search-results"
                    style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    {/*{error && <div>{error}</div>}*/}
                    {/*{isPending && <div>Loading...</div>}*/}
                    <ImageListDisplay images={images["data"]}/>
                </div>}
        </Container>
    );
}