// models/user.js
import { DataTypes } from 'sequelize';
import sequelize from '@/lib/sequelize';

const Users = sequelize.define('Users', {
    username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(80),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true, // Email format validation
        },
    },
    slug: {
        type: DataTypes.STRING(25),
        allowNull: false,
        unique: true,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    timestamps: true, // Adds `createdAt` and `updatedAt` columns
});

export default Users;
