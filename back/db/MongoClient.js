const MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");
require("dotenv").config();

const answers = "answers";

const MongoUtils = () => {
  const MyMongoLib = this || {};
  const url = process.env.MONGO_DB;
  const dbName = process.env.DB_NAME;
  let db;

  MongoClient.connect(url, { useUnifiedTopology: true }).then((client) => {
    db = client.db(dbName);
  });

  MyMongoLib.connect = (url) => {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    return client.connect();
  };

  MyMongoLib.unclassifiedAnswers = (user) => {
    return MyMongoLib.connect(url).then((client) =>
      client
        .db(dbName)
        .collection("answers")
        .aggregate([
          { $match: { user: user, classified: null } },
          {
            $lookup: {
              from: "questions",
              localField: "QID",
              foreignField: "QID",
              as: "question",
            },
          },
        ])
        .limit(600)
        .toArray()
        .finally(() => client.close())
    );
  };

  MyMongoLib.classifiedAnswers = (user) => {
    return MyMongoLib.connect(url).then((client) =>
      client
        .db(dbName)
        .collection("answers")
        .aggregate([
          { $match: { user: user, classified: true } },
          {
            $lookup: {
              from: "questions",
              localField: "QID",
              foreignField: "QID",
              as: "question",
            },
          },
        ])
        .limit(600)
        .toArray()
        .finally(() => client.close())
    );
  };

  MyMongoLib.getPaginateQuestion = (page, query) => {
    return MyMongoLib.connect(url).then((client) =>
      client
        .db(dbName)
        .collection(process.env.DB_COLLECTION)
        .find({})
        .sort([["_id", -1]])
        .limit(10)
        .skip(page)
        .toArray()
        .finally(() => client.close())
    );
  };

  MyMongoLib.getQuestions = () => {
    return MyMongoLib.connect(url).then((client) =>
      client
        .db(dbName)
        .collection(process.env.DB_COLLECTION)
        .find()
        .sort([["_id", -1]])
        .limit(600)
        .toArray()
        .finally(() => client.close())
    );
  };

  MyMongoLib.updateAnswer = (classification, id) => {
    return MyMongoLib.connect(url).then((client) => {
      client
        .db(dbName)
        .collection(answers)
        .findOneAndUpdate(
          { AID: id },
          {
            $set: {
              classification: classification,
              classified: true,
            },
          }
        )
        .finally(() => client.close());
    });
  };

  MyMongoLib.getAnswer = (id) => {
    return MyMongoLib.connect(url).then((client) =>
      client
        .db(dbName)
        .collection("answers")
        .aggregate([
          { $match: { AID: id } },
          {
            $lookup: {
              from: "questions",
              localField: "QID",
              foreignField: "QID",
              as: "question",
            },
          },
        ])
        .limit(1)
        .toArray()
        .finally(() => client.close())
    );
  };

  return MyMongoLib;
};

module.exports = MongoUtils();
