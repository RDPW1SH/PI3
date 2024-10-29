
import { DataTypes } from 'sequelize';
import sequelize from '@/lib/sequelize';

const PollOptions = sequelize.define('Poll_options', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    optionTitle: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    pollId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {

});

export default PollOptions;
