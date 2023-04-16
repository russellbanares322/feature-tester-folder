import React from 'react'
import styles from './styles.module.css';
import mainBg from '../../assets/backgroundimg.jpeg';

const Hero = () => {
  return (
    <div >
        <img className={styles.bgImage} src={mainBg} />
        <p className={styles.title1}>Ecommerce site you need</p>
        <p className={styles.title2}>Order the product you want</p>
        <div className={styles.bttn}><button >Get Started</button></div>

    </div>
  )
}

export default Hero