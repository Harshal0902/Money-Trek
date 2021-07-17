import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import BillSplitImg from "../../assets/home.png"
import "./Home.scss"

export default function Home() {
    return (
        <Container className="Intro">
            <Row>
                <Col md={6} className="about-description">
                    <h1>Better solutions for trip</h1>
                    <p>Money Trek is a use money splitting web app where you can keep track of your budgets and calculate how much money you have to give or take from your friends. This web app can be very useful during trips and other occassions where calculation of budget and who pays for what is necessary.
                    </p>
                </Col>

                <Col md={6} className="img_split">
                    <img src={BillSplitImg} height="100px" className="img-fluid" alt="Split Bills" />
                </Col>
            </Row>
        </Container>
    )
}
