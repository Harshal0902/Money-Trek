import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MoneySplit.scss"
import Fade from 'react-reveal/Fade';

class MoneySplit extends React.Component {

    constructor() {
        super();
        this.state = {
            bill: "",
            numPeople: " ",
            split: " "
        };
    };

    handlebill = (event) => {
        this.setState({
            bill: event.target.value
        })
    }

    handlenumpeople = (event) => {
        this.setState({
            numpeople: event.target.value
        })
    }

    exe = (e) => {
        e.preventDefault();
        this.setState({ split: parseInt(this.state.bill) / parseInt(this.state.numpeople) })
    }

    render() {

        return (
            <Container>

                <Fade bottom>
                    <div className="splitting">
                        <div className="splt__title">Split the Bill</div>
                        <Row>
                            <Col md={6} className="column1">
                                Bill Details

                                <form onSubmit={this.exe}>

                                    <div style={{ cursor: "pointer" }} className="upload-btn-wrapper">
                                        <button style={{ cursor: "pointer" }} className="btn">Upload a file</button>
                                        <input style={{ cursor: "pointer" }} type="file" name="myfile" />
                                    </div>

                                    <div className="orOption">Or</div>

                                    <div className="input-control">
                                        <input type="text" name="Merchant" className="input-field" placeholder="Merchant" />
                                        <label for="username" className="input-label">Merchant</label>
                                    </div>

                                    <div className="input-control">
                                        <input type="text" name="Date" className="input-field" placeholder="Date" />
                                        <label for="username" className="input-label">Date</label>
                                    </div>

                                    <div className="input-control">
                                        <input type="text" name="Time" className="input-field" placeholder="Time" />
                                        <label for="username" className="input-label">Time</label>
                                    </div>

                                    <div className="input-control">
                                        <input type="text" name="Total Bill" className="input-field" placeholder="Total Bill" value={this.state.bill} onChange={this.handlebill} />
                                        <label for="username" className="input-label">Total Bill</label>
                                    </div>

                                    <div className="input-control">
                                        <input type="text" name="Split between..." className="input-field" placeholder="Split between..." value={this.state.numpeople} onChange={this.handlenumpeople} />
                                        <label for="username" className="input-label">Split between...</label>
                                    </div>

                                    <button type="submit" className="splitBill_btn">Split Bill</button>

                                    <div className="result">Payment per head: {this.state.split}</div>

                                </form>

                            </Col>
                            <Col md={6} className="column2">
                                Bill Image
                            </Col>
                        </Row>
                    </div>
                </Fade>

            </Container>
        )
    }
}

export default MoneySplit
