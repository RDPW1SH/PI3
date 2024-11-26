// models/votes.js
import { DataTypes } from 'sequelize';
import sequelize from '@/lib/sequelize';

const Votes = sequelize.define('Votes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    optionId: {
       type: DataTypes.INTEGER,
        allowNull: false, 
    },
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
