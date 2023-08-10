import React, { useEffect } from 'react'
import axios from 'axios'
import { useParams} from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from './components/Layout'
import styles from './styles/Form.module.css'
const AddBook = () => {
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [img_link, setImageLink] = useState('')
    const navigate = useNavigate();
    const {id} = useParams();


    const getBookDetails = async ()=>{
        try{
            const res = await axios.get('http://localhost:8000/api/getBook/'+id)
            console.log(res.data)
            setName(res.data[0].name)
            setAuthor(res.data[0].author)
            setImageLink(res.data[0].img_link)
           
            if(!res.status ===200 ){
                console.log(res)
                const error = new Error(res.error);
                throw error;
            }

        }catch(err){
            console.log(err)
        }
      
    }
    useEffect(()=>{
        getBookDetails();
    },[])


    function handleSubmit(e){
        e.preventDefault();
        axios.put('http://localhost:8000/api/editBook/'+id,{
            name, 
            author,
            img_link
        })
        .then(res=>{
            console.log(res.data);
            navigate('/')
        })
        .catch(err=>{
            console.log(err.response.data.error)
        })
    }
  return (
    <Layout>
    <h1>Edit Book</h1>
   
      <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.grid}>
          <div>
              <label htmlFor="">Name</label>
              <input type="text" placeholder="Enter Name.." className="form-control" name="name" value={name}
              onChange={e=> {setName(e.target.value)}}
              />
          </div>
          <div>
          <label htmlFor="">Author</label>
              <input type="text" placeholder="Enter Author.." className="form-control"  name="author" value={author} onChange={e=> setAuthor(e.target.value)}/>
          </div>
    
          <div>
          <label htmlFor="">Image URL</label>
              <input type="text" placeholder="Enter Image Url.." className="form-control"  name="img_link" value={img_link} onChange={e=> setImageLink(e.target.value)}/>
          </div>
          </div>
          <input type='submit' value='Edit Book' className='btn' />
      </form>
    
    </Layout>
  )
}

export default AddBook