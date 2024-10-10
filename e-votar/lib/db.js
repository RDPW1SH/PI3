'use server';
import { User, Polls, Votes } from '@/models';
import { Sequelize } from 'sequelize';

let sequelize;

export const connectToDB = async () => {
    // Check if a connection already exists
    if (sequelize) {
        console.log('Already connected to the database');
        return 'ye';
    }

    try {
        // Create a new Sequelize connection
        sequelize = new Sequelize(process.env.DATABASE_URL, {
            dialect: 'mysql',
            dialectModule: require('mysql2'),
        });

        // Test connection
        await sequelize.authenticate();
        console.log('Connected to the database');

        // Sync models to the database if needed
        await sequelize.sync({ alter: true });
        console.log('Database & tables synced');

        return 'yo';

    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
    }
};
