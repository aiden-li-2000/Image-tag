import React, {useEffect} from 'react'
import {useState} from 'react'
import axios from 'axios'
import ImageListDisplay from "./Components/ImageList";
import useFetch from "./Components/UseFetch";

const Favourite = () => {

    const { error, isPending, data: images } = useFetch('http://127.0.0.1:5000/getfavourites');
    console.log("HHH");
    console.log(images)
    return (
    <div
      className="favourites"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { images && <ImageListDisplay images={images.data} /> }
    </div>
  );
}

export default Favourite;