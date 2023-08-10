import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/Form.module.css";
import Layout from "./components/Layout";
const AddBook = () => {
  const [collection_name, setCollection] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/addCollection", {
        collection_name,
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  }
  return (
    <Layout>
      <h1>Add Book Type</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Type.."
              className="form-control"
              name="collection_name"
              onChange={(e) => setCollection(e.target.value)}
            />
          </div>
        </div>
        <input type="submit" value="Add" className="btn" />
      </form>
    </Layout>
  );
};

export default AddBook;
