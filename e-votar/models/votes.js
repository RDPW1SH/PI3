// models/votes.js
import { DataTypes } from 'sequelize';
import sequelize from '@/lib/sequelize';

const Votes = sequelize.define('Votes', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    pollId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,
});

export default Votes;
