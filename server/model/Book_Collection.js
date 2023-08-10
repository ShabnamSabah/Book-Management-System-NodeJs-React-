// Book_Collection Schema that joins Book & Collection Schema
const Sequelize = require("sequelize");
const db = require("../config/database");

const Book_Collection = db.define("book_collection",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },

    bookId: {
      type: Sequelize.INTEGER
    },
    collectionId: {
      type: Sequelize.INTEGER
    },
  },

  {
    timestamps: false,
  }
);

module.exports = Book_Collection;
