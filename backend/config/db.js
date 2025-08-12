import mysql from 'mysql2/promise';

export const db = await mysql.createPool({
    host: 'localhost',
    port:'3306',
    user: 'root',
    password: '',
    database: 'smartcare',
    waitForConnections: true,
    connectionLimit: 10
});
