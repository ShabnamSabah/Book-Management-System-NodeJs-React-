// Collection Schema

const Sequelize = require('sequelize');
const db= require('../config/database');

const Collection = db.define('collection',{
    collection_name:{
    type: Sequelize.STRING
    
    },
    },
    
    {
        timestamps:false
    });    
    
    module.exports= Collection;