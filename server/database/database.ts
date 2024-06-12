import mysql from "mysql2";
import dotenv from 'dotenv';
const result2 = dotenv.config({
    path: "./server/env/.env",
});
if (result2.error) {
    throw result2.error;
}

// 创建数据库连接池以提高性能
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: Number(process.env.MYSQL_PORT),
    waitForConnections: true,
    connectionLimit: 1,
    queueLimit: 0,
});
export default pool;

pool.on("release", function (connection) {
    console.log("[SQL] - Connection %d released ", connection.threadId);
});
