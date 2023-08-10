import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from './components/Layout'
import styles from './styles/Form.module.css'
const AddBook = () => {
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [type, setType] = useState('');
    const [option, setOption] = useState([]);
    const navigate = useNavigate();

const getAllType = async()=>{
    try{
        const res = await axios.get('http://localhost:8000/api/viewCollections');
        setOption(res.data)
        console.log(option)
        if(!res.status ===200 ){
            const error = new Error(res.error);
            throw error;
        }

    }catch(err){
        console.log(err)
    }
}
useEffect(()=>{
    getAllType();
},[])

    function handleSubmit(e){
        e.preventDefault();
         axios.post('http://localhost:8000/api/createBookCollection',{
            name, 
            author,
            type
        }).then(res=>{
            navigate('/')
           console.log(res.data)
        }
        ).catch(err=>{
            console.log(err.response.data)
        })
        
    }
  return (
    <Layout>
   
     <h1>Create Book Collection</h1>
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
          <label htmlFor="">Book Type</label>
              <select className="form-select" aria-label="Default select example" 
                value={type}
                onChange={(e)=>{
                    setType(e.target.value)
                }}
               >
                <option value="">Choose Book Type</option>
              {option.map((curElm)=>{
                    return(
                        <option key={curElm.id} value={curElm.collection_name}>{curElm.collection_name}</option>
                    )
                  })
                }
                
              </select> 
                </div>
          </div>
          <input type='submit' value='Add' className='btn' />
      </form>
   
 </Layout>
  )
}

export default AddBook