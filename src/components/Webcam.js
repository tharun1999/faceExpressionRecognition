import React from 'react';
import Webcam from "react-webcam";
import { MDBIcon, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

import Loader from './Loader'
import sad from '../images/sad.svg'
import angry from '../images/angry.svg'
import happy from '../images/happy.svg'
import surprise from '../images/surprise.svg'
import neutral from '../images/neutral.svg'
import brain from '../images/brain.svg'
import * as ml5 from "ml5";

import tiger from "./tiger.jpg";

class WebcamCapture extends React.Component {

    constructor(props) {
        super(props)
        this.capture = this.capture.bind(this)

        this.setRef = this.setRef.bind(this)
        this.convert = this.convert.bind(this)
        this.getExpression = this.getExpression.bind(this)
        this.toggle = this.toggle.bind(this)
        this.initModels = this.initModels.bind(this)
        this.classifyImg = this.classifyImg.bind(this)
        this.state = {
            isPredicted: false,
            isClicked: false,
            emotion: "",
            help: false,
            classifier: null
        }
    }
    componentDidMount() {
        this.initModels()
    }

    initModels = async () => {
        // Initialize the Image Classifier method with MobileNet
        this.state.classifier = ml5.imageClassifier('MobileNet', modelLoaded);
        // When the model is loaded
        function modelLoaded() {
            console.log('Model Loaded!');
        }
    }

    setRef(webcam) {
        this.webcam = webcam;
    };

    convert(imageSrc) {
        console.log(imageSrc)
        console.log(btoa(imageSrc))
        return "image"
    }


    classifyImg = (image) => {

        // Put the image to classify inside a variable
        // Make a prediction with a selected image
        console.log(image)
        if (this.state.classifier !== null) {
            console.log(image)
            this.state.classifier.predict(image, 5, function (err, results) {
                // print the result in the console
                console.log(results);
            })
        }
    }

    getExpression(image) {
        this.convert(image)
        this.classifyImg(btoa(image))
        let expressions = [happy, sad, angry, surprise, neutral, brain]
        this.setState({
            isClicked: false,
            isPredicted: true,
            emotion: expressions[Math.floor(Math.random() * 6)]
        })
        return;
    }

    toggle() {
        this.setState({
            help: !this.state.help
        });
    }

    capture() {
        const imageSrc = this.webcam.getScreenshot();
        //base64
        this.setState({
            isClicked: true,
            isPredicted: false
        })
        this.getExpression(imageSrc)
    }

    render() {
        let height = window.innerHeight;
        let width = window.innerWidth
        const videoConstraints = {
            width: width / 2,
            height: height / 2,
            facingMode: "user"
        };
        return (
            <div className="container">
                <div>
                    <MDBBtn tag="a" onClick={this.toggle} outline>
                        <Webcam
                            audio={false}
                            ref={this.setRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                        />
                    </MDBBtn>
                </div>
{/*                 
	 <img src={ tiger } id="image" width="400" alt="" /> */}
                <MDBModal isOpen={this.state.help} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}>Emoji Helper</MDBModalHeader>
                    <MDBModalBody>
                        <MDBTable>
                            <MDBTableHead>
                                <tr>
                                    <th>Emotion</th>
                                    <th>Emoji</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                <tr>
                                    <td>Happy</td>
                                    <td><img src={happy} height="30" width="30" /></td>
                                </tr>
                                <tr>
                                    <td>Sad</td>
                                    <td><img src={sad} height="30" width="30" /></td>
                                </tr>
                                <tr>
                                    <td>Surprise</td>
                                    <td><img src={surprise} height="30" width="30" /></td>
                                </tr>
                                <tr>
                                    <td>Angry</td>
                                    <td><img src={angry} height="30" width="30" /></td>
                                </tr>
                                <tr>
                                    <td>Neutral</td>
                                    <td><img src={neutral} height="30" width="30" /></td>
                                </tr>
                                <tr>
                                    <td>No Face Detected/Failed</td>
                                    <td><img src={brain} height="30" width="30" /></td>
                                </tr>
                            </MDBTableBody>
                        </MDBTable>

                    </MDBModalBody>
                </MDBModal>
                <MDBBtn onClick={this.capture} color="primary">Capture and Predict Emotion</MDBBtn>
                {this.state.isClicked && !this.state.isPredicted ? <Loader /> : (this.state.emotion !== "" ? <div><img src={this.state.emotion} height="100" width="100"></img></div> : <div></div>)}
            </div>
        );
    }
};

export default WebcamCapture;
