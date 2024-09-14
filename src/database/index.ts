import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

let dbClient: MongoClient;

const initDB = async () => {
    if (!process.env.DB_CONN || !process.env.DB_USER_PROJECT || !process.env.DB_PASS_PROJECT) {
        throw new Error("Database credentials are not properly set in the environment variables");
    }

    const connectionString = process.env.DB_CONN
        .replace("<username>", encodeURIComponent(process.env.DB_USER_PROJECT))
        .replace("<password>", encodeURIComponent(process.env.DB_PASS_PROJECT))
        + `&authMechanism=SCRAM-SHA-256`;

    dbClient = new MongoClient(connectionString);

    try {
        // Connect to the MongoDB cluster
        await dbClient.connect();
        console.log("Connected to the database");

        // Optionally, verify the connection by listing databases
        // const databasesList = await dbClient.db().admin().listDatabases();
        // console.log(databasesList);
    } catch (e) {
        console.error("Failed to connect to the database", e);
        throw e;
    }
};

export { dbClient, initDB };
