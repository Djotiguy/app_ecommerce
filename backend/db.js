import pg from "pg";
const {Client} = pg;
import dotenv from 'dotenv';
dotenv.config();

export async function getClient(){

    const client = new Client({
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_NAME,
        password: process.env.POSTGRES_PASSWORD,
        port: process.env.POSTGRES_PORT,
    });
    return client;

}

export async function sql(query){
    const client = await getClient();
    await client.connect();
    const res = await client.query(query);
    await client.end();
    return res.rows
}

