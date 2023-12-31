# Book-Management-System-NodeJs-React-

Features:
- Book Add/Edit/Delete 
- Book Collection create
- Ability to add/remove books from any collection
- Search books by name
- add ability to filter by author, collection
- no user authentication is required.

## Technology Used
1. Node.JS
2. MySQL (Sequelize)

    ##### 
    Sequelize is a Node. js-based Object Relational Mapper  that makes it easy to work with MySQL, MariaDB, SQLite, PostgreSQL databases, and more. An Object Relational Mapper performs functions like handling database records by representing the data as objects. The benefit of using Sequelize is we can easily avoid writing raw SQL queries.


3. Javascript
4. React.Js for Frontend
   
# To Run The Code Follow The Steps Below: 

### To Run The Frontend
1.  Open the client folder in VSCode and run the following command in the terminal to install the packages
```
npm install
```
2. Run the project by using the following Command
```
npm start
```

### To Run The Backend
1.  Open the backend folder in VSCode and run the following command in the terminal to install the packages
```
npm install
```
2. Create the databse with a name in Xampp Server/MySQl Workbench
```
your database name
```

3. Create .env file in the project folder and add the following
```
DB_name = "your database name"
DB_user = "usernme of datatabse"
DB_password = 'database password'

```
### In The Browser
1.  To Create differnt types of collection (ex., Poem, Novel and Sci-fi, etc.), Go to the "Add Type" page.
2.  To view all the collection type, Go to the "Book Types" page.
3.  To add a book, Go to the "Add Book" page.
4.  To view all book, Go to the "Book" page. Here, by clicking Edit/Delete button, you can edit/delete a book.
5.  To add a book into a Collection Type, Go to the "Add Book Collections" page, then select book name and select the book type where you want to add the book.
6. To delete a book from Collection Type, Go to the "Book Types" page, then Click on the Collection Type from which you want to delete a book, then click on the delete button of a book which you want to delete.
