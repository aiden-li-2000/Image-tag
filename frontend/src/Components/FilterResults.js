import {useLocation} from 'react-router-dom';
import * as React from "react";
import ImageListDisplay from "./ImageList";
import Container from '@mui/material/Container';

export default function FilterResults() {
    const location = useLocation();
    const {images, query} = location.state;
    // // const images = data["data"];
    return (
        <Container style={{marginTop: '30px'}}>
            <h2>Filter results: </h2>
            {/*{error && <h3>{error}</h3>}*/}
            {images &&
                <div
                    className="filter-results"
                    style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    {/*{error && <div>{error}</div>}*/}
                    {/*{isPending && <div>Loading...</div>}*/}
                    <ImageListDisplay images={images["data"]}/>
                </div>}
        </Container>
    );
}