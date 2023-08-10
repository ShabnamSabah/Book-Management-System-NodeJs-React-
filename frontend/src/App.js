import {BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AddBook from "./AddBook";
import AllBook from "./AllBook";
import AddCollection from "./AddCollection"
import AddBookCollection from "./AddBookCollection"
import EditBook from "./EditBook"
import AllCollection from "./AllCollection";
import TypeWiseBook from "./TypeWiseBook";
import SearchPage from "./SearchPage";
import SingleBook from "./SingleBook";
import './App.css'
function App() {
return (
  <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="/addType" element={<AddCollection />}></Route>
    <Route path="/allType" element={<AllCollection />}></Route>
    <Route path="/add" element={<AddBook />}></Route>
    <Route path="/books" element={<AllBook />}></Route>
    <Route path="/addBookCollection" element={<AddBookCollection />}></Route>
    <Route path="/edit/:id" element={<EditBook />}></Route>
    <Route path="/type/:name" element={<TypeWiseBook />}></Route>
    <Route path="/search" element={<SearchPage />}></Route>
    <Route path="/book/:id" element={<SingleBook />}></Route>
   </Routes>
   </BrowserRouter>
  )
   
 
}

export default App;
