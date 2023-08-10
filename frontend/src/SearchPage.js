import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import HomeItem from './components/HomeItem';
import { useLocation } from 'react-router-dom';
import Layout from './components/Layout';
const SearchPage = () => {
    const location = useLocation();
    const term = new URLSearchParams(location.search).get("term");
    console.log(term)
    const [searchResult, setSearchResults] = useState();
    const getSearchedBook = async()=>{
        try{
            const res = await axios.get(`http://localhost:8000/api/search?term=${term}`);
            console.log(res.data)
            setSearchResults(res.data)
           
            if(!res.status ===200 ){
                const error = new Error(res.error);
                throw error;
            }

        }catch(err){
            console.log(err)
        }
      
           
        }
        useEffect(()=>{
            getSearchedBook();
        },[])
        return (
<Layout>
      <Link to='/'> Go Back</Link>
      <h1>Search Results for {term}</h1>
    {searchResult && searchResult.length === 0 && <h3>No Events To Show</h3>}

      {searchResult && searchResult.map((curElm,index)=>{
        return <HomeItem key={index} book={curElm}/>
      })
        //<h3 key={evt.id}>{evt.name}</h3>
       
      }
     
    </Layout>
        )
}

export default SearchPage