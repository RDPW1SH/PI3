'use server';
import mysql from 'mysql2/promise';  

let connection; 

export const connectToDB = async () => {

    if (connection) {
        console.log('Already connected to the database');
        return connection;  
    }

    try {
       
        connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,      // MySQL host 
            user: process.env.MYSQL_USER,      // MySQL username
            password: process.env.MYSQL_PASSWORD,  // MySQL password
            database: process.env.MYSQL_DB,    // MySQL database name
            port: process.env.MYSQL_PORT // Optional port 
        });

        console.log('Connected to MySQL');

        return connection;
    } catch (err) {
        console.log('Could not establish connection with the database', err);
        throw err; 
    }
};
