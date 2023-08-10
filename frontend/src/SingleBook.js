import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import styles from './styles/SingleBook.module.css'
import axios from 'axios';
import Layout from './components/Layout';
import { Link } from 'react-router-dom';

import { useEffect } from 'react';
const SingleBook = () => {
    const {id} = useParams()
    const [book, setBook] = useState('')
    const {id:bookId, name, author, img_link, collections=[{collection_name:""}]} = book;
    const getSingleBook = async()=>{
        try{
            const res = await axios.get('http://localhost:8000/api/getBook/' +id);
            console.log(res.data)
            setBook(res.data[0])
         

            if(!res.status ===200 ){
                const error = new Error(res.error);
                throw error;
            }

        }catch(err){
            console.log(err)
        }
      
           
        }
        useEffect(()=>{
            getSingleBook();
        },[])

  return (
    <Layout>
    <div className={styles.event}>
     
        {collections.map((curElm,index)=>{
            return <span key={index}>{curElm.collection_name}</span>
         })} 
       
      <h1>{name}</h1>
     
        <div className={styles.image}>
          {/*<Image src={evt.image} width={960} height={600}/>*/}
          <figure>
            <img src={img_link} alt={name} width={960} height={600}/>
            </figure> 
        </div>
    
      <h3>By:</h3>
      <p>{author}</p>
    
    
      
      <Link tof='/' className={styles.back}>{'<'} Go Back</Link>
    </div>
  
</Layout>
  )
}

export default SingleBook