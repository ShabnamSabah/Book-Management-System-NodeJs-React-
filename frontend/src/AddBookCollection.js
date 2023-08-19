import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from './components/Layout'
import styles from './styles/Form.module.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const AddBookCollection = () => {
   
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [bookOption, setBookOption] = useState([]);
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

const getAllBooks = async()=>{
    try{
        const res = await axios.get('http://localhost:8000/api/viewAllBooks');
        setBookOption(res.data)
        console.log(bookOption)
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
    getAllBooks();
},[])

    function handleSubmit(e){
        e.preventDefault();
         axios.post('http://localhost:8000/api/createBookCollection',{
            name,
            type
        }).then(res=>{
            //navigate('/')
           //console.log(res.data)
           toast.success(res.data.message);
           navigate('/addBookCollection');
           setName("")
           setType("")
        }
        ).catch(err=>{
            //console.log(err.response.data)
            toast.error(err.response.data.error)
            setName("")
            setType("")
        })
        
    }
  return (
    <Layout>
   
     <h1>Create Book Collection</h1>
     <ToastContainer />
      <form className={styles.form} onSubmit={handleSubmit}>
         <div className={styles.grid}>
          <div> 
          <label htmlFor="">Book </label>
              <select className="form-select" aria-label="Default select example" 
                value={name}
                onChange={(e)=>{
                    setName(e.target.value)
                }}
               >
                <option value="">Choose Book </option>
              {bookOption.map((curElm)=>{
                    return(
                        <option key={curElm.id} value={curElm.name}>{curElm.name}</option>
                    )
                  })
                }
                
              </select> 
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

export default AddBookCollection