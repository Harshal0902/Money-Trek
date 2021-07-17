import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import BillSplitImg from "../../assets/home.png"
import "./Home.scss"
import { useTranslation } from 'react-i18next'

export default function Home() {
    const { t } = useTranslation();
    return (
        <Container className="Intro">
            <Row>
                <Col md={6} className="about-description">
                    <h1>{t('homeTilte')}</h1>
                    <p>{t('homeDesc')}</p>
                </Col>

                <Col md={6} className="img_split">
                    <img src={BillSplitImg} className="img-fluid" alt="Split Bills" />
                </Col>

            </Row>
        </Container>
    )
}
