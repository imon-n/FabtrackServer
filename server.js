require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mongo URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x9u2gny.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // ✅ MUST connect
    await client.connect();

    // ✅ fabTrack DB + equipments collection
    const equipmentsCollection = client
      .db("fabTrack")
      .collection("equipments");

    console.log("MongoDB connected (fabTrack)");

    // ---------------- ROUTES ----------------

    app.get("/", (req, res) => {
      res.send("FabTrack server running...");
    });

    // GET all equipments
    app.get("/equipments", async (req, res) => {
      const result = await equipmentsCollection.find().toArray();
      res.send(result);
    });

    // GET single equipment
    app.get("/equipments/:id", async (req, res) => {
      const id = req.params.id;
      const result = await equipmentsCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    // POST equipment
    app.post("/equipments", async (req, res) => {
      const equipment = req.body;
      const result = await equipmentsCollection.insertOne(equipment);
      res.send(result);
    });

    // DELETE equipment
    app.delete("/equipments/:id", async (req, res) => {
      const id = req.params.id;
      const result = await equipmentsCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    // ---------------- SERVER START ----------------
    app.listen(port, () => {
      console.log(`FabTrack server running on port ${port}`);
    });

  } catch (err) {
    console.error(err);
  }
}

run();
