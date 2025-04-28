const express = require("express");
const bodyparser = require("body-parser");
const mysql = require("mysql2/promise");
const app = express();
const port = 8000;
const cors = require("cors");
const dotenv = require("dotenv")
dotenv.config()
const { MYSQL_HOST, MYSQL_USER,MYSQL_PASSWORD, MYSQL_DATABASE} = process.env;
app.use(bodyparser.json());
app.use(cors());
const initMySql = async () => {
  conn = await mysql.createConnection({
    host: process.env.MYSQL_HOST ,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
};

app.get("/user", async (req, res) => {
  const results = await conn.query("SELECT * FROM histories");
  res.json(results[0]);
});

app.post("/user", async (req, res) => {
  try {
    let history = req.body;
    const results = await conn.query("INSERT INTO histories SET ?", history);
    console.log("results", results);
    res.json({
      message: "insert ok",
      data: results[0],
    });
  } catch {
    console.error("error message", error.message);
    res.status(500).json({
      message: "something wrong",
    });
  }
});

app.delete('/user', async (req,res) => {
    try {
        const results = await conn.query('DELETE from histories')
        res.json({
            message:'delete ok',
        })
    } catch (error){
        console.error('error message', error.message)
        res.status(500).json({
            message:'something wrong'
        })
    }
})
//run server
app.listen(port, async (req, res) => {
  await initMySql();
  console.log("http server run at " + port);
});
