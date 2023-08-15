const express = require('express')
//path module deals with file paths
const path = require('path');
const members = require('./Members')
const logger = require('./middleware/logger')

const app = express();

//Init middleware
// app.use(logger);

//simple rest api
//gets all members
//middleware functions have access to req, res
app.get('/api/members',(req,res)=>{
    res.json(members)
})

//you can also use function syntax : function(req,res){}
// app.get('/',(req,res)=>{
//     // res.send("<h1>Hello World!!</h1>")
//     res.sendFile(path.join(__dirname,'public','index.html'))
// })

//set a static folder
//__dirname - current directory
//use - method we use when we want to include middleware
//point to public
app.use(express.static(path.join(__dirname,'public')))

//checks for port number in an environment variable
//otherwise it uses 5000
const PORT  = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`);
});

// /- is the route for the index page
//routes or endpoints


///nodemon - constatntly watch our server, so that we dont keep reloading
//npm i -D -> depth dependency. Meaning we are not using it in production

//node index - have to keep restarting
//nodemin - constantly watch it

