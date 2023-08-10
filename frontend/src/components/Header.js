import React from "react";
import styles from "../styles/Header.module.css";
import { Link } from "react-router-dom";
import Search from "./Search";
const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">Book Management System</Link>
      </div>
      <Search />
      <nav>
        <ul>
        
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/addType">Add Type</Link>
          </li>
          <li>
            <Link to="/allType">Book Types</Link>
          </li>
          <li>
            <Link to="/add">Add Book</Link>
          </li>
          <li>
            <Link to="/books">Books</Link>
          </li>
          <li>
            <Link to="/addBookCollection">Add Book Collections</Link>
          </li>
    
        </ul>
      </nav>
    </header>
  );
};

export default Header;
