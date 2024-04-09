import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function App() {
  const [title, setTitle] = useState<string>('');
  const [repo, setRepo] = useState();

  const getURL = (e: React.SyntheticEvent) => {
    e.preventDefault();
		fetch(title)
		.then((res) => res.json())
		.then((result) => setRepo(result.data));
    console.log(repo);
	};

  return (
    <div className="App">
      <header className="App-header mx-2">
      <InputGroup className="mt-4" >
        <Form.Control
          id="basic-url"
          placeholder="Enter repo URL"
          type="url"
          aria-describedby="basic-addon3"
          value={title}
          onChange={(e) => setTitle(e.target.value)} />
        <Button
          variant="outline-secondary"
          id="button-addon2"
          className="mx-1"
          onClick={getURL}>
        Load issues
        </Button>
      </InputGroup>
      </header>
      <Breadcrumb className="mx-3 my-1">
      <Breadcrumb.Item href="#">Facebook</Breadcrumb.Item>
      <Breadcrumb.Item href="#">
        React
      </Breadcrumb.Item>
    </Breadcrumb>
      <Container fluid>
            <Row nogutters="true">
                <Col xs={12} sm={4}>
                <div className='column p-2'>
                <Card bg="light">
                <Card.Body>
                    <Card.Title>Welcome to </Card.Title>
                    <Card.Text className="text-secondary">
                        Discover the beauty of React Bootstrap Layout
                    </Card.Text>
                </Card.Body>
                </Card>
                </div>
                </Col>
                <Col xs={12} sm={4}>
                <div className='column p-2'>
                <Card bg="light">
                <Card.Body>
                    <Card.Title>Welcome to </Card.Title>
                    <Card.Text className="text-secondary">
                        Discover the beauty of React Bootstrap Layout 2
                    </Card.Text>
                </Card.Body>
                </Card>
                </div>
                </Col>
                <Col xs={12} sm={4}>
                <div className='column p-2'>
                <Card bg="light">
                <Card.Body>
                    <Card.Title>Welcome to </Card.Title>
                    <Card.Text className="text-secondary">
                        Discover the beauty of React Bootstrap Layout 3
                    </Card.Text>
                </Card.Body>
                </Card>
                </div>
                </Col>
            </Row>
        </Container>
    </div>
  );
}

export default App;
