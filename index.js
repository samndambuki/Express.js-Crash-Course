const express = require("express");
//path module deals with file paths
const path = require("path");

const exphbs =  require("express-handlebars")

const logger = require("./middleware/logger");

const app = express();

//handle bars middleware
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//Body Parser middleware
//hanlde raw json
app.use(express.json())
//handle form submissions
//hanlde urlencoded data
app.use(express.urlencoded({extended:false}))

//Home Page route
app.get("/",(req,res)=>{
  res.render("index")
})

//Init middleware
// app.use(logger);

//you can also use function syntax : function(req,res){}
// app.get('/',(req,res)=>{
//     // res.send("<h1>Hello World!!</h1>")
//     res.sendFile(path.join(__dirname,'public','index.html'))
// })

//set a static folder
//__dirname - current directory
//use - method we use when we want to include middleware
//point to public
app.use(express.static(path.join(__dirname, "public")));

//Members api routes
app.use("/api/members", require("./routes/api/members"));

//checks for port number in an environment variable
//otherwise it uses 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

// /- is the route for the index page
//routes or endpoints

///nodemon - constatntly watch our server, so that we dont keep reloading
//npm i -D -> depth dependency. Meaning we are not using it in production

//node index - have to keep restarting
//nodemin - constantly watch it
