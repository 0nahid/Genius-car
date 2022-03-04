const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

require("dotenv").config();
//middleware
app.use(cors());
app.use(express.json());

// Database
const { ObjectID } = require("bson");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@genius.r5hwg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("service").collection("services");
  //   post api on server
  app.post("/services", (req, res) => {
    collection.insertOne(req.body, (err, result) => res.json(result));
  });
  //   Get server
  app.get("/services", (req, res) => {
    collection.find().toArray((err, result) => res.json(result));
  });
  // get specific api
  app.get("/services/:id", (req, res) => {
    const id = req.params.id;
    collection.findOne({ _id: new ObjectID(id) }, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    });
  });
  // perform actions on the collection object
  err ? console.log(err) : console.log("Connected to Database");
  //   client.close();
});

app.get("/", (req, res) =>
  res.send({ status: `Server is running on port ${port}` })
);
app.listen(port, () =>
  console.log({ status: `Server is running on port ${port}` })
);
