import React from 'react'
import styles from './styles.module.css'
import {BsTwitch} from 'react-icons/bs';
import {FaSteam} from 'react-icons/fa';
import {IoGameController} from 'react-icons/io5';
import {RiBook2Fill} from 'react-icons/ri';
import {BiUser} from 'react-icons/bi';

const Example = () => {
  return (
  
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.profile_wrapper}>
          <BiUser color={"#F3F3F3"} className={styles.profile_icon} size={35}/>
          <p className={styles.name}>Profile Name</p>
          <p className={styles.role}>Profile Role</p>
        </div>
        <ul className={styles.ul}>
          <li className={styles.active}><BsTwitch size={25} className={styles.icon} color={"#65B4E5"}/>Dashboard</li>
          <li><FaSteam size={25} className={styles.icon} color={"#65B4E5"}/>Account Management</li>
          <li><IoGameController size={25} className={styles.icon} color={"#65B4E5"}/>Case Management</li>
          <li><RiBook2Fill size={25} className={styles.icon} color={"#65B4E5"}/>Role Management</li>
        </ul>
      </div>
      <div className={styles.main}>
        <div className={styles.main_content}>
          <p>Active Games</p>
          <input type="text" />
        </div>
      </div>
      </div>
  )
}

export default Example