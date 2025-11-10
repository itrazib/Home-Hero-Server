const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ahPprnxWq5QgvtNY

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d4mqfiw.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    await client.connect();
    const db = client.db('heroHomeDB');
    const Services = db.collection("Services");
    const MyBooking = db.collection("MyBooking")


     app.get('/services', async(req, res) => {
      const email = req.query.email;
      const query = {}
      if(email){
        query.providerEmail = email;
      }
      const cursor = Services.find(query)
      const result  = await cursor.toArray()
      res.send(result)
    })

   

    app.get('/services/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await Services.findOne(query)
      res.send(result)
    })

    app.get('/my-booking/:id', async(req, res) => {
      const email = req.query.email
      const query = {}
      if(email){
        query.email = email
      }

      const cursor = MyBooking.find(query)
      const result = await cursor.toArray()
      res.send(result)
    })

    app.get('/services', async(req, res) => {
        const cursor = Services.find();
        const result = await cursor.toArray()
        res.send(result)
    })

     app.get('/my-booking', async(req, res) => {
      const cursor = MyBooking.find();
      const result = await cursor.toArray();
      res.send(result)
    })

   
    app.get('/service', async(req, res) => {
        const cursor = Services.find().limit(6)
        const result = await cursor.toArray()
        res.send(result)
    })

    app.post("/services", async (req, res) => {
      const newService = req.body;

      try {
        const result = await Services.insertOne(newService);
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Do not Added the services" });
      }
    });

    app.post('/my-booking', async(req, res) => {
      const newBooking = req.body;
      const result = await MyBooking.insertOne(newBooking)
      res.send(result)
    })

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Home Hero Server Running");
});

app.listen(port, () => {
  console.log(`Home Hero Server Runnin On port ${port}`);
});
