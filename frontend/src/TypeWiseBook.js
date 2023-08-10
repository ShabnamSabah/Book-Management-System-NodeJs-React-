import React from 'react'
import { useParams } from 'react-router-dom';
import BookType from './components/BookType';
import Layout from './components/Layout';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/AllBook.module.css'
import Pagination from './components/Pagination';
import axios from 'axios';
const TypeWiseBook = () => {

const [currentPage, setCurrentPage] = useState(1);
const [totalPage, setTotalPage] = useState(0)
const [books, setBooks] = useState();
const {name} = useParams()

  const getAllBook = async(page)=>{
      try{
          const res = await axios.get(`http://localhost:8000/api/findByCollection/${name}?page=${page}&pageSize=2`);
         // console.log(res.data)
            const {book_list, totalPages} = res.data
            setBooks(book_list)
            setTotalPage(totalPages)

          
          
          if(!res.status ===200 ){
              const error = new Error(res.error);
              throw error;
          }

      }catch(err){
          console.log(err)
      }
    
         
      }
      useEffect(()=>{
          getAllBook(currentPage);
      },[currentPage])
     
      
      const handlePrevPage = () => {
        if (currentPage !== 1) {
         setCurrentPage(currentPage- 1);
        }
      };
    
      const handleNextPage = () => {
        if (currentPage !== totalPage) {
          setCurrentPage(currentPage + 1);
        }
    }
   
    const paginate=(pageNumber)=>{
        setCurrentPage(pageNumber)
    }
return (
  <Layout>
   <div className={styles.dash}>
   <Link to='/allType'>Go Back</Link>
    <h3>My Books</h3>
    {books && books.length === 0 && <h3>No Books To Show</h3>}
          {books && books.map((curElm, index)=>(
         
              <BookType key={index} bookType={curElm}/>
           
            ))}
            <Pagination paginate={paginate} total={totalPage} handlePrevPage={handlePrevPage}
           
           handleNextPage={handleNextPage}
        />
  </div>
  </Layout>
)
}

export default TypeWiseBook