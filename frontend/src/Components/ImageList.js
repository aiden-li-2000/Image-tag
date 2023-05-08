import {Link, useHistory} from 'react-router-dom';
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import {useEffect, useState} from "react";
import axios from "axios";

const ImageListDisplay = ({images}) => {
    console.log(images);
    const history = useHistory();
    const [newimg, setNewimg] = useState(null);
    const [atl, setAtl] = useState(null);
    const [natl, setNatl] = useState(null);
    const handleClick = (e, newimg) => {
        e.preventDefault();
        setNewimg(newimg);
        console.log('aiden');
    }

    useEffect(() => {
        if (newimg) {

            // console.log("ImageList:");
            // console.log(newimg)
            history.push(
                {
                    pathname: `/selectid/${newimg.id}`,
                    state: {newimg}
                }
            );
        }
    }, [newimg])

    useEffect(() => {
        if (newimg) {
            axios
                .post('http://127.0.0.1:5000//updateaccess', {
                    id: newimg.id,
                })
        }
    }, [newimg])

    return (
        <ImageList sx={{width: 800, height: 1000}}>
            <ImageListItem key="Subheader" cols={2}>
                <ListSubheader component="div">Your Art</ListSubheader>
            </ImageListItem>
            {images.map((image) => (
                <ImageListItem key={image.id}>
                    <img
                        src={require(`../../../backend/Repo-Chan/${image.name}?w=248&fit=crop&auto=format`)}
                        alt={image.id}
                        loading="lazy"
                    />
                    <Link to={`/selectid/${image.id}`} onClick={(e) => {
                        handleClick(e, image)
                    }}>
                        <ImageListItemBar
                            title={image.name}
                            subtitle={image.tags}
                        />
                    </Link>
                </ImageListItem>
            ))}
        </ImageList>
    );
}


export default ImageListDisplay;