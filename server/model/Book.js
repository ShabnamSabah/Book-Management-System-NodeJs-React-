// Book Schema

const Sequelize = require('sequelize');
const db= require('../config/database');

const Book = db.define('book',{
    name:{
        type: Sequelize.STRING
        
        },
    author:{
            type: Sequelize.STRING
            
        },
        img_link:{
            type: Sequelize.STRING
            
        },
      },
    {
        timestamps:false
    });    
    
    module.exports= Book;