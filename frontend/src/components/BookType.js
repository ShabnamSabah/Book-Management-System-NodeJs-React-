import React from 'react'
import axios from 'axios';
import styles from "../styles/Book.module.css"
import { FaPencilAlt, FaTimes} from "react-icons/fa"
import { Link, useParams } from 'react-router-dom';
const Book = ({bookType}) => {
   
   const {id, name} = bookType;
   const { name: type} = useParams()
   const handleDelete = async()=>{
 
  
   await axios.delete(`http://localhost:8000/api/deleteFromBookCollection/${type}/${id}`)
    .then(res=>{
      window.location.reload();
    }).catch(err=>{
      console.log(err)
    })
   }
  return (
   <div className={styles.event}>

        <h4>
            {name}

        </h4>
         
         {/* {collections.map((curElm,index)=>{
            return <p key={index}>Genre: {curElm.collection_name}</p>
         })} */}

        <Link to="#" className={styles.delete} onClick={handleDelete}>
        <FaTimes /> <span> Delete </span></Link>
     </div>
  )
}

export default Book