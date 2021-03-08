const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");

const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();
const farmApp = express();

// cross origin requests
farmApp.use(cors({origin:true}))

farmApp.get("/", async (req, res) => {
    const snapshot = await db.get();
  
    let farm_data = [];
    snapshot.forEach((doc) => {
      let id = doc.id;
      let data = doc.data();
  
      farm_data.push({ id, ...data });
    })

    res.status(200).send(JSON.stringify(farm_data));
});

farmApp.post("/:collection", async (req, res) => {
  try {
    const farm_data = req.body;

    // /* eslint-disable no-await-in-loop */
    // for (const data of farm_data) {
    //   await db.collection(req.params["collection"]).add(data);
    // }
    // add farm_data snapshot
    await db.collection(req.params["collection"]).add(farm_data);

    // status 201 states created
    res.status(201).send("Successfully updated!");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

farmApp.get("/:collection", async (req, res) => {
  try {
    const snapshot = await db.collection(req.params["collection"]).get();
  
    let farm_data = [];
    snapshot.forEach((doc) => {
      let id = doc.id;
      let data = doc.data();
  
      farm_data.push({ id, ...data });
    })

    // status 201 states created
    res.status(200).send(JSON.stringify(farm_data));
  } catch (error) {
    res.status(400).send(error.message);
  }
});


farmApp.delete("/:collection/:id", async (req,res) => {
  try {

    await db.collection(req.params["collection"]).doc(req.params.id).delete()

    // status 201 states created
    res.status(200).send("Delete successful!");
  } catch (error) {
    res.status(400).send(error.message);
  }
})


farmApp.put("/:collection/:id", async (req, res) => {
  try {
    const body = req.body;
  
    await db.collection(req.params["collection"]).doc(req.params.id).update(body);

    // status 201 states created
    res.status(200).send("Update successful!");
  } catch (error) {
    res.status(400).send(error.message)
  }
});

exports.farm = functions.https.onRequest(farmApp);

