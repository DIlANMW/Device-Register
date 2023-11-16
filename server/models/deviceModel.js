import sqlite3 from "sqlite3";

class DeviceModel {
  constructor() {
    this.db = new sqlite3.Database("device.db", (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Connection established successfully.");
      }
    });

    this.createTable();
  }

  createTable() {
    this.db.run(
      `CREATE TABLE IF NOT EXISTS Devices(
          DeviceID INTEGER PRIMARY KEY AUTOINCREMENT,
          DeviceName TEXT,
          PowerRating INTEGER,
          Description TEXT,
          Category TEXT
      )`,
      (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Table created successfully.");
        }
      }
    );
  }

  getAllDevices(callback) {
    this.db.all("SELECT * FROM Devices", (err, rows) => {
      callback(err, rows);
    });
  }

  addDevice(deviceData, callback) {
    const { DeviceName, PowerRating, Description, Category } = deviceData;
    this.db.run(
      `INSERT INTO Devices (DeviceName, PowerRating, Description, Category)
        VALUES (?, ?, ?, ?)`,
      [DeviceName, PowerRating, Description, Category],
      (err) => {
        callback(err);
      }
    );
  }

  deleteDevice(deviceId, callback) {
    this.db.run(`DELETE FROM Devices WHERE DeviceID = ?`, [deviceId], (err) => {
      callback(err);
    });
  }

  updateDevice(deviceId, deviceData, callback) {
    const { DeviceName, PowerRating, Description, Category } = deviceData;
    this.db.run(
      `UPDATE Devices
        SET DeviceName = ?,
            PowerRating = ?,
            Description = ?,
            Category = ?
       WHERE DeviceID = ?`,
      [DeviceName, PowerRating, Description, Category, deviceId],
      (err) => {
        callback(err);
      }
    );
  }
}

export default new DeviceModel();
