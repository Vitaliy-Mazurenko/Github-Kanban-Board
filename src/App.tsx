import { useState,  useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { getStarCount } from './helpers/starCount';
import dateCalculate  from './helpers/dateCalculate'; 
import star from "./assets/star_favourite.svg";

interface IList {
  id: number;
  title: string;
  created_at: string;
  number: number;
  comments: string;
}

function App() {
  const [path, setTitle] = useState<string>('https://github.com/facebook/react');
  const [repo, setRepo] = useState<IList[]>([]);
  const [stars, setStars] = useState<number>(0);

  const getURL = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (checkPath(path)) {
      let reposPath: string;
      if (path.endsWith('/')) {
        reposPath = path.substring(0, path.length - 1).split('github.com')[1];
      } else {
        reposPath = path.split('github.com')[1];
      }
   
    try {
      const starsCount = await getStarCount(reposPath.split('/')[1], reposPath.split('/')[2]);
      setStars(starsCount);
    } catch (error) {
      console.error('Error fetching star count:', error);
    }

    try {
      const res = await fetch(`https://api.github.com/repos${reposPath}/issues`, {
        method: 'GET',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });
      const result = await res.json();
      setRepo(result);
    } catch (error) {
      console.error('Error request:', error);
    }
  }
  };

  function checkPath(path: string): boolean {
    if (!path.includes('github.com')) {
      return false
    }
    return path.length > 0;
  }

  useEffect(() => {
    console.log(repo);
	}, [repo]);

  return (
    <div className="App">
      <header className="App-header mx-2">
      <InputGroup className="mt-4" >
        <Form.Control
          id="basic-url"
          placeholder="Enter repo URL"
          type="url"
          aria-describedby="basic-addon3"
          value={path}
          required
          onChange={(e) => setTitle(e.target.value)} />
        <Button
          variant="outline-secondary"
          id="button-addon2"
          className="mx-1"
          type="submit"
          onClick={getURL}>
        Load issues
        </Button>
      </InputGroup>
      </header>
      <Breadcrumb className="mx-3 mt-1">
      <Breadcrumb.Item href="#">Facebook</Breadcrumb.Item>
      <Breadcrumb.Item href="#">
        React
      </Breadcrumb.Item>
			      <span className='star-rating'><img src={star} alt="star" />
            <span className='stars mx-1 text-black'>{stars} stars</span>
            </span>
      </Breadcrumb>

      <Container fluid>
            <Row nogutters="true">
                <Col xs={12} sm={4}>
                <div className='text-center'>ToDo</div>
                <div className='cards-column p-2 my-2'>
                {!!repo.length && repo.map((item) => (
                <Card bg="white" className="mb-2" key={item.id}>
                <Card.Body>
                    <Card.Title>{item.title} </Card.Title>
                    <Card.Text className="text-secondary">
                    #{item.number} opened {dateCalculate(item.created_at) ?
                     dateCalculate(item.created_at) +' days ago' : ' today'} 
                        <p>Admin | Comments: {item.comments}</p>
                    </Card.Text>
                </Card.Body>
                </Card>
			))}

                </div>
                </Col>
                <Col xs={12} sm={4}>
                <div className='text-center'>In Progress</div>
                <div className='cards-column p-2 my-2'>
                <Card bg="white" className="mb-2">
                <Card.Body>
                    <Card.Title>Welcome to </Card.Title>
                    <Card.Text className="text-secondary">
                        
                    </Card.Text>
                </Card.Body>
                </Card>
                </div>
                </Col>
                <Col xs={12} sm={4}>
                <div className='text-center'>Done</div>
                <div className='cards-column p-2 my-2'>
                <Card bg="white" className="mb-2">
                <Card.Body>
                    <Card.Title>Welcome to </Card.Title>
                    <Card.Text className="text-secondary">
                        
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
