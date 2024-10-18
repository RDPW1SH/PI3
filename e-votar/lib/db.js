'use server';
import { Sequelize } from 'sequelize';

let sequelize;

export const connectToDB = async () => {
    // Check if a connection already exists
    if (sequelize) {
        return 'Already connected to the database';
    }

    try {

        sequelize = new Sequelize(process.env.DATABASE_URL, {
            dialect: 'mysql',
            dialectModule: require('mysql2'),
        });

        // Test connection
        await sequelize.authenticate();

        return 'Connected to the database';

    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
    }
};
