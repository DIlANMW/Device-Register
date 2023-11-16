// controllers/deviceController.js
import express from "express";
import deviceModel from "../models/deviceModel.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(201).send("Data created successfully.");
});

router.get("/devices", (req, res) => {
  deviceModel.getAllDevices((err, devices) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(devices);
    }
  });
});

router.post("/devices", (req, res) => {
  const deviceData = req.body;

  deviceModel.addDevice(deviceData, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.status(201).send("Data created successfully.");
    }
  });
});

router.delete("/devices/:id", (req, res) => {
  const deviceId = req.params.id;

  deviceModel.deleteDevice(deviceId, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send("Data deleted successfully.");
    }
  });
});

router.put("/devices/:id", (req, res) => {
  const deviceId = req.params.id;
  const deviceData = req.body;

  deviceModel.updateDevice(deviceId, deviceData, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send("Data modified successfully.");
    }
  });
});

export default router;
