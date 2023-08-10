import React from 'react'
import { Link } from 'react-router-dom'
const Pagination = ({paginate, total, handlePrevPage, handleNextPage}) => {
    const pageNumbers = [];
    for(let i=1;i<=total; i++){
        pageNumbers.push(i)
    }

     return (
    <>
        <Link onClick={handlePrevPage}  className='btn-secondary'>
        Prev </Link>
      
     
            { pageNumbers.map((curElm,index)=>(
             <Link key={index} onClick={()=>paginate(curElm)} to="#" className='btn-secondary'>{curElm}</Link>
           ))}

         <Link onClick={handleNextPage} className='btn-secondary'>
        Next 
      </Link>
   </>
  )
}

export default Pagination