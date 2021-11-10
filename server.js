const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "shop",
});

app.use(cors());
app.use(express.json());

app.get("/get_product", (req, res) => {
  db.query("SELECT * FROM product", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/orders", (req, res) => {
  const name = req.body.name;
  const lastname = req.body.lastname;
  const address = req.body.address;
  const phonenumber = req.body.phonenumber;
  const email = req.body.email;

  db.query(
    "INSERT INTO orders (name, lastname, address, phone, email) VALUES(?,?,?,?,?)",
    [name, lastname, address, phonenumber, email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("complete");
        console.log(result)
      }
    }
  );
});

app.listen(8000, () => {
  console.log(`server running`);
});
