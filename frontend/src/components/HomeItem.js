import React from 'react'
import styles from '../styles/HomeItem.module.css'
import { Link } from 'react-router-dom';

const HomeItem = ({book}) => {
const {id, name, author, img_link, collections=[{collection_name:""}]} = book;
  return (
 
    <div className={styles.event}>
         <div className={styles.img}> 

            <figure>
              <img src={img_link} alt={name} width={170} height={100}/>
            </figure> 
           {/* <Image src={evt.image ? evt.image.formats.thumbnail.url : '/images/event-default.png'} width={170} height={100}/> */} 
         </div>
        <div className={styles.info}>
          
        {collections.map((curElm,index)=>{
            return <span key={index}>{curElm.collection_name}</span>
         })} 
         <h3>{name}</h3>
         <span>
              {author}
         </span>
        </div>
       <div className={styles.link}>
        <Link to={`/book/${id}`} className='btn'>
          Details
        </Link>
       </div>
    </div>
  
  )
}

export default HomeItem