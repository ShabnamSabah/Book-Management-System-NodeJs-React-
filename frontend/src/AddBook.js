import React from 'react'
import axios from 'axios'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from './components/Layout'
import styles from './styles/Form.module.css'
const AddBook = () => {
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [img_link, setImageLink] = useState('')
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        axios.post('http://localhost:8000/api/addBook',{
            name, 
            author,
            img_link
        })
        .then(res=>{
            console.log(res);
            navigate('/')
        })
        .catch(err=>{
            console.log(err.response.data.error)
        })
    }
  return (
    <Layout>
      <h1>Add Book</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.grid}>
          <div>
              <label htmlFor="">Name</label>
              <input type="text" placeholder="Enter Name.." className="form-control" name="name"
              onChange={e=> setName(e.target.value)}
              />
          </div>
          <div>
          <label htmlFor="">Author</label>
              <input type="text" placeholder="Enter Author.." className="form-control"  name="author" onChange={e=> setAuthor(e.target.value)}/>
          </div>
          <div>
          <label htmlFor="">Image URL</label>
              <input type="text" placeholder="Enter Image Url.." className="form-control"  name="img_link" onChange={e=> setImageLink(e.target.value)}/>
          </div>
          </div>
          
          <input type='submit' value='Add Book' className='btn' />
      </form>
    
    </Layout>
  )
}

export default AddBook