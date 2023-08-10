import React from 'react'
import styles from "../styles/Search.module.css";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Search = () => {
    const [term, setTerm] = useState('');
  
    const navigate = useNavigate()
    const handleSubmit = (e)=>{
        e.preventDefault();
        //router.push(`/events/search?term=${term}`)
        
        navigate(`/search?term=${term}`)
        setTerm('')
    }
    //e.target.value = the value that we have typed for search
  return (
    <div className={styles.search}>
        <form onSubmit={handleSubmit}>
            <input type='text' value={term} onChange={(e)=>setTerm(e.target.value)} placeholder='Search Book'/>
        </form>
    </div>
  )
}

export default Search