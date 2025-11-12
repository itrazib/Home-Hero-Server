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
    const db = client.db("heroHomeDB");
    const Services = db.collection("Services");
    const MyBooking = db.collection("MyBooking");
    const Review = db.collection("Review");

    app.get("/services", async (req, res) => {
      const email = req.query.email;
      const query = {};
      if (email) {
        query.providerEmail = email;
      }
      const cursor = Services.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await Services.findOne(query);
      res.send(result);
    });

    app.get("/services", async (req, res) => {
      const cursor = Services.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/filter", async (req, res) => {
      const minPrice = parseInt(req.query.minPrice);
      const maxPrice = parseInt(req.query.maxPrice);

      let query = {};
      if (!isNaN(maxPrice) && !isNaN(minPrice)) {
        query = { price: { $gte: minPrice, $lte: maxPrice } };
      }

      const allServices = await Services.find().toArray();

      let filtered = allServices;
      if (query.price) {
        filtered = allServices.filter((item) => {
          const price = parseInt(item.price);
          return price >= minPrice && price <= maxPrice;
        });
      }

      res.send(filtered);
    });

    app.get("/search", async(req, res) => {
      const searchText = req.query.search;
      const result = await Services.find({
        name: {$regex : searchText, $options: "i"}
      }).toArray()
      res.send(result)

    })

    app.get("/my-booking", async (req, res) => {
      const email = req.query.email;
      const query = {};
      if (email) {
        query.email = email;
      }

      const cursor = MyBooking.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/my-booking/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await MyBooking.findOne(query);
      res.send(result);
    });

    app.get("/top-rated", async (req, res) => {
      const allServices = await Services.find().toArray();

      const rated = allServices.map((s) => {
        const avg =
          s.reviews && s.reviews.length > 0
            ? s.reviews.reduce((a, r) => a + r.rating, 0) / s.reviews.length
            : 0;
        return { ...s, avgRating: avg };
      });

      const topSix = rated
        .sort((a, b) => b.avgRating - a.avgRating)
        .slice(0, 6);
      res.send(topSix);
    });

    app.get("/my-booking", async (req, res) => {
      const cursor = MyBooking.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/service", async (req, res) => {
      const cursor = Services.find().limit(6);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/services/:id/review", async (req, res) => {
      const serviceId = req.params.id;
      const newReview= req.body;
      const result = await Services.updateOne(
        { _id: new ObjectId(serviceId) },
        { $push: { reviews: newReview } }
      );

      res.send(result);
    });

    app.post("/services", async (req, res) => {
      const newService = req.body;

      try {
        const result = await Services.insertOne(newService);
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Do not Added the services" });
      }
    });

    app.post("/my-booking", async (req, res) => {
      const newBooking = req.body;
      const result = await MyBooking.insertOne(newBooking);
      res.send(result);
    });

    app.delete("/my-booking/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await MyBooking.deleteOne(query);
      res.send(result);
    });

    app.delete("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await Services.deleteOne(query);
      res.send(result);
    });

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
