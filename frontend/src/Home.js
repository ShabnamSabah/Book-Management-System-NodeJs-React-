
import React from 'react'
import Layout from './components/Layout'
import styles from './styles/Layout.module.css'
import HomeItem from './components/HomeItem';
import axios from 'axios';

import { useEffect, useState } from 'react';
import Pagination from './components/Pagination';
const Home = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0)
    const [books, setBooks] = useState();
  
    const getAllBook = async(page)=>{
        try{
            const res = await axios.get(`http://localhost:8000/api/viewAllBook?page=${page}&pageSize=2`);
            console.log(res.data)
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
      
      <h3>My Books</h3>
      
            {books && books.map((curElm, index)=>(
           
                <HomeItem key={index} book={curElm}/>
             
              ))}
          
            
           <Pagination paginate={paginate} total={totalPage} handlePrevPage={handlePrevPage}
           
              handleNextPage={handleNextPage}
           />
  
    </div>
    </Layout>
  )

}

export default Home