import * as React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Upload from './Upload';
import Favourite from './Favourite';
import ImageDetails from './ImageDetails';
import Filterform from './Components/Filterform';
import Searchbar from "./Components/Searchbar";
import SearchResults from "./Components/SearchResults"
import FilterResults from "./Components/FilterResults"

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className='content'>
          <Switch>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/upload">
              <Upload />
            </Route>
            <Route exact path="/favourite">
              <Favourite />
            </Route>
            <Route exact path="/selectid/:id">
              <ImageDetails />
            </Route>
            <Route exact path="/filter">
              <Filterform />
            </Route>
            <Route exact path="/searchname">
              <Searchbar />
            </Route>
            <Route exact path="/search-results">
              <SearchResults />
            </Route>
            <Route exact path="/filter-results">
              <FilterResults />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
