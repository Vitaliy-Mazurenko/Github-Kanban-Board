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
  comments: string;
}

function App() {
  const [title, setTitle] = useState<string>('https://api.github.com/repos/facebook/react/issues');
  const [repo, setRepo] = useState<IList[]>([]);
  const [stars, setStars] = useState<number>(0);
  const today: Date = new Date();
console.log(today);

  const getURL = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const starCount = await getStarCount('facebook', 'react').then((starsCount) => {
      console.log(`Total star count: ${starsCount}`);
      setStars(starsCount);
  });
  console.log(stars);  //

    return await fetch(title, {
			method: 'GET',
      headers: {
        // 'Authorization': 'Bearer e72e16c7e42f292c6912e7710c838347ae178b4a',
        'X-GitHub-Api-Version': '2022-11-28'
      }
		})
    .then((res) => res.json())
		.then((result) => setRepo(result))
		.catch((error) => {
		console.error('Error request:', error);
		});
	};

  useEffect(() => {
    console.log(repo);
		setRepo(repo);
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
                {(!!repo && typeof repo[0] !== 'undefined') && repo!.map((item) => (
                <Card bg="white" className="mb-2" key={item.id}>
                <Card.Body>
                    <Card.Title>{item.title} </Card.Title>
                    <Card.Text className="text-secondary">
                      opened {dateCalculate(item.created_at)} days ago
                        <p>Comments {item.comments}</p>
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
