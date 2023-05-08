import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {LinkContainer} from 'react-router-bootstrap';
import SearchBar from './Searchbar';
import {Link} from 'react-router-dom';
import Searchbar from "./Searchbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function Navbar1() {
    return (
        <Navbar className="navbar" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand as={Link} to="/home">SnapTag</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                        <Nav.Link as={Link} to="/favourite">My Favourite</Nav.Link>
                        <Nav.Link className="upload-button" as={Link} to="/upload">Upload</Nav.Link>
                        <Nav.Link className="filter-button" as={Link} to="/filter">Filter</Nav.Link>
                    </Nav>
                    <Searchbar className="d-flex"/>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navbar1;
