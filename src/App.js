import './App.css';
import { useDispatch,useSelector } from 'react-redux';
import  { fetchTodos } from './redux/slice/todo';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import { Row } from 'react-bootstrap';
import Col from "react-bootstrap/Col";


function App() {

  const [query,setQuery]=useState("Nature")
  fetchTodos(query)

  const dispatch =useDispatch();
  const state =useSelector(state => state);
  console.log(state,"goodjob")
  if(state.todo.isLoading){
    return <h1>Loading.....</h1>
  
  }
 
  return (
    <div className="App">
     <Navbar bg="primary" expand="lg">
      <Container fluid style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        
       
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
                      {item.text}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </Container>

  
    </div>
  );
}

export default App;
