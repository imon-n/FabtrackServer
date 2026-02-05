require("dotenv").config();
const express = require("express")
const { connectDB, getDB } = require("./config/db");

const app = express();
app.use(express.json());

//connect DB
connectDB();

app.get("/", (req,res) =>{
    res.send("Server running")
})


app.get("/equipments", async (req, res) =>{
    const db = getDB();
    const equipments = await db.collection("equipments").find().toArray();
    res.json(equipments);
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});