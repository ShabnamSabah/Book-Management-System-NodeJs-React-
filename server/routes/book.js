const express = require("express");
const router = express.Router();
const path = require("path");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Book = require("../model/Book");
const Collection = require("../model/Collection");
const Book_Collection = require("../model/Book_Collection");

//Add A Book

router.post("/addBook", (req, res) => {
  let { name, author, img_link } = req.body;

  if (!name || !author || !img_link) {
    res.status(400).json({
     error: "Please fill in all the fields",
    });
  } else {
    const newBook = new Book({
      name,
      author,
      img_link
    });
    newBook
      .save()
      .then((new_book) => {
        res.status(200).json({ message: "Book Added Succesfully" });
      })
      .catch((err) => {
        res.status((err) => res.status(400).json({ error: err }));
      });
  }
});

//View All Book
router.get("/viewAllBook", (req, res) => {
  const page = parseInt(req.query.page)
  const pageSize = parseInt(req.query.pageSize)
//Calculate start and end index for requested page
 const startIndex = (page-1) * pageSize
 const endIndex = page * pageSize

  Book.findAll({
    include: [
      {
        model: Collection,
      },
    ],
  })
    .then((book) => {
      const pagenatedBooks = book.slice(startIndex,endIndex)
      const totalPages = Math.ceil(book.length / pageSize);
      res.status(200).json({book_list: pagenatedBooks, totalPages});
    })
    .catch((err) =>
      res.status(404).json({
        error: err,
      })
    );
});

router.get("/getBook/:id", (req, res) => {
  Book.findAll({
    where:{id: req.params.id},
    include:[{
      model: Collection
    }]
  
  })
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((err) =>
      res.status(404).json({
        error: err,
      })
    );
});


//Edit A Book
router.put("/editBook/:id", (req, res) => {
  let { name, author, img_link } = req.body;
  console.log(author)
  Book.findOne({
    where: {
      id: req.params.id,
    },
  }).then(new_book=> {
     if(new_book){
       Book.update({
        name,
        author,
        img_link
       },{
        where:{
          id: new_book.id
        }
       }).then(book_update=>{
         res.status(200).json({message: "Book Updated Succefully"})
       }).catch(err=>{
        res.status(400).json({error: "Book Updated Failed"})
       })
     }else{
      return res.status(400).json({error: "No Book Found"})
     }
  }).catch(err=>{
    res.status(400).json({error: err})
  })

});

//Delete A Book
router.delete("/deleteBook/:id", (req, res) => {
  Book.findOne({ where: { id: req.params.id } })

    .then((book) => {
      Book.destroy({
        where: {
          id: book.id,
        },
      }).then((book_list) => {
        res.status(200).json({ message: "Book Deleted Successfully" });
      });
    })
    .catch((err) => res.status(404).json({ error: err }));
});

//Add A Book Into Book Callection
router.post("/createBookCollection", (req, res) => {
  let { name, author, type } = req.body;
 console.log(author)
  Book.findOne({
    where: {
      name,
      author,
    },
  })
    .then((book) => {
      if (book) {
        Collection.findOne({ where: { collection_name: type } }).then(
          (collection) => {
            if (collection) {
              Book_Collection.findOne({where: {
                [Op.and]:[
                  {bookId:book.id},
                 {collectionId: collection.id}]
              }}).then(x=>{
                if(!x){
                  const newBook_Collection = new Book_Collection({
                    bookId: book.id,
                    collectionId: collection.id,
                  });
                  newBook_Collection
                    .save()
                    .then((book_collection) => {
                      res
                        .status(200)
                        .json({ message: `${book.name} Added To ${collection.collection_name} Successfully`});
                    })
                    .catch((err) => {
                   res.status(400).json({ error: `${book.name} Not Added To ${collection.collection_name}` });
                    }); 
                }else{
                      Book_Collection.update({
                        bookId: book.id,
                        collectionId: collection.id
                      },{
                        where:{
                          bookId: book.id,
                          collectionId: collection.id
                        }
                      }).then(y=>{
                        res
                        .status(200)
                        .json({ message: `${book.name} Already Exists In ${collection.collection_name}` });
                      }).catch(err=>{
                        res.status(400).json({ error: "No Book_Collection Created" });
                      })
                }
              })
            
            } else {
             res.status(400).json({ error: "No Collection Found" });
            }
          }
        );
      } else {
      res.status(400).json({ error: "No Book Found" });
      }
    })
    .catch((err) => {
      res.status(404).json({ error: err });
    });
});


router.delete("/deleteFromBookCollection/:type/:id", (req, res) => {
  

  Book.findOne({
    where: {
     id: req.params.id
    },
    include:[{
      model: Collection,
    }]
  })
    .then((book) => {
      if (book) {
        Collection.findOne({ where: { collection_name: req.params.type } }).then(
          (collection) => {
            if (collection) {
              Book_Collection.findOne({
                where: {
                  bookId: book.id,
                  collectionId: collection.id,
                },
              }).then((bookCollection) => {
                if (bookCollection) {
                  Book_Collection.destroy({
                    where: {
                      id: bookCollection.id,
                    },
                  }).then((x) => {
                    res
                      .status(200)
                      .json({
                        message: `${book.name} Delted from ${collection.collection_name} Succefully`,
                      });
                  });
                } else {
                  res.status(400).json({ error: "No Book in Book Collection" });
                }
              });
            } else {
              return res.status(400).json({ error: "No Collection Found" });
            }
          }
        );
      } else {
        return res.status(400).json({ error: "No Book Found" });
      }
    })
    .catch((err) => {
      res.status(404).json({ error: err });
    });
});

//Search Book By Name
router.get("/search", (req, res) => {
  const { term } = req.query;
  console.log(term)
  Book.findAll({
    include: [
      {
        model: Collection,
        as: 'collections',

      },
    ],
    where: { 
      [Op.or]:[
      {name: { [Op.like]: "%" + term + "%" }},
      {author: { [Op.like]: "%" + term + "%"}},
      {'$collections.collection_name$': { [Op.like]: "%" + term + "%"}}
      ]
    }
  }).then((book) => {
      res.status(200).json(book);
    })
    .catch((err) => res.status(404).json({ error: err }));
});

// // Find Book by Author
// router.get("/findByAuthor", (req, res) => {
//   const { name } = req.body;

//   Book.findAll({
//     where: { author: name },
//     include: [
//       {
//         model: Collection,
//       },
//     ],
//   })
//     .then((book) => {
//       res.status(200).json(book);
//     })
//     .catch((err) => res.status(404).json({ error: err }));
// });

// Find Book by Collection
router.get("/findByCollection/:name", (req, res) => {
  const { name } = req.params;
  const page = parseInt(req.query.page)
  const pageSize = parseInt(req.query.pageSize)
//Calculate start and end index for requested page
 const startIndex = (page-1) * pageSize
 const endIndex = page * pageSize
  Book.findAll({
    include: [
      {
        model: Collection,
        where: { collection_name: name },
      },
    ],
  })
    .then((book) => {
      const pagenatedBooks = book.slice(startIndex,endIndex)
      const totalPages = Math.ceil(book.length / pageSize);
      res.status(200).json({book_list: pagenatedBooks, totalPages});
    })
    .catch((err) => res.status(404).json({ error: err }));
});
module.exports = router;
