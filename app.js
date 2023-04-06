const express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const app = express();
// const port = 3000;

var indexRouter = require('./routes/index');
const userRouter = require('./routes/users')



app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs', {
        title: 'Test',
        message : 'Trias nitis lazuardi'
    })
})

app.use('/users', userRouter);

app.get('/about', (req, res) => {
    res.send('about page 2')
})

app.get('/contact', (req, res) => {
    res.send('contact page')
})

app.listen(port, ()=> {
 console.log(`Server is running on ${port}`);   
});


//#region comment
// res.status(200).send({
    //     message: "proses sukses",
    //     filename: "app.js"
    // })

    // const mysql = require('mysql');
    //use xampp mysql
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "testdatabase"
// }) 

// db.connect((err)=> {
//     if(err){
//         throw err 
//     }

//     console.log("Db Connect")
// })
//#endregion