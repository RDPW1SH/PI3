import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    dialect: "mysql",
    dialectModule: 'mysql2',
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log("connection established");

        await sequelize.sync({ force: true });
    }
    catch (error) {
        console.log("Could not connect to the database", error);
    }
})
export default sequelize;