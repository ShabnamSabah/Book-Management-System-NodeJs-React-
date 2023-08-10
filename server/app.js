const express = require('express')
const  app = express();
const cors = require('cors');
app.use(express.json())

app.use(cors(
  { 
   origin: "http://localhost:3000",
   methods: ["POST", "GET", "PUT", "DELETE"],
   credentials: true,

  }
 ));
const collection = require('./routes/collection');
const book = require('./routes/book');

// Database
const db = require('./config/database');

db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))

db.sync()
.then((result)=>{
    console.log("Database Created")
})
.catch((err)=>{
    console.log(err)
})



app.use('/api', collection)
app.use('/api', book)

const port = process.env.PORT || 8000;

app.listen(port, ()=> console.log(`Listening On Port ${port}...`));
