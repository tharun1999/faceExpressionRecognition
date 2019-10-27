import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import WebcamCapture from './components/Webcam'
import Loader from './components/Loader';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <div className="bg">
        <MDBContainer>
          <MDBJumbotron>
            <h1 className="h1-responsive display-4">FACIAL EXPRESSION RECOGNITION</h1>
            <WebcamCapture />
          </MDBJumbotron>
          
        </MDBContainer>
        </div>
      </div>
    );
  }
}

export default App;
