// models/polls.js
import { DataTypes } from 'sequelize';
import sequelize from '@/lib/sequelize';

const Polls = sequelize.define('Polls', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
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
    timestamps: true,
});

export default Polls;
