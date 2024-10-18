// models/polls.js
import { DataTypes } from 'sequelize';
import sequelize from '@/lib/sequelize';

const Polls = sequelize.define('Polls', {
    title: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
