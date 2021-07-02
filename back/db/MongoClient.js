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
              from: "classifications",
              localField: "AID",
              foreignField: "AID",
              as: "classification",
            },
          },
        ])
        .limit(1)
        .toArray()
        .finally(() => client.close())
    );
  };

  MyMongoLib.clasificate = (classification) => {
    const query = { AID: classification.AID, user: classification.user };
    const update = { $set: classification };
    const options = { upsert: true };
    console.log(classification);
    return MyMongoLib.connect(url).then((client) =>
      client
        .db("exchange-classification")
        .collection("classifications")
        .updateOne(query, update, options)
        .finally(() => client.close())
    );
  };

  MyMongoLib.updateFormOptions = (formOption) => {
    const query = { _id: formOption._id };
    const update = { $set: formOption };
    const options = { upsert: true };
    console.log(formOption);
    return MyMongoLib.connect(url).then((client) =>
        client
            .db("exchange-classification")
            .collection("options")
            .updateOne(query, update, options)
            .finally(() => client.close())
    );
  };

  MyMongoLib.getFormOptions = (question) => {
    return MyMongoLib.connect(url).then((client) =>
        client
            .db("exchange-classification")
            .collection("options")
            .findOne(question)
            .finally(() => client.close())
    );
  };

  return MyMongoLib;
};


module.exports = MongoUtils();
