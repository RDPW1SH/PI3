import { DataTypes } from 'sequelize';
import sequelize from '../config/database'; // Assuming you have a sequelize instance setup

const Forms = sequelize.define('Forms', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [5, 50], // Length validation (min: 5, max: 50)
        },
    },
    description: {
        type: DataTypes.STRING(255), // Max length: 255
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER, // Assuming userId is an integer foreign key
        allowNull: false,
        references: {
            model: 'Users', // References the 'Users' table
            key: 'id',      // Foreign key that links to Users
        }
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Defaults to current date if not provided
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    visibility: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'visible',
    }
}, {
    timestamps: true, // Adds `createdAt` and `updatedAt` columns
});

export default Forms;
