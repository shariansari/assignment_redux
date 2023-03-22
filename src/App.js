import './App.css';
import { useDispatch,useSelector } from 'react-redux';
import  { fetchTodos } from './redux/slice/todo';
import React, { useState,useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import { Row } from 'react-bootstrap';
import Col from "react-bootstrap/Col";
import { NavDropdown } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';


function App() {
  const [show, setShow] = useState(false);
  const [mo, setMo] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = (r) =>{
    setMo(r);
        setShow(true);
  } 

  const [query,setQuery]=useState("Nature")
  
  const dispatch =useDispatch();
  useEffect(()=>{
dispatch(fetchTodos(query))
  },[])
  const state =useSelector(state => state);
  console.log(state,"goodjob")
  if(state.todo.isLoading){
    return <h1>Loading.....</h1>
  
  }
 
  return (
    <div className="App">
     <Navbar bg="primary" expand="lg">
   
      <Container fluid style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
      <NavDropdown title="Grid View" id="navbarScrollingDropdown" style={{marginRight:"10px"}}>
              <NavDropdown.Item href="#action3">5 in a row</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                4 in a row
              </NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                3 in a row
              </NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                2 in a row
              </NavDropdown.Item>
              
            </NavDropdown>
       
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search What to you want to see"
              className="me-2"
              aria-label="Search"
              style={{width:"70vw"}}
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
            />
            <Button variant="outline-success" style={{background:"orange",color:"white"}}onClick={(e)=>dispatch(fetchTodos(query))} >Search</Button>
          </Form>
        
      </Container>
    </Navbar>
    <Container>


    <div className="container">
        <div>
          <Row xs={1} md={3} className="g-4">
            {state.todo&&state.todo.data&&state.todo.data.photos.map((item, idx) => (
              <Col key={idx}>
                <Card
                  className="container mt-3 p-4container mt-3 p-4 shadow p-3 mb-5 bg-body rounded"
                  key={idx}
                >
                  <Card.Img variant="top" src={item.src.landscape} alt={item.alt} />
                  <Card.Body className="text-center">
                    <Card.Title className="text-primary">
                      {item.title}
                    </Card.Title>
                    <Card.Text style={{ fontWeight: "700" }}>
                      <button className='btn btn-primary' variant="primary" onClick={()=>handleShow(item)}>view Properties</button>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{mo.alt}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p> <strong>Photographer Name :</strong>{mo.photographer}</p>
            <p><strong>Photographer Url :</strong>{mo.photographer_url}</p>
            <p><strong>Photographer id :</strong>{mo.id}</p>
            <p><strong>Original Height :</strong>{mo.height} px</p>
            <p><strong>Original width :</strong>{mo.width} px</p>



            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
    </Container>

  
    </div>
  );
}

export default App;
