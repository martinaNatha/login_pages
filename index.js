const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const exphbs = require("express-handlebars");
const http = require("http");
const https = require("https");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
app.set("views", path.join(__dirname, "views"));


const hbs = exphbs.create({
  defaultLayout: "main",
  layoutsDir: path.join(app.get("views"), "layouts"),
  partialsDir: path.join(app.get("views"), "partials"),
  extname: ".hbs",
  helpers: {
    ifeq: function (a, b, options) {
      if (a == b) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    ifnoteq: function (a, b, options) {
      if (a != b) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    firstL: function (options) {
      return options.charAt(0);
    },
  },
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

// Middleware
app.use(morgan("tiny")); //Morgan
app.use(cors()); // cors
app.use(express.json()); // JSON
app.use(express.urlencoded({ extended: false })); //urlencoded
app.use(bodyParser.json());

app.post("/login_form", async (req,res)=>{
    const {username, password} = req.body;

    // query to mysql database to get username and password verification
    const pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'testdb',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    
    pool.query('SELECT * FROM users', (err, results) => {
      if (err) throw err;
      console.log(results);
    });

    console.log(`Username: ${username} and Password: ${password}`);
    res.redirect("/home");
});


app.post("/register_form", async (req,res)=>{
    const {username,email, password} = req.body;

    console.log(`Username: ${username} and Email: ${email}`);
});

app.use(require("./routes"));
app.use(express.static(path.join(__dirname, "public")));

app.set("port", process.env.PORT || 8092);

server.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});