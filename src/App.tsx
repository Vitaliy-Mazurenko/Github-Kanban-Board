import React from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <InputGroup className="mt-3">
        <InputGroup.Text id="basic-addon3" className="me-2">
        </InputGroup.Text>
        <Form.Control id="basic-url" placeholder="Enter repo URL" type="url" aria-describedby="basic-addon3" />
        <Button variant="outline-secondary" id="button-addon2" className="m-2">
        Load issues
        </Button>
      </InputGroup>

      </header>
    </div>
  );
}

export default App;
