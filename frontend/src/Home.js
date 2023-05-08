import ImageListDisplay from "./Components/ImageList";
import useFetch from "./Components/UseFetch";

const Home = () => {
  const { error, isPending, data: images } = useFetch('http://127.0.0.1:5000/selectallimages?len=20&orderby=name&order=true');

  return (
    <div
      className="home"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { images && <ImageListDisplay images={images.data} /> }
    </div>
  );
}

export default Home;