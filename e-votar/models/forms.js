import { DataTypes } from 'sequelize';
import { Sequelize } from 'sequelize';


const Forms = Sequelize.define('Forms', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [5, 50], // Length validation 
        },
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // References the 'Users' table
            key: 'id',      // Foreign key
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
