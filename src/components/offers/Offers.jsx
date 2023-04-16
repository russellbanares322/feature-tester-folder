
import React from 'react'
import styles from './styles.module.css';
import {Row, Container} from 'react-bootstrap';
import offerImg from '../../assets/offerImg.svg';
import {SlBookOpen} from 'react-icons/sl';

const Offers = () => {
  return (
    <div className={styles.body}>
        <p className={styles.serviceTitle}>Our Services</p>
            <Container style={{paddingTop:"5rem"}}>
        <Row xl={2} lg={2} md={2} sm={1}>
            <div><img src={offerImg} style={{height:"20rem"}}/></div>
            <div><p className={styles.title1}><SlBookOpen size={35} style={{paddingRight:"0.3rem"}}/>REVIEWERS</p>
            <p className={styles.title2}>Different types of reviewer depending on what grade level you are, and what subject you are currently taking.</p>
            </div>
        </Row>
            </Container>
    </div>
  )
}

export default Offers