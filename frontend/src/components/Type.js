import React from 'react'
import styles from '../styles/HomeItem.module.css'
import { Link } from 'react-router-dom';

const Type = ({type}) => {
const {id, collection_name} = type;
  return (
 
    <div className={styles.event}>
        
        <div className={styles.info}>
          
         <span>{collection_name}</span>
        </div>
       <div className={styles.link}>
        <Link to={`/type/${collection_name}`} className='btn'>
          View All Book
        </Link>
       </div>
    </div>
  
  )
}

export default Type