import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react'
import Layout from './components/Layout';
import styles from './styles/AllBook.module.css'
import Type from './components/Type';
import Pagination from './components/Pagination';

const AllCollection = () => {
 
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0)
    const [types, setTypes] = useState();
    const getAllBook = async(page)=>{
        try{
            const res = await axios.get(`http://localhost:8000/api/viewCollection?page=${page}&pageSize=10`);
            console.log(res.data)
            const {collection_list, totalPages} = res.data
            setTypes(collection_list)
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
      
     <h3>All Books Type</h3>
      
            {types && types.map((curElm, index)=>(
           
                <Type key={index} type={curElm} />
             
              ))}
                 <Pagination paginate={paginate} total={totalPage} handlePrevPage={handlePrevPage}
           
           handleNextPage={handleNextPage}
        />
        </div>
 </Layout>
  )
}

export default AllCollection