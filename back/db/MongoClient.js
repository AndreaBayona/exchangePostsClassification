const MongoClient = require("mongodb").MongoClient
const url = process.env.MONGO_DB;


const MongoUtils = () => {
    const MyMongoLib = this || {};
    const url = process.env.MONGO_DB || "mongodb://localhost:27017";
    const dbName = process.env.DB_NAME;
    let db;

    MongoClient.connect(url, { useUnifiedTopology: true }).then((client) => {
        db = client.db(dbName);
    });

    MyMongoLib.connect = (url) => {
        const client = new MongoClient(url, { useUnifiedTopology: true });
        return client.connect();
    };

    MyMongoLib.insertOneQuestion = (doc, dbCollection) => {
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
                .find({userName: userName})
                .sort([["_id", -1]])
                .limit(600)
                .toArray()
                .finally(() => client.close())
        );
    };

    MyMongoLib.updateQuestion = (id, isRelevant, typeOfLearning, typeOfArchitecture, processingModel, mlPipeline, goodPractice, pitfall, externalReferences, interesting) => {
        return MyMongoLib.connect(url).then((client) => {
            client
                .db(dbName)
                .collection(process.env.DB_COLLECTION)
                .findOneAndUpdate(
                    { _id: id },
                    {
                        $set: { isRelevant: isRelevant,
                            typeOfLearning: typeOfLearning,
                            typeOfArchitecture: typeOfArchitecture,
                            processingModel: processingModel,
                            mlPipeline: mlPipeline,
                            goodPractice: goodPractice,
                            pitfall: pitfall,
                            externalReferences: externalReferences,
                            interesting: interesting  },
                    }
                )
                .finally(() => client.close());
        });
    };
    return MyMongoLib;
};

module.exports = MongoUtils();
