let express = require("express");
let app = express();

//List of customers
let db = [];

// viewPath is required for the response.sendFile function
//__dirname is the  directory name of the current module (i.e file/project).
let viewsPath = __dirname + "/views/";

/* Customer details
    firstName,
    lastName,
    email,
    phoneNumber
 */

//allow Express to understand the urlencoded format
app.use(express.urlencoded({ extended: true }));

// Express should be able to render ejs templates
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

// we have some static assets such as images in this project
app.use(express.static("public/img"));
app.use(express.static("public/css"));

/* 
          GET Requests
  */
//if a request to the home page (i.e. '/') arrives
app.get("/", function (req, res) {
  console.log("Homepage request");
  // generate the relative path
  let fileName = viewsPath + "index.html";
  // send index.html back to the client
  res.sendFile(fileName);
});

// a request to add a new customers
app.get("/getaddcustomer", function (req, res) {
  console.log("Add New Customer request");
  //Generate the relative path
  let fileName = viewsPath + "addcustomer.html";
  //send addcusotmer.html page back to the client
  res.sendFile(fileName);
});

//a request to get all customers
app.get("/getallcustomers", function (req, res) {
  console.log("Homepage request");
  // the content of the page should be generated dynamically.
  // a copy of the array (db) will be send to the rendering engine.
  res.render("allcustomers", {
    customers: db,
  });
});

// POST Requests

// when the user clicks on the submit button
app.post("/postnewcustomer", function (req, res) {
  console.log(req.body);
  //bodyParser is responsible for generating the body object
  db.push(req.body);

  // after pushing the new customer to the database, redirect the client to allcustomer.html
  res.render("allcustomers", {
    customers: db,
  });
});

app.listen(8080);
