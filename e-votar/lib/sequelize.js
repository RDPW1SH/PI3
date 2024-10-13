import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    dialectModule: require('mysql2'),

});

// Sync models to database automatically on start
sequelize.sync({ force: true })
    .then(() => {
        console.log('Database & tables synced!');
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });
export default sequelize;