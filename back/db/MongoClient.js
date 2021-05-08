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
        .db("exchange-classification")
        .collection("assign")
        .aggregate(
          {
            $match: {
              user: user,
            },
          },
          {
            $lookup: {
              from: "answers",
              localField: "AID",
              foreignField: "AID",
              as: "answer",
            },
          },
          { $unwind: "$answer" },
          {
            $unwind: { path: "$answer._id", preserveNullAndEmptyArrays: true },
          },
          {
            $lookup: {
              from: "classifications",
              let: {
                originalUser: "$user",
                answerId: "$AID",
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ["$user", "$$originalUser"],
                        },
                        {
                          $eq: ["$AID", "$$answerId"],
                        },
                      ],
                    },
                  },
                },
              ],
              as: "classifications",
            },
          },
          {
            $match: {
              classifications: { $exists: true, $size: 0 },
            },
          },
          {
            $lookup: {
              from: "questions",
              localField: "answer.QID",
              foreignField: "QID",
              as: "question",
            },
          },
          {
            $project: {
              _id: 1,
            },
          }
        )
        .toArray()
        .finally(() => client.close())
    );
  };

  MyMongoLib.classifiedAnswers = (user) => {
    return MyMongoLib.connect(url).then((client) =>
      client
        .db("exchange-classification")
        .collection("assign")
        .aggregate(
          {
            $match: {
              user: user,
            },
          },
          {
            $lookup: {
              from: "answers",
              localField: "AID",
              foreignField: "AID",
              as: "answer",
            },
          },
          { $unwind: "$answer" },
          {
            $unwind: { path: "$answer._id", preserveNullAndEmptyArrays: true },
          },
          {
            $lookup: {
              from: "classifications",
              let: {
                originalUser: "$user",
                answerId: "$AID",
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ["$user", "$$originalUser"],
                        },
                        {
                          $eq: ["$AID", "$$answerId"],
                        },
                      ],
                    },
                  },
                },
              ],
              as: "classifications",
            },
          },
          {
            $match: {
              classifications: { $exists: true, $not: { $size: 0 } },
            },
          },
          {
            $lookup: {
              from: "questions",
              localField: "answer.QID",
              foreignField: "QID",
              as: "question",
            },
          },
          {
            $project: {
              _id: 1,
            },
          }
        )
        .toArray()
        .finally(() => client.close())
    );
  };

  MyMongoLib.getAnswer = (id) => {
    return MyMongoLib.connect(url).then((client) =>
      client
        .db("exchange-classification")
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
          {
            $lookup: {
              from: "classification",
              localField: "AID",
              foreignField: "AID",
              as: "classifications",
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
