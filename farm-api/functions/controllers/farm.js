const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");

const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore()
const farmApp = express();

farmApp.use(cors({origin:true}))

farmApp.get("/", async (req, res) => {
    const snapshot = await db.collection("tomato-farm").get();
  
    let farm_data = [];
    snapshot.forEach((doc) => {
      let id = doc.id;
      let data = doc.data();
  
      farm_data.push({ id, ...data });
    })

    res.status(200).send(JSON.stringify(farm_data));
});

farmApp.post("/", async (req, res) => {
    const farm_data = req.body;

    await db.collection("tomato-farm").add(farm_data);

    // status 201 states created
    res.status(201).send();
});


exports.farm = functions.https.onRequest(farmApp);

