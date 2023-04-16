import React from "react";
import { Container, Row, Stack} from "react-bootstrap";
import styles from "./styles.module.css";
import {HiOutlineCalendar, HiOutlineLockClosed, HiOutlineUsers} from 'react-icons/hi'

const OtherOffers = () => {
  return (
    <div className={styles.otherOffersBody}>
      <Container>
        <p className={styles.otherOffersTitle}>We always make sure</p>
      <Row sm={1} md={3} lg={3} xl={3} style={{paddingTop:"9rem", color: "#606060"}}>
        <div>
          <Stack style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
          <HiOutlineCalendar size={50}/>
          <p style={{paddingTop:"1rem"}}>Updated courses</p>
          </Stack>
        </div>
        <div>
          <Stack style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
          <HiOutlineLockClosed size={50}/>
          <p style={{paddingTop:"1rem"}}>Secured account</p>
          </Stack>
        </div>
        <div>
          <Stack style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
          <HiOutlineUsers size={50}/>
          <p style={{paddingTop:"1rem"}}>User friendly environment</p>
          </Stack>
        </div>
      </Row>
      </Container>
    </div>
  );
};

export default OtherOffers;
