import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import {
    BrowserRouter as Router,
    Switch, 
    Route,
    Link,
    useRouteMatch
}   from 'react-router-dom';

export default function App() {
    const comments = [
      {
        id: 1,
        title: 'New Cyber Truck',
        date: '11/30/2019',
        content: 'So excited for the new Tesla Cyber Truck!'
      },
      {
        id: 2,
        title: 'Cyber Truck reservation',
        date: '6/17/2020',
        content: 'Today, I reserved my Cyber Truck.'
      },
      {
        id: 3,
        title: 'Whats going on?',
        date: '6/12/2023',
        content: 'Its been almost 4 years, and no Cyber Truck.'
      }
    ];

    return (
      <Container>
        <Router>
          <div>
            <ButtonGroup>
              <Button variant="outline-secondary">
                <Link to="/">Home</Link>
              </Button>
              <Button variant="outline-secondary">
               <Link to="/contact">Contact</Link>
              </Button><Button variant="outline-secondary">
               <Link to="/comments">Comments</Link>
              </Button>
            </ButtonGroup>
              
              <Switch>
                <Route path='/comments'>
                  <Comments comments={comments}/>
                </Route>
                <Route path="/contact">
                  <Contact names={['Facebook', 'Twitter', "Instagram"]} />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
          </div>
        </Router>
      </Container>
    )
}



function Home() {
    return <h1>Home</h1>
}

function Contact(props) {
    const { names } = props;
    return <h1>Contact</h1>
    return (
      <div>
        <ul>
          {names.map((friend, index) => (
            <li key={index}>{friend}</li>
          ))}
        </ul>
      </div>
    );
}


  
function Comments({ comments }) {
  const match = useRouteMatch();
  const findPostById = (id) =>
  comments.filter((post) => post.id == id)[0];

    return (
      <div>
        <h2>Comments</h2>
        
          {comments.map((post, index) => {
            return (
              <Alert key={index} variant="primary">
                <Link to={`${match.url}/${post.id}`}>
                  {post.title}
                </Link>
              </Alert>
            )
          })}
        
        <Switch>
          <Route 
            path ={`${match.path}/:postid`}
            render={(props) => (
            <Comment
              {...props}
              data={findPostById(props.match.params.postId)}
            />
            )}
          />
        <Route path={match.path}>
          <h3>Select a comment</h3>
        </Route>
        </Switch>
      </div>
  );
}

function Comment(props) {
  const { data } = props;
  return data == undefined ? <h4>404 Not Found</h4> : (
    <Card>
      <Card.Header>{data.title}</Card.Header>
      <Card.Body>
      <Card.Subtitle>{data.date}</Card.Subtitle>
      <Card.Text>{data.content}</Card.Text>
      </Card.Body>
      
    </Card>
  )
}
