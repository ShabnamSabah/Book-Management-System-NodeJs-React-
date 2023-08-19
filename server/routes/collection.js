const express = require("express");
const router = express.Router();
const path = require("path");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Book = require("../model/Book");
const Collection = require("../model/Collection");
const Book_Collection = require("../model/Book_Collection");


Collection.belongsToMany(Book, {
 
  through: Book_Collection,
  foreignKey: 'collectionId',
  otherKey: 'bookId'
});
Book.belongsToMany(Collection, {
 
 through: Book_Collection,
 foreignKey: 'bookId' ,
 otherKey: 'collectionId'
});

//Add A Callection
router.post("/addCollection", (req, res) => {
  let { collection_name } = req.body;

  if (!collection_name) {
    res.status(400).json({
      error: "Please fill in all the fields",
    });
  } else {
    const newCollection = new Collection({
      collection_name,
    });
    newCollection
      .save()
      .then((new_collection) => {
        res.status(200).json({ message: "Collection Added Succesfully" });
      })
      .catch((err) => {
        res.status(404).json({
          error: err,
        });
      });
  }
});

//View All Callection
router.get("/viewCollection", (req, res) => {
  const page = parseInt(req.query.page)
  const pageSize = parseInt(req.query.pageSize)
//Calculate start and end index for requested page
 const startIndex = (page-1) * pageSize
 const endIndex = page * pageSize

  Collection.findAll()
    .then(collection => {
      const pagenatedCollection= collection.slice(startIndex,endIndex)
      const totalPages = Math.ceil(collection.length / pageSize);
      res.status(200).json({collection_list: pagenatedCollection, totalPages});
    })
    .catch((err) =>
      res.status(404).json({
        error: err,
      })
    );
});

router.get("/viewCollections", (req, res) => {
  Collection.findAll()
    .then(collection => {
      res.status(200).json(collection);
    })
    .catch((err) =>
      res.status(404).json({
        error: err,
      })
    );
});
module.exports = router;
