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
          { $project: { classification: 0 } },
          { $match: { user: user } },
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
          { $match: { user: user } },
          { $project: { classification: 1 } },
          { $unwind: "$classification" },
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

  MyMongoLib.insertOneQuestion = (doc) => {
    return MyMongoLib.connect(url).then((client) =>
      client
        .db(dbName)
        .collection(process.env.DB_COLLECTION)
        .insertOne(doc)
        .finally(() => client.close())
    );
  };

  MyMongoLib.getPaginateQuestion = (page, query) => {
    console.log(query);
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

  MyMongoLib.getQuestionsByUserName = (userName) => {
    return MyMongoLib.connect(url).then((client) =>
      client
        .db(dbName)
        .collection(process.env.DB_COLLECTION)
        .find({ userName: userName })
        .sort([["_id", -1]])
        .limit(600)
        .toArray()
        .finally(() => client.close())
    );
  };

  MyMongoLib.updateQuestion = (
    id,
    isRelevant,
    typeOfLearning,
    typeOfArchitecture,
    processingModel,
    mlPipeline,
    goodPractice,
    pitfall,
    externalReferences,
    interesting
  ) => {
    return MyMongoLib.connect(url).then((client) => {
      client
        .db(dbName)
        .collection(process.env.DB_COLLECTION)
        .findOneAndUpdate(
          { _id: ObjectId(id) },
          {
            $set: {
              isRelevant: isRelevant,
              typeOfLearning: typeOfLearning,
              typeOfArchitecture: typeOfArchitecture,
              processingModel: processingModel,
              mlPipeline: mlPipeline,
              goodPractice: goodPractice,
              pitfall: pitfall,
              externalReferences: externalReferences,
              interesting: interesting,
              answered: true,
            },
          }
        )
        .finally(() => client.close());
    });
  };
  return MyMongoLib;
};

module.exports = MongoUtils();
