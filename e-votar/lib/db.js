'use server';
import mysql from 'mysql2/promise';
import Forms from '@/models/polls';
import User from '@/models/users';

let connection;

export const connectToDB = async () => {

    // Check if connection exists
    if (connection) {
        console.log('Already connected to the database');
        return 'ty';
    }

    try {

        // Connect to MySQL 
        connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,      // MySQL host 
            user: process.env.MYSQL_USER,      // MySQL username
            password: process.env.MYSQL_PASSWORD,  // MySQL password
        });

        // Check if the DB exists
        const [rows] = await connection.query(
            `SHOW DATABASES LIKE '${process.env.MYSQL_DB}'`
        );

        if (rows.length === 0) {
            console.log(`Database ${process.env.MYSQL_DB} not found. Creating...`);
            await connection.query(`CREATE DATABASE ${process.env.MYSQL_DB}`);
            console.log(`Database ${process.env.MYSQL_DB} created successfully.`);
        }

        // Connect to the right DB
        await connection.changeUser({ database: process.env.MYSQL_DB });

        console.log('Connected to the database');
        return 'yupi';

    } catch (err) {
        console.log('Could not establish connection with the database', err);
        throw err;
    }
};

