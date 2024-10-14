import { Sequelize } from 'sequelize';

// Initialize sequelize with connection details
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    dialectModule: require('mysql2'),
});

// Sync models to database only on first start
const syncDatabase = async () => {

    if (process.env.SYNC_DB === 'true') {
        try {
            await sequelize.sync(); 
            console.log('Database & tables synced!');

            process.env.SYNC_DB = "false"
        } catch (err) {
            console.error('Error syncing database:', err);
        }
    } else {
        console.log('Skipping database sync');
    }
};

// Call syncDatabase only if needed
syncDatabase();

export default sequelize;
