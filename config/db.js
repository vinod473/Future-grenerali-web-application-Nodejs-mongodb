const mongoose = require("mongoose");

const MongoUri =
  "mongodb+srv://vinod:vinod@123@cluster0.fgjf2.mongodb.net/future-generali?retryWrites=true&w=majority";

const initiateMongoServer = async () => {
  try {
    await mongoose.connect(MongoUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = initiateMongoServer;
