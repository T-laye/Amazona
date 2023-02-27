import mongoose from 'mongoose';

const connection = {};

async function connect() {
  console.log('trying to connect to db');
  if (connection.isConnected) {
    console.log('already connected');
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('use previous connection');
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URI);
  console.log('new connection');
  connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnected();
      connection.isConnected = false;
    } else {
      console.log('not disconnected');
    }
  }
}

function convertDocToObj(doc) {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.updatedAt = doc.updatedAt.toString();
  return doc;
}

const db = { connect, disconnect, convertDocToObj };

export default db;

// const mongoose = require('mongoose');

// module.exports = () => {
//   const databaseParams = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   };
//   try {
//     mongoose.connect(process.env.MONGODB_URI, databaseParams);
//     console.log('it worked');
//   } catch (error) {
//     console.log(error);
//   }
// };
